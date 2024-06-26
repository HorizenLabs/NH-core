#![cfg_attr(not(feature = "std"), no_std)]

use codec::{Decode, Encode};
use sp_runtime_interface::pass_by::PassByCodec;
use sp_runtime_interface::runtime_interface;

#[derive(PassByCodec, Encode, Decode)]
pub enum VerifyError {
    InvalidInput,
    InvalidProofData,
    VerifyError,
}

#[cfg(feature = "std")]
impl From<risc0_verifier::VerifyError> for VerifyError {
    fn from(value: risc0_verifier::VerifyError) -> Self {
        match value {
            risc0_verifier::VerifyError::InvalidData {
                cause: risc0_verifier::DeserializeError::InvalidProof,
            } => VerifyError::InvalidProofData,
            risc0_verifier::VerifyError::InvalidData {
                cause: risc0_verifier::DeserializeError::InvalidPublicInputs,
            } => VerifyError::InvalidInput,
            _ => VerifyError::VerifyError,
        }
    }
}

impl From<VerifyError> for hp_verifiers::VerifyError {
    fn from(value: VerifyError) -> Self {
        match value {
            VerifyError::InvalidInput => hp_verifiers::VerifyError::InvalidInput,
            VerifyError::InvalidProofData => hp_verifiers::VerifyError::InvalidProofData,
            VerifyError::VerifyError => hp_verifiers::VerifyError::VerifyError,
        }
    }
}

pub const ZKSYNC_PUBS_SIZE: usize = 32;
pub const ZKSYNC_PROOF_SIZE: usize = 44 * 32;

#[runtime_interface]
pub trait ZksyncVerify {
    fn verify(
        proof_bytes: &[u8; ZKSYNC_PROOF_SIZE],
        pubs_bytes: [u8; ZKSYNC_PUBS_SIZE],
    ) -> Result<(), VerifyError> {
        let pubs = zksync_era_verifier_deserialize::fr(&pubs_bytes)
            .map_err(|e| log::error!("Cannot extract public inputs: {:?}", e))
            .map_err(|_| VerifyError::InvalidInput)?;
        let mut proof = zksync_era_verifier::deserialize_eth_proof(proof_bytes)
            .map_err(|e| log::debug!("Cannot extract raw proof data: {:?}", e))
            .map_err(|_| VerifyError::InvalidProofData)?;
        log::trace!(
            "Extracted public inputs [{:?}...{:?}] and proof data [{:?}...{:?}]",
            pubs_bytes[0],
            pubs_bytes[ZKSYNC_PUBS_SIZE - 1],
            proof_bytes[0],
            proof_bytes[ZKSYNC_PROOF_SIZE - 1]
        );
        proof.inputs = vec![pubs];
        zksync_era_verifier::verify(&zksync_era_verifier::default_eth_vk(), &proof)
            .map_err(|e| log::debug!("Cannot verify proof: {:?}", e))
            .map_err(|_| VerifyError::VerifyError)
            .and_then(|verified| verified.then_some(()).ok_or(VerifyError::VerifyError))
            .map(|_| log::trace!("verified"))
    }
}

#[runtime_interface]
pub trait Risc0Verify {
    fn verify(vk: [u8; 32], proof: &[u8], pubs: &[u8]) -> Result<(), VerifyError> {
        risc0_verifier::verify(vk.into(), proof, pubs)
            .inspect_err(|e| log::debug!("Cannot verify proof: {:?}", e))
            .map_err(Into::into)
            .map(|_| log::trace!("verified"))
    }
}

#[cfg(feature = "std")]
pub use zksync_verify::HostFunctions as ZksyncVerifierHostFunctions;

#[cfg(feature = "std")]
pub use risc_0_verify::HostFunctions as Risc0VerifierHostFunctions;

#[cfg(feature = "std")]
pub type HLNativeHostFunctions = (ZksyncVerifierHostFunctions, Risc0VerifierHostFunctions);

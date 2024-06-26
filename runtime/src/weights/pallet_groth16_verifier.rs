// Copyright 2024, Horizen Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! Autogenerated weights for `pallet_groth16_verifier`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 31.0.0
//! DATE: 2024-06-25, STEPS: `50`, REPEAT: `20`, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! WORST CASE MAP SIZE: `1000000`
//! HOSTNAME: `d0a9e1a87e44`, CPU: `AMD EPYC 7571`
//! WASM-EXECUTION: `Compiled`, CHAIN: `Some("dev")`, DB CACHE: `1024`

// Executed Command:
// /usr/local/bin/nh-node
// benchmark
// pallet
// --chain
// dev
// --pallet
// pallet-groth16-verifier
// --extrinsic
// *
// --steps
// 50
// --repeat
// 20
// --heap-pages=4096
// --header
// /data/benchmark/HEADER-APACHE2
// --output
// /data/benchmark/runtime/src/weights/pallet_groth16_verifier.rs
// --template
// /data/benchmark/node/hl-deploy-weight-template.hbs

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]
#![allow(missing_docs)]

use frame_support::{traits::Get, weights::{Weight, constants::RocksDbWeight}};
use core::marker::PhantomData;

/// Weights for `pallet_groth16_verifier` using the New Horizen node and recommended hardware.
pub struct NHWeight<T>(PhantomData<T>);

impl<T: frame_system::Config> pallet_groth16_verifier::WeightInfo for NHWeight<T> {
    /// Storage: `Poe::NextAttestation` (r:1 w:0)
    /// Proof: `Poe::NextAttestation` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// Storage: `Poe::Values` (r:1 w:1)
    /// Proof: `Poe::Values` (`max_values`: None, `max_size`: Some(72), added: 2547, mode: `MaxEncodedLen`)
    /// Storage: `Timestamp::Now` (r:1 w:0)
    /// Proof: `Timestamp::Now` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// Storage: `Poe::FirstInsertionTime` (r:0 w:1)
    /// Proof: `Poe::FirstInsertionTime` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// The range of component `n` is `[0, 16]`.
    fn submit_proof_bn254(n: u32, ) -> Weight {
        // Proof Size summary in bytes:
        //  Measured:  `74`
        //  Estimated: `3537`
        // Minimum execution time: 45_641_429_000 picoseconds.
        Weight::from_parts(50_113_988_426, 3537)
            // Standard Error: 38_816_347
            .saturating_add(Weight::from_parts(3_031_118_364, 0).saturating_mul(n.into()))
            .saturating_add(T::DbWeight::get().reads(3_u64))
            .saturating_add(T::DbWeight::get().writes(2_u64))
    }
    /// Storage: `Poe::NextAttestation` (r:1 w:0)
    /// Proof: `Poe::NextAttestation` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// Storage: `Poe::Values` (r:1 w:1)
    /// Proof: `Poe::Values` (`max_values`: None, `max_size`: Some(72), added: 2547, mode: `MaxEncodedLen`)
    /// Storage: `Timestamp::Now` (r:1 w:0)
    /// Proof: `Timestamp::Now` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// Storage: `Poe::FirstInsertionTime` (r:0 w:1)
    /// Proof: `Poe::FirstInsertionTime` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// The range of component `n` is `[0, 16]`.
    fn submit_proof_bls12_381(n: u32, ) -> Weight {
        // Proof Size summary in bytes:
        //  Measured:  `74`
        //  Estimated: `3537`
        // Minimum execution time: 50_637_242_000 picoseconds.
        Weight::from_parts(53_992_544_607, 3537)
            // Standard Error: 39_034_975
            .saturating_add(Weight::from_parts(3_883_265_860, 0).saturating_mul(n.into()))
            .saturating_add(T::DbWeight::get().reads(3_u64))
            .saturating_add(T::DbWeight::get().writes(2_u64))
    }
    /// Storage: `SettlementGroth16Pallet::Vks` (r:1 w:0)
    /// Proof: `SettlementGroth16Pallet::Vks` (`max_values`: None, `max_size`: Some(3948), added: 6423, mode: `MaxEncodedLen`)
    /// Storage: `Poe::NextAttestation` (r:1 w:0)
    /// Proof: `Poe::NextAttestation` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// Storage: `Poe::Values` (r:1 w:1)
    /// Proof: `Poe::Values` (`max_values`: None, `max_size`: Some(72), added: 2547, mode: `MaxEncodedLen`)
    /// Storage: `Timestamp::Now` (r:1 w:0)
    /// Proof: `Timestamp::Now` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// Storage: `Poe::FirstInsertionTime` (r:0 w:1)
    /// Proof: `Poe::FirstInsertionTime` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// The range of component `n` is `[0, 16]`.
    fn submit_proof_bn254_with_vk_hash(n: u32, ) -> Weight {
        // Proof Size summary in bytes:
        //  Measured:  `663 + n * (66 ±0)`
        //  Estimated: `7413`
        // Minimum execution time: 35_495_825_000 picoseconds.
        Weight::from_parts(37_560_371_310, 7413)
            // Standard Error: 26_560_687
            .saturating_add(Weight::from_parts(2_124_042_810, 0).saturating_mul(n.into()))
            .saturating_add(T::DbWeight::get().reads(4_u64))
            .saturating_add(T::DbWeight::get().writes(2_u64))
    }
    /// Storage: `SettlementGroth16Pallet::Vks` (r:1 w:0)
    /// Proof: `SettlementGroth16Pallet::Vks` (`max_values`: None, `max_size`: Some(3948), added: 6423, mode: `MaxEncodedLen`)
    /// Storage: `Poe::NextAttestation` (r:1 w:0)
    /// Proof: `Poe::NextAttestation` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// Storage: `Poe::Values` (r:1 w:1)
    /// Proof: `Poe::Values` (`max_values`: None, `max_size`: Some(72), added: 2547, mode: `MaxEncodedLen`)
    /// Storage: `Timestamp::Now` (r:1 w:0)
    /// Proof: `Timestamp::Now` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// Storage: `Poe::FirstInsertionTime` (r:0 w:1)
    /// Proof: `Poe::FirstInsertionTime` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
    /// The range of component `n` is `[0, 16]`.
    fn submit_proof_bls12_381_with_vk_hash(n: u32, ) -> Weight {
        // Proof Size summary in bytes:
        //  Measured:  `919 + n * (98 ±0)`
        //  Estimated: `7413`
        // Minimum execution time: 45_922_399_000 picoseconds.
        Weight::from_parts(48_734_364_337, 7413)
            // Standard Error: 37_695_135
            .saturating_add(Weight::from_parts(3_290_851_396, 0).saturating_mul(n.into()))
            .saturating_add(T::DbWeight::get().reads(4_u64))
            .saturating_add(T::DbWeight::get().writes(2_u64))
    }
    /// Storage: `SettlementGroth16Pallet::Vks` (r:0 w:1)
    /// Proof: `SettlementGroth16Pallet::Vks` (`max_values`: None, `max_size`: Some(3948), added: 6423, mode: `MaxEncodedLen`)
    /// The range of component `n` is `[0, 16]`.
    fn register_vk_bn254(n: u32, ) -> Weight {
        // Proof Size summary in bytes:
        //  Measured:  `0`
        //  Estimated: `0`
        // Minimum execution time: 10_494_889_000 picoseconds.
        Weight::from_parts(10_819_393_256, 0)
            // Standard Error: 10_743_280
            .saturating_add(Weight::from_parts(1_043_719_472, 0).saturating_mul(n.into()))
            .saturating_add(T::DbWeight::get().writes(1_u64))
    }
    /// Storage: `SettlementGroth16Pallet::Vks` (r:0 w:1)
    /// Proof: `SettlementGroth16Pallet::Vks` (`max_values`: None, `max_size`: Some(3948), added: 6423, mode: `MaxEncodedLen`)
    /// The range of component `n` is `[0, 16]`.
    fn register_vk_bls12_381(n: u32, ) -> Weight {
        // Proof Size summary in bytes:
        //  Measured:  `0`
        //  Estimated: `0`
        // Minimum execution time: 4_740_887_000 picoseconds.
        Weight::from_parts(5_098_305_087, 0)
            // Standard Error: 5_996_571
            .saturating_add(Weight::from_parts(753_526_087, 0).saturating_mul(n.into()))
            .saturating_add(T::DbWeight::get().writes(1_u64))
    }
}
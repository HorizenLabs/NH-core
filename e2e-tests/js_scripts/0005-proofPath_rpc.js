// This script is used to test the proofPath RPC call.
// It also shows how to properly register custom data types and RPC calls
// to Polkadot.js, in order to use its interface to interact with the blockchain.
// Finally, it also demonstrate:
// - how to submit and extrinisic and wait for its inclusion ina block
// - how to wait for a specific event to be emitted
// Both operations are performed through the use of polkadot.js observer pattern
// and promise-based async/await syntax.

const Keccak256 = require('keccak256')

// Hardcoded proof hashes
const PROOF_FFLONK = "0x283e3f25323d02dabdb94a897dc2697a3b930d8781381ec574af89a201a91d5a2c2808c59f5c736ff728eedfea58effc2443722e78b2eb4e6759a278e9246d600f9c56dc88e043ce0b90c402e96b1f4b1a246f4d0d69a4c340bc910e1f2fd80519e465e01bd7629f175931feed102cb6459a1be7b08018b93c142e961d0352d80b8e5d340df28c2f454c5a2535ca01a230bb945ee24b1171481a9a2c6496fed61cf8878e40adb52dc27da5e79718f118467319d15d64fed460d69d951376ac631a6c44faaec76e296b43fe720d700a63fd530f9064878b5f72f2ffe7458c2f031ac6ed8c1e0758dfb3702ed29bbc0c14b5e727c164b3ade07b9f164af0be54b0143b1a6534b2dcf2bd660e1b5b420d86c0c350fd9d614b639c5df98009f1375e141259679021d0a6a3aa3aae2516bace4a4a651265217ec0ea7c0d7f89b987100abcc93d98ff40bae16eff6c29955f7a37155bb25672b12eb5074dcb7c3e2b001718a257cca21ee593d1ba9f8e91e5168aed8e0b1893e11a6b583d975e747f8008a8c2150a04d8f867945ca1740dc3fc3b2fc4daff61b4725fb294435a1b90101803690ae70fc212b7e929de9a22a4642ef4772546cf93ffd1b1196a3d9113a3009c506755578932ca3630508ca1ed6ee83df5ec9e26cb0b5800a70967a1a93a04d142b6a532935a31d84f75d16929df6d38c3a210ac4f435a8024dfb7e6c1f3246d58038a943f237325b44f03d106e523adfec4324615a2dd09e1e5b9143b411c1cf09ee411cf9864d30df4904099920cee9ae8134d45dfeb29e46115d2e740098674b8fc2ca31fac6fcc9302860654fdc1b522b7e064b0759bc5924f332fa921121b5af880f83fbce02f19dabb8f684593e7322fb80bfc0d054797b1d4eff411b01bf68f81f2032ae4f7fc514bd76ca1b264f3989a92e6b3d74cda4f8a714920e4c02f5a71082a8bcf5be0b5750a244bd040a776ec541dfc2c8ae73180e9240ada5414d66387211eec80d7d9d48498efa1e646d64bb1bf8775b3796a9fd0bf0fdf8244018ce57b018c093e2f75ed77d8dbdb1a7b60a2da671de2efe5f6b9d70d69b94acdfaca5bacc248a60b35b925a2374644ce0c1205db68228c8921d9d9"
const PROOF_ZKSYNC = "0x02c6cf2fd56edca1f17f406cceef3de1c99bba6e499ed96ef4f453af011257c420944a838b2cd133a414ae6882fd8cc0dfb7daa14540d796ab937f65479beaca1fb7b349b2a6dc4edfc8191e31ddc0b342840dc575ad213473529611e15261e8020c09be65a4d571cadbb39b0737777c365af77b4702d6e1a4e0340abb1cb8c3221cc01cc33c432ab679319c724544616069b0d6f4df5f537ec36887deead9631fc36d5da22c35d8d83eb74ccc2afa4a83d2d6c604998ac86e653f1307d016200e01dd9bbcfa860fe26eca3f159b473fa073fce20ef5354c25d52e5e9c4bc2930b5ae2e3e19c47907074ef77fc0e113920e9f702ad0f7f1789c696a47849ebcb21db13fcf4fc3cc99f9879514cb5a3ac5b672a4343b915833be0cb9c4281e1810a376c40d30b54d2c82d98e26d93f4d2fa5010ef0973f4c9ddc5eb83074b2fdf011214912fffecc3507d741e4164d049963f4e22dfefc659a2d4122e141f8f8700cf13591e41e00c27c19f05546c874287a483df746fd1c5f66b955f5caf1fc00928a89a4c924f98bd2bb78a704a7879f15799dcf7e94d2f465c33b65358519606f57ff3f11aee64bdffac49821dda7e029a281519e0f6a44302bd822d69e08d1797df980a6a223e0b455ad79df6ee836ac09486e3c4ce28ee870249e5d1db8f1bf81479df3717fee0f378da47910f1177685a7de078eb5dc2ae65d1ff321cdf2b3c88144fd8079426e8c39efb62913aac7cf198d6a557c9c55f448d65d8aa492a54cd2ae2e57b5ce3918aa3a75f827e8511fa6196d83e0fa77f45e789fa73cd2773b310f717b8af7bfc3456f6e008f9f8c2286808e4430d8d1b0260a5a0f08616887cc329cd4754a0994979552a26b055541d89419c083bb4bb5de0939716b6235a83962376096cac86e2f3497e16083fc0f126305a5b5d822f79b65411e6a0250b0c229cb9efa1d8f7b64754f21fc2d81d8c122d8cc57eafc2b4b2d2b02b262b65157804674d8d5da0a9c18d1d1f48c75ac8a8196bd52cb789b0b2947dbf63258d968097930fc5abd8e36b9aa1b28c8038a1f87292212ca2c0a55673e2a0480f380acabf71e994271a65230015428d1fb0fa29944c4215f070ccfe537dfe37065db5ba5c90ae76cab0e69e2a5f61d238d52b936769a3f7ed6bd98bafe4d15c17548ede6302f4d806e3217b0035927359463fdaf1ca86c439db078959f3f6aa2de55a8662d700be14b546e2099289b221f7bdf8e8d078547d9996f82f13f9e529e3c758071eab1259735092d4fac514b9bd3b87242350a0497e537ef96ac4241265632779c8a98844dea0cb1496e49fb2ab2f50d9533050c840fd2c9155d4e807a69fdafeca7e7aabdfbe234170d106eb0bc2b6e3a3d0c27fcbb8ec611aa7861d57b0926ca97b7137aceeae7c061cdb619a893fce4a77187948db00828b51e70cfbdb9f6b06aaea8b037452a37aa113c75f8a0d8755f69de8e9dbdaff5dc9742b3723cee611e17f0b5f45389e3794d499698df78583610371d6fb780ab8fb080085c1e5e3312cd0cfdf1c440ce0778f84e49f9ebe6217025d6e0a3caa019dc713390dd68b9d7e2971c85dcef20f0fd39e653d03a15d43920502ab4aaea724d4283bffa5d557519aface6622844659eb8704aba1eb7d1440e9838e5ca42aaf4824ed9174f5cae88f196a15a07fabca68c0a76cb22749d5b96a3f30eba226061d1fc0ccaf6d01858bc5096ce8c231e78e52df028888ce52d1803edd0924c08cde09ec0d1241c98d7bedb141e8abe63b5645fd6bf3b143c42004f91a4d4a4cd2480d333ed34a878fcdde8e16b6ebe9c70237f1d856c0e37e4d9aec479cdb4c8e9316284c2edd3202941fdedd81a6ee4fa6735cac981f8cc1a5609a27bb774b5901281497fb2be671c9dac31aad3c122f3859a9f838f8543c7fc2bab27e84dc4b6a2343c5416c38c8dcbbb56f1e3ccf31644ab66ebe86e77cec68836d3771d7e3a800000000a45a2ec20c3f34f4c69cea200fdf39cc78ff50092f7cb1e2894f4d35"

// Custom types and RPC calls
// This one defines the metadata for the return value of proofPath RPC call
newTypes = {
    MerkleProof: {
        root: 'H256',
        proof: 'Vec<H256>',
        number_of_leaves: 'u32',
        leaf_index: 'u32',
        leaf: 'H256',
    }
};

const BlockUntil = {
    InBlock: 'InBlock',
    Finalized: 'Finalized',
};

const ReturnCode = {
    Ok: 1,
    ErrProofVerificationFailed: 2,
    ErrNoAttestation: 3,
    ErrAttProofVerificationFailed: 4,
    ErrWrongAttestationTiming: 5,
};

const BLOCK_TIME = 6000; // block time in milliseconds

// This one defines the metadata for the arguments and return value of proofPath RPC call
userDefinedRpc = {
    poe: {
        proofPath: {
            description: 'Get the Merkle root and path of a stored proof',
            params: [
                {
                    name: 'root_id',
                    type: 'u64'
                },
                {
                    name: 'proof_hash',
                    type: 'H256'
                },
                {
                    name: 'at',
                    type: 'BlockHash',
                    isOptional: true
                }
            ],
            type: 'MerkleProof'
        }
    }
};


async function run(nodeName, networkInfo, args) {
    const { wsUri, userDefinedTypes } = networkInfo.nodesByName[nodeName];
    const provider = new zombie.WsProvider(wsUri);

    // Passing user defined types and RPC calls, instead of userDefinedTypes
    // Eventually, it is possible to merge the two objects, but this is not
    // mandatory for this test
    const api = new zombie.ApiPromise({ provider, types: newTypes, rpc: userDefinedRpc });
    await api.isReady;

    // Create a keyring instance
    const keyring = new zombie.Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');

    // Create the proof submission extrinsics...
    let proofHashesArray = [];
    const proofFFlonkSubmission = api.tx.settlementFFlonkPallet.submitProof(PROOF_FFLONK);
    const proofZksyncSubmission = api.tx.settlementZksyncPallet.submitProof(PROOF_ZKSYNC);
    // ...and submit them
    const hashFFlonk = await submitAnExtrinsic(proofFFlonkSubmission, alice, BlockUntil.InBlock);
    const proofIncludedTimestamp = Date.now();
    const hashZksync = await submitAnExtrinsic(proofZksyncSubmission, alice, BlockUntil.InBlock);

    // Save the proof hash only if the extrinsic has been successfully included in a block
    if (hashFFlonk == -1 || hashZksync == -1) {
        return ReturnCode.ErrProofVerificationFailed;
    }
    proofHashesArray.push(hashFFlonk);
    proofHashesArray.push(hashZksync);

    // Wait for the next attestation ID to be emitted
    const EXPECTED_ATT_TIMEOUT = BLOCK_TIME * 10;
    const EXPECTED_ATT_TIMEOUT_DELTA = BLOCK_TIME * 2;
    const interestingAttId = await wait_for_new_attestation(api, EXPECTED_ATT_TIMEOUT * 2);
    const attTimestamp = Date.now();
    if (interestingAttId == -1) {
        console.log("Something went wrong while waiting for a new attestation");
        return ReturnCode.ErrNoAttestation;
    } else {
        var publishedRoot = interestingAttId.data[1];
        console.log("A new attestation has been published: ");
        interestingAttId.data.forEach((data) => {
            console.log(`\t\t\t${data.toString()}`);
        });
    }

    // Check that the attestation was received in the expected time window
    if (attTimestamp < proofIncludedTimestamp + EXPECTED_ATT_TIMEOUT ||
        attTimestamp > proofIncludedTimestamp + (EXPECTED_ATT_TIMEOUT + EXPECTED_ATT_TIMEOUT_DELTA)) {
        console.log("Attestation not received in the expected time window");
        return ReturnCode.ErrWrongAttestationTiming;
    }

    // For each proof, get its Merkle path and evaluate the root
    const attId = parseInt(interestingAttId.data['id']);
    const poeFflonk = await api.rpc.poe.proofPath(attId, proofHashesArray[0]);
    const poeZksync = await api.rpc.poe.proofPath(attId, proofHashesArray[1]);

    console.log('##### proofPath RPC returned (proof fflonk): ' + JSON.stringify(poeFflonk));
    console.log('##### proofPath RPC returned (proof zksync): ' + JSON.stringify(poeZksync));

    // Reconstruct the root from the returned proof
    const proofFflonkVerification = await verifyProof(poeFflonk, publishedRoot);
    console.log("Proof fflonk verification: " + proofFflonkVerification);
    if (!proofFflonkVerification) {
        return ReturnCode.ErrAttProofFailedVerification;
    }

    const proofZksyncVerification = await verifyProof(poeZksync, publishedRoot);
    console.log("Proof zksyn verification: " + proofZksyncVerification);
    if (!proofZksyncVerification) {
        return ReturnCode.ErrAttProofFailedVerification;
    }

    // Any return value different from 1 is considered an error
    return ReturnCode.Ok;
}

async function submitAnExtrinsic(extrinsic, signer, blockUntil) {
    let transactionSuccessEvent = false;

    let retVal = await new Promise(async (resolve, reject) => {
        let proofHash;
        const unsub = await extrinsic.signAndSend(signer, ({ events = [], status }) => {
            console.log('Transaction status:', status.type);

            if (status.isInBlock) {
                console.log(`Transaction included at blockhash ${status.asInBlock}`);
                console.log('Events:');

                events.forEach(({ event: { data, method, section }, phase }) => {
                    console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                    if (section == "system" && method == "ExtrinsicSuccess") {
                        transactionSuccessEvent = true;
                    }
                    if (section == "poe" && method == "NewElement") {
                        proofHash = data[0].toString();
                    }
                });
                if (blockUntil === BlockUntil.InBlock) {
                    unsub();
                    if (transactionSuccessEvent) {
                        resolve(proofHash);
                    } else {
                        reject("ExtrinsicSuccess has not been seen");
                    }
                }
            }

            else if (status.isFinalized) {
                console.log(`Transaction finalized at blockhash ${status.asFinalized}`);
                if (blockUntil === BlockUntil.Finalized) {
                    unsub();
                    if (transactionSuccessEvent) {
                        resolve(proofHash);
                    } else {
                        reject("ExtrinsicSuccess has not been seen");
                    }
                }
            }

            else if (status.isError) {
                unsub();
                reject("Transaction status.isError");
            }
        });
    })
        .then(
            (proofHash) => {
                console.log("Transaction successfully processed: " + proofHash)
                return proofHash;
            },
            error => {
                return -1;
            }
        );

    return retVal;
}

// Wait for the next attestaion id to be published
async function wait_for_new_attestation(api, timeout) {

    const retVal = await new Promise(async (resolve, reject) => {
        // Subscribe to system events via storage
        timeout = setTimeout(function () { unsubscribe(); reject("Timeout expired"); }, timeout);
        const unsubscribe = await api.query.system.events((events) => {
            console.log(`\nReceived ${events.length} events:`);

            // Loop through the Vec<EventRecord>
            events.forEach((record) => {
                // Extract the phase, event and the event types
                const { event, phase } = record;
                const types = event.typeDef;

                // Show what we are busy with
                console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);

                if ((event.section == "poe") && (event.method == "NewAttestation")) {
                    clearTimeout(timeout);
                    unsubscribe();
                    resolve(event);
                }

                // Loop through each of the parameters, displaying the type and data
                event.data.forEach((data, index) => {
                    console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
                });
            });
        });
    }).then(
        (ourBestEvent) => {
            console.log("A new attestation has been published")
            return ourBestEvent;
        },
        error => {
            console.log("An error happened when waiting for the new attestation to be published.")
            return -1;
        }
    );

    return retVal;
}

function stripHexPrefix(input_str) {
    return input_str.toString().replace(/^0x/, '');
}

function verifyProof(proof, publishedRoot) {
    let position = proof['leaf_index'];
    let width = proof['number_of_leaves'];
    let hash = Keccak256(proof['leaf'].toString('hex')).toString('hex');
    proof['proof'].forEach(function (p) {
        p = stripHexPrefix(p);
        if (position % 2 == 1 || position + 1 == width) {
            hash = Keccak256('0x' + p + hash).toString('hex');
        } else {
            hash = Keccak256('0x' + hash + p).toString('hex');
        }
        position = Math.floor(position / 2);
        width = Math.floor((width - 1) / 2) + 1;
    });

    return stripHexPrefix(publishedRoot) == hash;
}

module.exports = { run }


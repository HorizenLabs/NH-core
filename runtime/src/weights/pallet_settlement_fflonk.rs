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

//! Autogenerated weights for `pallet_settlement_fflonk`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 31.0.0
//! DATE: 2024-05-10, STEPS: `50`, REPEAT: `20`, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! WORST CASE MAP SIZE: `1000000`
//! HOSTNAME: `17ca9fae11a4`, CPU: `AMD EPYC 7571`
//! WASM-EXECUTION: `Compiled`, CHAIN: `Some("dev")`, DB CACHE: `1024`

// Executed Command:
// /usr/local/bin/nh-node
// benchmark
// pallet
// --chain
// dev
// --pallet
// pallet-settlement-fflonk
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
// /data/benchmark/runtime/src/weights/pallet_settlement_fflonk.rs
// --template
// /data/benchmark/node/hl-deploy-weight-template.hbs

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]
#![allow(missing_docs)]

use frame_support::{traits::Get, weights::{Weight, constants::RocksDbWeight}};
use core::marker::PhantomData;

/// Weights for `pallet_settlement_fflonk` using the New Horizen node and recommended hardware.
pub struct NHWeight<T>(PhantomData<T>);

impl<T: frame_system::Config> pallet_settlement_fflonk::WeightInfo for NHWeight<T> {
	/// Storage: `Poe::NextAttestation` (r:1 w:0)
	/// Proof: `Poe::NextAttestation` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
	/// Storage: `Poe::Values` (r:1 w:1)
	/// Proof: `Poe::Values` (`max_values`: None, `max_size`: Some(72), added: 2547, mode: `MaxEncodedLen`)
	/// Storage: `Timestamp::Now` (r:1 w:0)
	/// Proof: `Timestamp::Now` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
	/// Storage: `Poe::FirstInsertionTime` (r:0 w:1)
	/// Proof: `Poe::FirstInsertionTime` (`max_values`: Some(1), `max_size`: Some(8), added: 503, mode: `MaxEncodedLen`)
	fn submit_proof() -> Weight {
		// Proof Size summary in bytes:
		//  Measured:  `74`
		//  Estimated: `3537`
		// Minimum execution time: 37_288_622_000 picoseconds.
		Weight::from_parts(37_764_018_000, 3537)
			.saturating_add(T::DbWeight::get().reads(3_u64))
			.saturating_add(T::DbWeight::get().writes(2_u64))
	}
}

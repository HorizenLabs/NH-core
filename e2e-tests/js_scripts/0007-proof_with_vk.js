// Hardcoded proof hashes
const VALID_PROOF = "0x283e3f25323d02dabdb94a897dc2697a3b930d8781381ec574af89a201a91d5a2c2808c59f5c736ff728eedfea58effc2443722e78b2eb4e6759a278e9246d600f9c56dc88e043ce0b90c402e96b1f4b1a246f4d0d69a4c340bc910e1f2fd80519e465e01bd7629f175931feed102cb6459a1be7b08018b93c142e961d0352d80b8e5d340df28c2f454c5a2535ca01a230bb945ee24b1171481a9a2c6496fed61cf8878e40adb52dc27da5e79718f118467319d15d64fed460d69d951376ac631a6c44faaec76e296b43fe720d700a63fd530f9064878b5f72f2ffe7458c2f031ac6ed8c1e0758dfb3702ed29bbc0c14b5e727c164b3ade07b9f164af0be54b0143b1a6534b2dcf2bd660e1b5b420d86c0c350fd9d614b639c5df98009f1375e141259679021d0a6a3aa3aae2516bace4a4a651265217ec0ea7c0d7f89b987100abcc93d98ff40bae16eff6c29955f7a37155bb25672b12eb5074dcb7c3e2b001718a257cca21ee593d1ba9f8e91e5168aed8e0b1893e11a6b583d975e747f8008a8c2150a04d8f867945ca1740dc3fc3b2fc4daff61b4725fb294435a1b90101803690ae70fc212b7e929de9a22a4642ef4772546cf93ffd1b1196a3d9113a3009c506755578932ca3630508ca1ed6ee83df5ec9e26cb0b5800a70967a1a93a04d142b6a532935a31d84f75d16929df6d38c3a210ac4f435a8024dfb7e6c1f3246d58038a943f237325b44f03d106e523adfec4324615a2dd09e1e5b9143b411c1cf09ee411cf9864d30df4904099920cee9ae8134d45dfeb29e46115d2e740098674b8fc2ca31fac6fcc9302860654fdc1b522b7e064b0759bc5924f332fa921121b5af880f83fbce02f19dabb8f684593e7322fb80bfc0d054797b1d4eff411b01bf68f81f2032ae4f7fc514bd76ca1b264f3989a92e6b3d74cda4f8a714920e4c02f5a71082a8bcf5be0b5750a244bd040a776ec541dfc2c8ae73180e9240ada5414d66387211eec80d7d9d48498efa1e646d64bb1bf8775b3796a9fd0bf0fdf8244018ce57b018c093e2f75ed77d8dbdb1a7b60a2da671de2efe5f6b9d70d69b94acdfaca5bacc248a60b35b925a2374644ce0c1205db68228c8921d9d9"
const VKEY = `{
    "power": 24,
    "k1": "2",
    "k2": "3",
    "w": "5709868443893258075976348696661355716898495876243883251619397131511003808859",
    "w3": "21888242871839275217838484774961031246154997185409878258781734729429964517155",
    "w4": "21888242871839275217838484774961031246007050428528088939761107053157389710902",
    "w8": "19540430494807482326159819597004422086093766032135589407132600596362845576832",
    "wr": "18200100796661656210024324131237448517259556535315737226009542456080026430510",
    "X_2": [
        [
            "21831381940315734285607113342023901060522397560371972897001948545212302161822",
            "17231025384763736816414546592865244497437017442647097510447326538965263639101"
        ],
        [
            "2388026358213174446665280700919698872609886601280537296205114254867301080648",
            "11507326595632554467052522095592665270651932854513688777769618397986436103170"
        ],
        [
            "1",
            "0"
        ]
    ],
    "C0": [
        "7436841426934271843999872946312645822871802402068881571108027575346498207286",
        "18448034242258174646222819724328439025708531082946938915005051387020977719791",
        "1"
    ]
}`;
const VKEY_HASH = "0x6fc9745758412a2fd89c21be8542239c860a076620d44a8c7ee933539c0581f7";
const STATEMENT_HASH = "0x2bb91e5bddf3be5ed011bcbfb27414b858b88f66270db91b727892cb7b70a37f";

const ReturnCode = {
    Ok: 1,
    ErrProofVerificationFailed: 2,
    ErrAcceptAnUnregisteredHash: 3,
    ErrVkRegistrationFailed: 4,
    ErrWrongKeyHash: 5,
    ErrProofVerificationHashFailed: 6,
    ErrWrongStatementHash: 7,
};

const { init_api, submitProof, registerVk, receivedEvents } = require('zkv-lib')

async function run(nodeName, networkInfo, args) {
    const api = await init_api(zombie, nodeName, networkInfo);

    // Create a keyring instance
    const keyring = new zombie.Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');

    const vk = {
        ...JSON.parse(VKEY),
        get x2() { return this.X_2 },
        get co() { return this.C0 },
    }

    // Should accept proof with valid VK
    let events = await submitProof(api.tx.settlementFFlonkPallet, alice, VALID_PROOF, { Vk: vk })
    if (!receivedEvents(events)) {
        return ReturnCode.ErrProofVerificationFailed;
    };
    if (STATEMENT_HASH != events[0].data[0]) {
        console.log(`Wrong statement hash ${STATEMENT_HASH} != ${events[0].data[0]}`);
        return ReturnCode.ErrWrongStatementHash;
    }

    // Should reject proof with un unregistered VK hash
    if (receivedEvents(await submitProof(api.tx.settlementFFlonkPallet, alice, VALID_PROOF, { Hash: VKEY_HASH }))) {
        return ReturnCode.ErrAcceptAnUnregisteredHash;
    };

    events = await registerVk(api.tx.settlementFFlonkPallet, alice, vk);
    if (!receivedEvents(events)) {
        return ReturnCode.ErrVkRegistrationFailed;
    };
    const vkHash = events[0].data[0];
    if (VKEY_HASH != vkHash) {
        return ReturnCode.ErrWrongKeyHash;
    }

    events = await submitProof(api.tx.settlementFFlonkPallet, alice, VALID_PROOF, { Hash: vkHash })
    if (!receivedEvents(events)) {
        return ReturnCode.ErrProofVerificationHashFailed;
    };
    if (STATEMENT_HASH != events[0].data[0]) {
        return ReturnCode.ErrWrongStatementHash;
    }

    // Any return value different from 1 is considered an error
    return ReturnCode.Ok;
}

module.exports = { run }


import { EndpointId } from '@layerzerolabs/lz-definitions'

const bitlayer_mainnetContract = {
    eid: EndpointId.BITLAYER_V2_MAINNET,
    contractName: 'Avalon',
}
const bsc_mainnetContract = {
    eid: EndpointId.BSC_V2_MAINNET,
    contractName: 'Avalon',
}
const ethereum_mainnetContract = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'AvalonMintable',
}
const merlin_mainnetContract = {
    eid: EndpointId.MERLIN_V2_MAINNET,
    contractName: 'Avalon',
}

const taiko_mainnetContract = {
    eid: EndpointId.TAIKO_V2_MAINNET,
    contractName: 'Avalon',
}

const bitlayer_dvns = [
    '0x95729ea44326f8add8a9b1d987279dbdc1dd3dff', // Horizen
    '0x6788f52439aca6bff597d3eec2dc9a44b8fee842', // LayerZero Labs
    '0xdd7b5e1db4aafd5c8ec3b764efb8ed265aa5445b', // Nethermind
]

const bsc_dvns = [
    '0x247624e2143504730aec22912ed41f092498bef2', // Horizen
    '0xfd6865c841c2d64565562fcc7e05e619a30615f0', // LayerZero Labs
    '0x31f748a368a893bdb5abb67ec95f232507601a73', // Nethermind
]

const ethereum_dvns = [
    '0x380275805876ff19055ea900cdb2b46a94ecf20d', // Horizen
    '0x589dedbd617e0cbcb916a9223f4d1300c294236b', // LayerZero Labs
    '0xa59ba433ac34d2927232918ef5b2eaafcf130ba5', // Nethermind
]

const merlin_dvns = [
    '0x439264fb87581a70bb6d7befd16b636521b0ad2d', // Horizen
    '0x6788f52439aca6bff597d3eec2dc9a44b8fee842', // LayerZero Labs
    '0xabc9b1819cc4d9846550f928b985993cf6240439', // Nethermind
]

const taiko_dvns = [
    '0xbd237ef21319e2200487bdf30c188c6c34b16d3b', // Horizen
    '0xc097ab8cd7b053326dfe9fb3e3a31a0cce3b526f', // LayerZero Labs
    '0xdd7b5e1db4aafd5c8ec3b764efb8ed265aa5445b', // Nethermind
]

export default {
    contracts: [
        { contract: bitlayer_mainnetContract },
        { contract: bsc_mainnetContract },
        { contract: ethereum_mainnetContract },
        { contract: merlin_mainnetContract },
        { contract: taiko_mainnetContract },
    ],
    connections: [
        {
            from: bitlayer_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: { receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xcCE466a522984415bC91338c232d98869193D46e' },
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: bitlayer_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: bitlayer_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bitlayer_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: { receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xcCE466a522984415bC91338c232d98869193D46e' },
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: bitlayer_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 15,
                        requiredDVNs: bitlayer_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bitlayer_mainnetContract,
            to: merlin_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: { receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xcCE466a522984415bC91338c232d98869193D46e' },
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: bitlayer_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 30,
                        requiredDVNs: bitlayer_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: bitlayer_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: { receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: bsc_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: bsc_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: { receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: bsc_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 15,
                        requiredDVNs: bsc_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: merlin_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: { receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: bsc_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 30,
                        requiredDVNs: bsc_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: bitlayer_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: { receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: 15,
                        requiredDVNs: ethereum_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: ethereum_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: { receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: 15,
                        requiredDVNs: ethereum_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: ethereum_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: merlin_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: { receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: 15,
                        requiredDVNs: ethereum_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 30,
                        requiredDVNs: ethereum_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: taiko_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: { receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: 15,
                        requiredDVNs: ethereum_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 30,
                        requiredDVNs: ethereum_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: merlin_mainnetContract,
            to: bitlayer_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: { receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xc097ab8CD7b053326DFe9fB3E3a31a0CCe3B526f' },
                    ulnConfig: {
                        confirmations: 30,
                        requiredDVNs: merlin_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: merlin_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: merlin_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: { receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xc097ab8CD7b053326DFe9fB3E3a31a0CCe3B526f' },
                    ulnConfig: {
                        confirmations: 30,
                        requiredDVNs: merlin_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 20,
                        requiredDVNs: merlin_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: merlin_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: { receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xc097ab8CD7b053326DFe9fB3E3a31a0CCe3B526f' },
                    ulnConfig: {
                        confirmations: 30,
                        requiredDVNs: merlin_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 15,
                        requiredDVNs: merlin_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: taiko_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0xc1B621b18187F74c8F6D52a6F709Dd2780C09821',
                receiveLibraryConfig: { receiveLibrary: '0x377530cdA84DFb2673bF4d145DCF0C4D7fdcB5b6', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xa20DB4Ffe74A31D17fc24BD32a7DD7555441058e' },
                    ulnConfig: {
                        confirmations: 30,
                        requiredDVNs: taiko_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 15,
                        requiredDVNs: taiko_dvns,
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
    ],
}

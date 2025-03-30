export interface OwnerConfig {
    owner: string
    manager: string
    pause: string
}
export type OwnerConfigMapping = {
    [others: string]: OwnerConfig
}
export const owner: OwnerConfigMapping = {
    'ethereum-mainnet': {
        owner: '0xbA7468D7ACcd1Bb2E346a003ab1713C3d8C4Da6d',
        manager: '0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5',
        pause: '0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5',
    },
    'bsc-mainnet': {
        owner: '0xbA7468D7ACcd1Bb2E346a003ab1713C3d8C4Da6d',
        manager: '0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5',
        pause: '0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5',
    },
    'bitlayer-mainnet': {
        owner: '0xDa6fA8639334ED031eeCad79B311f78f9a441205',
        manager: '0xE46C9bAf5a23E139d9864D7b648F6531A4B3FE6c',
        pause: '0xE46C9bAf5a23E139d9864D7b648F6531A4B3FE6c',
    },
    'merlin-mainnet': {
        owner: '0xDa6fA8639334ED031eeCad79B311f78f9a441205',
        manager: '0xE46C9bAf5a23E139d9864D7b648F6531A4B3FE6c',
        pause: '0xE46C9bAf5a23E139d9864D7b648F6531A4B3FE6c',
    },
    'taiko-mainnet': {
        owner: '0x6691EC6133568579545EacAD015180DEc846c98B',
        manager: '0x0a71164e8964fe5Da633710B4100f5Df3E742EDe',
        pause: '0x0a71164e8964fe5Da633710B4100f5Df3E742EDe',
    },
    'bera-mainnet': {
        owner: '0x74e878f47C5B1F01571e727F25271C1a34bf2cC1',
        manager: '0xE46C9bAf5a23E139d9864D7b648F6531A4B3FE6c',
        pause: '0xE46C9bAf5a23E139d9864D7b648F6531A4B3FE6c',
    },
}

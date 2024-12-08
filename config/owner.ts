
export interface OwnerConfig {
    owner:string,
    manager:string
}
export type OwnerConfigMapping = {
    [others: string]: OwnerConfig;
  };
export const owner: OwnerConfigMapping = {
    'ethereum-mainnet': {
        owner: "0xdFB1b1c0E0f697829aF500D73364D863Cb3c6cE9",
        manager: "0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5"
    },
    'bsc-mainnet': {
        owner: "0x423E47f9BCb654B4aEaC93FB5DbD710850E17ab4",
        manager: "0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5"
    },
    'mantle-mainnet': {
        owner: "0x12c71F3611234e5e4175DE656Fc37e6402299968",
        manager: "0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5"
    },
    'base-mainnet': {
        owner: "0x61e7B331622B4dbBe22D70d1772AF96a64fA2F72",
        manager: "0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5"
    },
    'iotex-mainnet': {
        owner: "",
        manager: ""
    },
    'zksync-mainnet': {
        owner: "0x1026b239E1BBC4719f7834cBCaBb461D5B8a3Edd",
        manager: "0xaCbf4B3904A5D8194FC4B4ada8A98A2ea878d93E"
    },
    'zircuit-mainnet': {
        owner: "0x8773c75C83d497135CEf197Bd862930A04DA77FF",
        manager: "0x0a71164e8964fe5Da633710B4100f5Df3E742EDe"
    },
    'avax-mainnet': {
        owner: "0x691F73f1Ff3e915667441bC5e08b4decF222aa26",
        manager: "0x12098b516443Eb4074A5015ff58bC9f3A1f4c2b5"
    },
    'bitlayer-mainnet': {
        owner: "0x28367D583cC6bdfC7B4657cc3b462b6C8984f01B",
        manager: "0xE46C9bAf5a23E139d9864D7b648F6531A4B3FE6c"
    },
    'kaia-mainnet': {
        owner: "0x8773c75C83d497135CEf197Bd862930A04DA77FF",
        manager: "0x0a71164e8964fe5Da633710B4100f5Df3E742EDe"
    },
  };
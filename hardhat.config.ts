// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import '@openzeppelin/hardhat-upgrades'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-deploy-ethers'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import '@typechain/hardhat'

import fs from 'fs'
import path from 'path'

import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || ''

// load tasks
export const loadTasks = (): void => {
    const tasksPath = path.join(__dirname, './tasks')
    fs.readdirSync(tasksPath)
        .filter((pth) => pth.includes('.ts') || pth.includes('.js'))
        .forEach((task) => {
            require(`${tasksPath}/${task}`)
        })
}

loadTasks()

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        'ethereum-mainnet': {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: process.env.RPC_URL_ETHEREUM || 'https://ethereum.rpc.subquery.network/public',
            accounts,
        },
        'bsc-mainnet': {
            eid: EndpointId.BSC_V2_MAINNET,
            url: process.env.RPC_URL_BSC || 'https://bsc-dataseed1.defibit.io',
            accounts,
        },
        'bitlayer-mainnet': {
            eid: EndpointId.BITLAYER_V2_MAINNET,
            url: process.env.RPC_URL_BITLAYER || 'https://rpc.bitlayer-rpc.com',
            accounts,
        },
        'merlin-mainnet': {
            eid: EndpointId.MERLIN_V2_MAINNET,
            url: process.env.RPC_URL_MERLIN || 'https://rpc.merlinchain.io',
            accounts,
        },
        'sepolia-testnet': {
            eid: EndpointId.SEPOLIA_V2_TESTNET,
            url: process.env.RPC_URL_ETHEREUM_SEPOLIA || 'https://eth-sepolia.api.onfinality.io/public',
            accounts,
        },
        hardhat: {
            // Need this for testing because TestHelperOz5.sol is exceeding the compiled contract size limit
            allowUnlimitedContractSize: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_KEY,
        customChains: [
            {
                network: 'bitlayer-mainnet',
                chainId: 200901,
                urls: {
                    apiURL: 'https://api.btrscan.com/scan/api',
                    browserURL: 'https://www.btrscan.com/',
                },
            },
            {
                network: 'merlin-mainnet',
                chainId: 4200,
                urls: {
                    apiURL: 'https://scan.merlinchain.io/api/contract',
                    browserURL: 'https://scan.merlinchain.io/',
                },
            },
        ],
    },
    layerZero: {
        // You can tell hardhat toolbox not to include any deployments (hover over the property name to see full docs)
        deploymentSourcePackages: [],
        // You can tell hardhat not to include any artifacts either
        // artifactSourcePackages: [],
    },
}

export default config

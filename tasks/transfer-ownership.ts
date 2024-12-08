/**
  Script to setup OFTs for the token on the various networks.

  npx hardhat check-oft-ownership --network arbitrum --execute 1
 */
import { task } from 'hardhat/config'

import { owner } from '../config/owner'
import { Avalon } from '../typechain-types'

import { waitForTx } from './utils/tx'

task(`transfer-ownership`, `Transfer the OFT's ownership`)
    .addParam('symbol', 'token symbol')
    .addOptionalParam('execute', 'execute the ownership transfer to safe')
    .setAction(async ({ symbol, execute }, { getNamedAccounts, ...hre }) => {
        const { deployer } = await getNamedAccounts()
        const c = owner[hre.network.name]
        if (!c) throw new Error('cannot find connection')

        const oftD = await hre.deployments.get(`${symbol}`)
        console.log(oftD.address)
        const oft = (await hre.ethers.getContractAt('contracts/Avalon.sol:Avalon', oftD.address)) as unknown as Avalon

        console.log('checking for', hre.network.name)
        console.log('current owner', await oft.owner())
        console.log('deployer', deployer)

        const DEFAULT_ADMIN_ROLE = await oft.DEFAULT_ADMIN_ROLE()
        const ADMIN_ROLE = await oft.ADMIN_ROLE()
        const PAUSE_ROLE = await oft.PAUSE_ROLE()
        const MANAGER_ROLE = await oft.MANAGER_ROLE()

        if (c.owner != '' && execute && (await oft.owner()) !== c.owner) {
            const isContract = await hre.network.provider.request({
                method: 'eth_getCode',
                params: [c.owner, 'latest'],
            })

            if (isContract !== '0x') {
                console.log('executing changes')
                // set admin
                await waitForTx(await oft.grantRole(DEFAULT_ADMIN_ROLE, c.owner))
                await waitForTx(await oft.grantRole(ADMIN_ROLE, c.owner))
                await waitForTx(await oft.grantRole(PAUSE_ROLE, c.manager))
                await waitForTx(await oft.grantRole(MANAGER_ROLE, c.manager))
                await waitForTx(await oft.renounceRole(DEFAULT_ADMIN_ROLE, deployer))
                await waitForTx(await oft.renounceRole(ADMIN_ROLE, deployer))
                await waitForTx(await oft.transferOwnership(c.owner))
            } else {
                console.log('Target Address is not a safe')
            }
        }
        console.log('done\n')
    })

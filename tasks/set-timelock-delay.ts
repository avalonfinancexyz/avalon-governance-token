/**
  Script to setup OFTs for the token on the various networks.

  npx hardhat check-oft-ownership --network arbitrum --execute 1
 */
import { Contract, ethers } from 'ethers'
import { task } from 'hardhat/config'

import { owner } from '../config/owner'

import { waitForTx } from './utils/tx'

task(`set-timelock-delay`, `Set timelock delay`)
    .addParam('delay', 'delay in seconds')
    .setAction(async ({ delay }, { getNamedAccounts, ...hre }) => {
        const { deployer } = await getNamedAccounts()
        const c = owner[hre.network.name]
        if (!c) throw new Error('cannot find connection')

        console.log(`Set timelock delay to ${delay} seconds`)

        const timelockD = await hre.deployments.get('AvalonTimelock')
        console.log('timelock address deployed at', timelockD.address)
        const timelock = new Contract(timelockD.address, timelockD.abi, await hre.ethers.getSigner(deployer))

        const deployerIsAdmin = await timelock.hasRole(await timelock.PROPOSER_ROLE(), deployer)
        if (deployerIsAdmin) {
            console.log(` - deployer is admin: ${deployer}`)
        } else {
            const multisig = c.owner
            const multisigIsAdmin = await timelock.hasRole(await timelock.PROPOSER_ROLE(), multisig)
            if (multisigIsAdmin) {
                console.log(` - multisig is admin: ${multisig}`)
            } else {
                throw new Error('no admin found')
            }
        }

        console.log(` - schedule updateDelay`)
        const timelockCalldata = timelock.interface.encodeFunctionData('schedule', [
            timelock.address,
            0,
            timelock.interface.encodeFunctionData('updateDelay', [delay]),
            ethers.constants.HashZero,
            ethers.constants.HashZero,
            await timelock.getMinDelay(),
        ])
        console.log(' - timelock: ', timelock.address)
        console.log(' - Calldata: ', timelockCalldata)

        console.log(` - execute updateDelay`)
        const timelockExecuteCalldata = timelock.interface.encodeFunctionData('execute', [
            timelock.address,
            0,
            timelock.interface.encodeFunctionData('updateDelay', [delay]),
            ethers.constants.HashZero,
            ethers.constants.HashZero,
        ])
        console.log(' - timelock: ', timelock.address)
        console.log(' - Calldata: ', timelockExecuteCalldata)
    })

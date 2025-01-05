/**
  Script to setup OFTs for the token on the various networks.

  npx hardhat check-oft-ownership --network arbitrum --execute 1
 */
import { Contract, ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { task } from 'hardhat/config'

import { owner } from '../config/owner'

import { waitForTx } from './utils/tx'

task(`mint-avl`, `Mint AVL`)
    .addParam('amount', 'amount of AVL to mint')
    .setAction(async ({ amount }, { getNamedAccounts, ...hre }) => {
        const { deployer } = await getNamedAccounts()
        const c = owner[hre.network.name]
        if (!c) throw new Error('cannot find connection')

        const oftD = await hre.deployments.get(`AvalonMintable`)
        console.log(oftD.address)
        const oft = new Contract(oftD.address, oftD.abi, await hre.ethers.getSigner(deployer))

        const oftOwner = await oft.owner()
        console.log(`Mint ${amount} AVL to ${oftOwner}`)

        const amountBn = parseUnits(amount, await oft.decimals())

        const deployerIsAdmin = await oft.hasRole(await oft.MINT_ROLE(), deployer)
        if (deployerIsAdmin) {
            await waitForTx(await oft.mint(amountBn))
        } else {
            const multisig = c.owner
            const multisigIsAdmin = await oft.hasRole(await oft.MINT_ROLE(), multisig)
            if (multisigIsAdmin) {
                console.log(` - Not minter, executed mint from multisig:`, multisig)
                const calldata = oft.interface.encodeFunctionData('mint', [amountBn])
                console.log(' - oft: ', oft.address)
                console.log(' - Calldata: ', calldata)
            } else {
                const timelockD = await hre.deployments.get(`AvalonTimelock`)
                const timelock = new Contract(timelockD.address, timelockD.abi, await hre.ethers.getSigner(deployer))
                const timelockIsAdmin = await oft.hasRole(await oft.MINT_ROLE(), timelock.address)
                if (timelockIsAdmin) {
                    console.log(` - Not minter, schedule mint from timelock:`, timelock.address)
                    const mintCalldata = oft.interface.encodeFunctionData('mint', [amountBn])
                    const timelockCalldata = timelock.interface.encodeFunctionData('schedule', [
                        oft.address,
                        0,
                        mintCalldata,
                        ethers.constants.HashZero,
                        ethers.constants.HashZero,
                        await timelock.getMinDelay(),
                    ])
                    console.log(' - timelock: ', timelock.address)
                    console.log(' - Calldata: ', timelockCalldata)

                    console.log(` - Not minter, execute mint from timelock:`, timelock.address)
                    const timelockExecuteCalldata = timelock.interface.encodeFunctionData('execute', [
                        oft.address,
                        0,
                        mintCalldata,
                        ethers.constants.HashZero,
                        ethers.constants.HashZero,
                    ])
                    console.log(' - timelock: ', timelock.address)
                    console.log(' - Calldata: ', timelockExecuteCalldata)
                } else {
                    throw new Error('timelock is not admin')
                }
            }
        }
    })

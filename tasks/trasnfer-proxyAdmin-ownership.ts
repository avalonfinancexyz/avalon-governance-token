/**
  Script to setup OFTs for the token on the various networks.

  npx hardhat check-oft-ownership --network arbitrum --execute 1
 */
import { Contract } from 'ethers'
import { task } from 'hardhat/config'

import { owner } from '../config/owner'

import { waitForTx } from './utils/tx'

task(`transfer-proxyAdmin-ownership`, `Transfer the ProxyAdmin's ownership`)
    .addOptionalParam('execute', 'execute the ownership transfer to safe')
    .setAction(async ({ execute }, { getNamedAccounts, ...hre }) => {
        const { deployer } = await getNamedAccounts()
        const c = owner[hre.network.name]
        if (!c) throw new Error('cannot find connection')

        const proxyAdminD = await hre.deployments.get(`DefaultProxyAdmin`)
        console.log(proxyAdminD.address)
        const proxyAdmin = new Contract(proxyAdminD.address, proxyAdminD.abi, await hre.ethers.getSigner(deployer))

        console.log('checking for', hre.network.name)
        console.log('current owner', await proxyAdmin.owner())
        console.log('deployer', deployer)

        if (c.owner != '' && execute && (await proxyAdmin.owner()) !== c.owner) {
            const isContract = await hre.network.provider.request({
                method: 'eth_getCode',
                params: [c.owner, 'latest'],
            })

            if (isContract !== '0x') {
                console.log('executing changes')
                await waitForTx(await proxyAdmin.transferOwnership(c.owner))
            } else {
                console.log('Target Address is not a safe')
            }
        }
        console.log('done\n')

        console.log('owner', await proxyAdmin.owner())
    })

/**
  Script to setup OFTs for the token on the various networks.

  npx hardhat check-oft-ownership --network arbitrum --execute 1
 */
import { task } from 'hardhat/config'

import { EndpointV2__factory } from '@layerzerolabs/lz-evm-sdk-v2'

import { owner } from '../config/owner'
import { AvalonMintable } from '../typechain-types'

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
        const oft = (await hre.ethers.getContractAt(
            `contracts/${symbol}.sol:${symbol}`,
            oftD.address
        )) as unknown as AvalonMintable

        console.log('checking for', hre.network.name)
        console.log('current owner', await oft.owner())
        console.log('deployer', deployer)

        const DEFAULT_ADMIN_ROLE = await oft.DEFAULT_ADMIN_ROLE()
        const ADMIN_ROLE = await oft.ADMIN_ROLE()
        const PAUSE_ROLE = await oft.PAUSE_ROLE()
        const MANAGER_ROLE = await oft.MANAGER_ROLE()

        const timelock = await hre.deployments.get('AvalonTimelock')
        console.log('timelock address deployed at', timelock.address)

        if (c.owner != '' && execute && (await oft.owner()) !== c.owner) {
            const isContract = await hre.network.provider.request({
                method: 'eth_getCode',
                params: [c.owner, 'latest'],
            })

            if (isContract !== '0x') {
                console.log('executing changes')
                // set admin
                console.log('setting DEFAULT_ADMIN_ROLE')
                await waitForTx(await oft.grantRole(DEFAULT_ADMIN_ROLE, c.owner))

                console.log('setting ADMIN_ROLE')
                await waitForTx(await oft.grantRole(ADMIN_ROLE, timelock.address))

                console.log('try setting MINT_ROLE')
                try {
                    const MINT_ROLE = await oft.MINT_ROLE()
                    await waitForTx(await oft.grantRole(MINT_ROLE, timelock.address))
                } catch (error) {
                    console.log('NO MINT_ROLE')
                }

                console.log('setting MANAGER_ROLE')
                await waitForTx(await oft.grantRole(MANAGER_ROLE, c.manager))

                console.log('setting PAUSE_ROLE')
                await waitForTx(await oft.grantRole(PAUSE_ROLE, c.pause))

                console.log('setting delegate')
                await waitForTx(await oft.setDelegate(c.owner))

                console.log('renouncing DEFAULT_ADMIN_ROLE')
                await waitForTx(await oft.renounceRole(DEFAULT_ADMIN_ROLE, deployer))

                console.log('renouncing ADMIN_ROLE')
                await waitForTx(await oft.renounceRole(ADMIN_ROLE, deployer))

                console.log('transferring ownership')
                await waitForTx(await oft.transferOwnership(c.owner))
            } else {
                console.log('Target Address is not a safe')
            }
        }
        console.log('done\n')

        console.log('DEFAULT_ADMIN_ROLE')
        const deployerHasRole = await oft.hasRole(DEFAULT_ADMIN_ROLE, deployer)
        console.log(deployer, 'deployer has role', deployerHasRole)
        const ownerHasRole = await oft.hasRole(DEFAULT_ADMIN_ROLE, c.owner)
        console.log(c.owner, 'owner has role', ownerHasRole)
        console.log('-'.repeat(100))

        console.log('ADMIN_ROLE', ADMIN_ROLE)
        const deployerHasAdminRole = await oft.hasRole(ADMIN_ROLE, deployer)
        console.log(deployer, 'deployer has admin role', deployerHasAdminRole)
        const timelockHasAdminRole = await oft.hasRole(ADMIN_ROLE, timelock.address)
        console.log(timelock.address, 'timelock has admin role', timelockHasAdminRole)
        console.log('-'.repeat(100))

        try {
            const MINT_ROLE = await oft.MINT_ROLE()
            const deployerHasMintRole = await oft.hasRole(MINT_ROLE, deployer)
            console.log(deployer, 'deployer has mint role', deployerHasMintRole)
            const timelockHasMintRole = await oft.hasRole(MINT_ROLE, timelock.address)
            console.log(timelock.address, 'timelock has mint role', timelockHasMintRole)
        } catch (error) {
            console.log('NO MINT_ROLE')
        }
        console.log('-'.repeat(100))

        console.log('MANAGER_ROLE', MANAGER_ROLE)
        const deployerHasManagerRole = await oft.hasRole(MANAGER_ROLE, deployer)
        console.log(deployer, 'deployer has manager role', deployerHasManagerRole)
        const managerHasManagerRole = await oft.hasRole(MANAGER_ROLE, c.manager)
        console.log(c.manager, 'manager has manager role', managerHasManagerRole)
        console.log('-'.repeat(100))

        console.log('PAUSE_ROLE', PAUSE_ROLE)
        const deployerHasPauseRole = await oft.hasRole(PAUSE_ROLE, deployer)
        console.log(deployer, 'deployer has pause role', deployerHasPauseRole)
        const pauseHasPauseRole = await oft.hasRole(PAUSE_ROLE, c.pause)
        console.log(c.pause, 'pause has pause role', pauseHasPauseRole)
        console.log('-'.repeat(100))

        console.log(
            'delegate',
            await EndpointV2__factory.connect(await oft.endpoint(), hre.ethers.provider).delegates(oft.address)
        )

        console.log('owner', await oft.owner())
    })

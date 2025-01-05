import { task } from 'hardhat/config'

import { owner } from '../config/owner'

const MIN_DELAY = 60 // default to 1 minute

task(`verify-timelock`).setAction(async (_, { deployments, ...hre }) => {
    const { get } = deployments
    console.log('hre.network.name', hre.network.name)
    const network = hre.network.name
    const c = owner[network]
    if (!c) throw new Error('cannot find connection')

    try {
        console.log(`- Verifying AvalonTimelock`)

        const timelockArtifact = await get('AvalonTimelock')
        await hre.run('verify:verify', {
            contract: 'contracts/AvalonTimelock.sol:AvalonTimelock',
            address: timelockArtifact.address,
            constructorArguments: [MIN_DELAY, [c.owner], [c.owner], c.owner],
        })
    } catch (error) {
        console.error(error)
    }
})

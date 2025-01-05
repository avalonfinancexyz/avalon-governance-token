import { type DeployFunction } from 'hardhat-deploy/types'

import { owner } from '../config/owner'

const contractName = 'AvalonTimelock'

const MIN_DELAY = 60 // default to 1 minute

const deploy: DeployFunction = async (hre) => {
    const { deploy } = hre.deployments
    const signer = (await hre.ethers.getSigners())[0]
    console.log(`deploying ${contractName} on network: ${hre.network.name} with ${signer.address}`)

    const c = owner[hre.network.name]
    if (!c) throw new Error('cannot find connection')

    await deploy(contractName, {
        from: signer.address,
        args: [MIN_DELAY, [c.owner], [c.owner], c.owner],
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: false,
    })
}

deploy.tags = [contractName]

export default deploy

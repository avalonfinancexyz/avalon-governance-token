import { Contract } from 'ethers'
import { task } from 'hardhat/config'

import { getDeploymentAddressAndAbi } from '@layerzerolabs/lz-evm-sdk-v2'

task(`verify-avl`).setAction(async (_, { deployments, ...hre }) => {
    const { get } = deployments
    console.log('hre.network.name', hre.network.name)

    try {
        console.log(`- Verifying Avalon`)

        const { address, abi } = getDeploymentAddressAndAbi(hre.network.name, 'EndpointV2')
        const endpointV2Deployment = new Contract(address, abi, hre.ethers.provider)

        const avlArtifact = await get('Avalon')
        await hre.run('verify:verify', {
            contract: 'contracts/Avalon.sol:Avalon',
            address: avlArtifact.address,
            constructorArguments: [endpointV2Deployment.address],
        })
    } catch (error) {
        console.error(error)
    }
})

import { Contract } from 'ethers'
import { task } from 'hardhat/config'

import { getDeploymentAddressAndAbi } from '@layerzerolabs/lz-evm-sdk-v2'

task(`verify-avlMintable`).setAction(async (_, { deployments, ...hre }) => {
    const { get } = deployments
    console.log('hre.network.name', hre.network.name)

    try {
        console.log(`- Verifying Avalon`)

        const { address, abi } = getDeploymentAddressAndAbi(hre.network.name, 'EndpointV2')
        const endpointV2Deployment = new Contract(address, abi, hre.ethers.provider)

        const avlMintableArtifact = await get('AvalonMintable')
        await hre.run('verify:verify', {
            contract: 'contracts/AvalonMintable.sol:AvalonMintable',
            address: avlMintableArtifact.address,
            constructorArguments: [endpointV2Deployment.address],
        })
    } catch (error) {
        console.error(error)
    }
})

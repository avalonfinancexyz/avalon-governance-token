import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { Contract, ContractFactory } from 'ethers'
import { deployments, ethers, upgrades } from 'hardhat'

describe('Avalon Test', () => {
    // Constant representing a mock Endpoint ID for testing purposes
    const eidA = 1
    const eidB = 2
    // Declaration of variables to be used in the test suite
    let Avalon: ContractFactory
    let EndpointV2Mock: ContractFactory
    let ownerA: SignerWithAddress
    let ownerB: SignerWithAddress
    let endpointOwner: SignerWithAddress
    let avalonA: Contract
    let avalonB: Contract
    let mockEndpointV2A: Contract
    let mockEndpointV2B: Contract

    before(async function () {
        Avalon = await ethers.getContractFactory('Avalon')

        // Fetching the first three signers (accounts) from Hardhat's local Ethereum network
        const signers = await ethers.getSigners()

        ;[ownerA, ownerB, endpointOwner] = signers

        // The EndpointV2Mock contract comes from @layerzerolabs/test-devtools-evm-hardhat package
        // and its artifacts are connected as external artifacts to this project
        //
        // Unfortunately, hardhat itself does not yet provide a way of connecting external artifacts,
        // so we rely on hardhat-deploy to create a ContractFactory for EndpointV2Mock
        //
        // See https://github.com/NomicFoundation/hardhat/issues/1040
        const EndpointV2MockArtifact = await deployments.getArtifact('EndpointV2Mock')
        EndpointV2Mock = new ContractFactory(EndpointV2MockArtifact.abi, EndpointV2MockArtifact.bytecode, endpointOwner)
    })

    // beforeEach hook for setup that runs before each test in the block
    beforeEach(async function () {
        // Deploying a mock LZEndpoint with the given Endpoint ID
        mockEndpointV2A = await EndpointV2Mock.deploy(eidA)
        mockEndpointV2B = await EndpointV2Mock.deploy(eidB)

        // Deploying two instances of Avalon contract with different identifiers and linking them to the mock LZEndpoint
        avalonA = await Avalon.deploy(mockEndpointV2A.address)
        avalonB = await Avalon.deploy(mockEndpointV2B.address)

        // Setting destination endpoints in the LZEndpoint mock for each Avalon instance
        await mockEndpointV2A.setDestLzEndpoint(avalonB.address, mockEndpointV2B.address)
        await mockEndpointV2B.setDestLzEndpoint(avalonA.address, mockEndpointV2A.address)
    })

    it('should upgrade', async () => {
        // Deploying the upgradeable contract
        const Avalon = await ethers.getContractFactory('Avalon')
        const avalon = await upgrades.deployProxy(Avalon, ['Avalon', 'MOFT', ownerA.address], {
            initializer: 'initialize',
            constructorArgs: [mockEndpointV2A.address],
            unsafeAllow: ['constructor', 'state-variable-immutable'],
        })
        const avalonImpl = (await upgrades.admin.getInstance(ownerA)).functions.getProxyImplementation(avalon.address)

        // Upgrade the contract to the mock, so it has a "mint" function
        const AvalonMock = await ethers.getContractFactory('AvalonMock')
        const avalonMock = await upgrades.upgradeProxy(avalon.address, AvalonMock, {
            constructorArgs: [mockEndpointV2A.address],
            unsafeAllow: ['constructor', 'state-variable-immutable'],
        })

        // Ensure the proxy remains constant after the upgrade
        expect(avalon.address).to.equal(avalonMock.address)
        const avalonMockImpl = (await upgrades.admin.getInstance(ownerA)).functions.getProxyImplementation(
            avalonMock.address
        )
        // ensure the implementation address changed
        expect(avalonImpl).to.not.equal(avalonMockImpl)
        const [intialBalance] = await avalonMock.functions.balanceOf(ownerA.address)
        // ensure we can mint now
        await (await avalonMock.functions.mint(ownerA.address, 100)).wait()
        const [finalBalance] = await avalonMock.functions.balanceOf(ownerA.address)
        expect(finalBalance.toNumber()).to.equal(intialBalance.add(100).toNumber())

        // Downgrade the contract to remove mint
        const avalonAgain = await upgrades.upgradeProxy(avalonMock.address, Avalon, {
            constructorArgs: [mockEndpointV2A.address],
            unsafeAllow: ['constructor', 'state-variable-immutable'],
        })
        // Ensure the proxy remains constant after the upgrade
        expect(avalonMock.address).to.equal(avalonAgain.address)
        // Ensure that the tokens don't disappear into thin air
        const [postUpgradeBalance] = await avalonMock.functions.balanceOf(ownerA.address)
        expect(postUpgradeBalance.toNumber()).to.equal(finalBalance.toNumber())
    })
})

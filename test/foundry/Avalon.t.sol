// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {OFTTest} from "@layerzerolabs/oft-evm-upgradeable/test/OFT.t.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC20CappedUpgradeable} from
    "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";

import {AvalonMintable} from "../../contracts/AvalonMintable.sol";
import {Avalon} from "../../contracts/Avalon.sol";

contract AvalonTest is OFTTest {
    address ownerA = makeAddr("ownerA");
    address ownerB = makeAddr("ownerB");

    AvalonMintable avalonA;
    Avalon avalonB;

    uint256 mintCap = 1e9;

    function setUp() public override {
        super.setUp();

        avalonA = AvalonMintable(
            _deployContractAndProxy(
                type(AvalonMintable).creationCode,
                abi.encode(address(endpoints[aEid])),
                abi.encodeWithSelector(AvalonMintable.initialize.selector, "Avalon", "Avalon", address(this), mintCap)
            )
        );

        avalonB = Avalon(
            _deployContractAndProxy(
                type(Avalon).creationCode,
                abi.encode(address(endpoints[bEid])),
                abi.encodeWithSelector(Avalon.initialize.selector, "Avalon", "Avalon", address(this))
            )
        );
    }

    function test_revert_reinitialize() public {
        vm.expectRevert(Initializable.InvalidInitialization.selector);
        avalonA.initialize("Avalon", "Avalon", address(this), 100000);
        vm.expectRevert(Initializable.InvalidInitialization.selector);
        avalonB.initialize("Avalon", "Avalon", address(this));
    }

    function test_mint_cap() public {
        avalonA.grantRole(avalonA.MINT_ROLE(), address(this));

        avalonA.mint(ownerA, mintCap);
        assertEq(avalonA.balanceOf(ownerA), mintCap);

        vm.expectRevert(abi.encodeWithSelector(ERC20CappedUpgradeable.ERC20ExceededCap.selector, mintCap + 1, mintCap));
        avalonA.mint(ownerA, 1);
    }

    function test_blacklist() public {
        avalonA.grantRole(avalonA.MANAGER_ROLE(), address(this));
        avalonA.addBlackList(ownerA);
        assertEq(avalonA.isBlackListed(ownerA), true);
    }

    function test_burn() public {
        avalonA.grantRole(avalonA.MINT_ROLE(), address(this));
        avalonA.grantRole(avalonA.BURN_ROLE(), address(this));
        avalonA.grantRole(avalonA.MANAGER_ROLE(), address(this));

        avalonA.mint(ownerA, mintCap);
        assertEq(avalonA.balanceOf(ownerA), mintCap);

        vm.expectRevert(AvalonMintable.NotInBlackList.selector);
        avalonA.burn(ownerA, 1);

        avalonA.addBlackList(ownerA);
        avalonA.burn(ownerA, 1);
        assertEq(avalonA.balanceOf(ownerA), mintCap - 1);
    }
}

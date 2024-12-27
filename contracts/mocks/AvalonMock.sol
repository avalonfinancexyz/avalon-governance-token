// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {AvalonMintable} from "../AvalonMintable.sol";

// @dev WARNING: This is for testing purposes only
contract AvalonMock is AvalonMintable {
    constructor(address _lzEndpoint) AvalonMintable(_lzEndpoint) {}

    function mint(uint256 _amount) public override {
        _mint(owner(), _amount);
    }
}

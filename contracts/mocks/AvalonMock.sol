// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {Avalon} from "../Avalon.sol";

// @dev WARNING: This is for testing purposes only
contract AvalonMock is Avalon {
    constructor(address _lzEndpoint) Avalon(_lzEndpoint) {}

    function mint(address _to, uint256 _amount) public override {
        _mint(_to, _amount);
    }
}

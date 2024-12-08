// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {AvalonOFTAdapter} from "../AvalonOFTAdapter.sol";

// @dev WARNING: This is for testing purposes only
contract AvalonOFTAdapterMock is AvalonOFTAdapter {
    constructor(address _token, address _lzEndpoint) AvalonOFTAdapter(_token, _lzEndpoint) {
        _disableInitializers();
    }
}

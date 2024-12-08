// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {OFTUpgradeable} from "@layerzerolabs/oft-evm-upgradeable/contracts/oft/OFTUpgradeable.sol";

contract Avalon is OFTUpgradeable, AccessControlUpgradeable, PausableUpgradeable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant MINT_ROLE = keccak256("MINT_ROLE");
    bytes32 public constant BURN_ROLE = keccak256("BURN_ROLE");
    bytes32 public constant PAUSE_ROLE = keccak256("PAUSE_ROLE");

    mapping(address => bool) public isBlackListed;

    event AddedBlackList(address _addr);
    event RemovedBlackList(address _addr);

    constructor(address _lzEndpoint) OFTUpgradeable(_lzEndpoint) {
        _disableInitializers();
    }

    function initialize(string memory _name, string memory _symbol, address _delegate) public initializer {
        __OFT_init(_name, _symbol, _delegate);
        __Ownable_init(_delegate);

        _grantRole(DEFAULT_ADMIN_ROLE, _delegate);
        _grantRole(ADMIN_ROLE, _delegate);
        _setRoleAdmin(MANAGER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(MINT_ROLE, ADMIN_ROLE);
        _setRoleAdmin(BURN_ROLE, ADMIN_ROLE);
        _setRoleAdmin(PAUSE_ROLE, ADMIN_ROLE);
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
    }

    function addBlackList(address _addr) public onlyRole(MANAGER_ROLE) {
        isBlackListed[_addr] = true;
        emit AddedBlackList(_addr);
    }

    function removeBlackList(address _addr) public onlyRole(MANAGER_ROLE) {
        isBlackListed[_addr] = false;
        emit RemovedBlackList(_addr);
    }

    function pause() external onlyRole(PAUSE_ROLE) {
        PausableUpgradeable._pause();
    }

    function unpause() external onlyRole(PAUSE_ROLE) {
        PausableUpgradeable._unpause();
    }

    function mint(address _user, uint256 _amount) public virtual onlyRole(MINT_ROLE) {
        _mint(_user, _amount);
    }

    function burn(address _user, uint256 _amount) public virtual onlyRole(BURN_ROLE) {
        _burn(_user, _amount);
    }

    function _update(address from, address to, uint256 value) internal override whenNotPaused {
        require(!isBlackListed[from] && !isBlackListed[to], "isBlackListed");
        super._update(from, to, value);
    }
}

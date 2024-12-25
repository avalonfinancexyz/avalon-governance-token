// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";

import "./Avalon.sol";

contract AvalonMintable is Avalon, ERC20CappedUpgradeable {
    bytes32 public constant MINT_ROLE = keccak256("MINT_ROLE");
    bytes32 public constant BURN_ROLE = keccak256("BURN_ROLE");

    error NotInBlackList();

    constructor(address _lzEndpoint) Avalon(_lzEndpoint) {
        _disableInitializers();
    }

    function initialize(string memory _name, string memory _symbol, address _delegate, uint256 _cap)
        public
        initializer
    {
        __ERC20Capped_init(_cap);
        super.initialize(_name, _symbol, _delegate);

        _setRoleAdmin(MINT_ROLE, ADMIN_ROLE);
        _setRoleAdmin(BURN_ROLE, ADMIN_ROLE);
    }

    function mint(address _user, uint256 _amount) public virtual onlyRole(MINT_ROLE) {
        _mint(_user, _amount);
    }

    function burn(address _user, uint256 _amount) public virtual onlyRole(BURN_ROLE) {
        if (!isBlackListed[_user]) revert NotInBlackList();
        _burn(_user, _amount);
    }

    function _update(address from, address to, uint256 value) internal override(ERC20CappedUpgradeable, Avalon) {
        super._update(from, to, value);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";

import "./Avalon.sol";

contract AvalonMintable is Avalon, ERC20CappedUpgradeable {
    bytes32 public constant MINT_ROLE = keccak256("MINT_ROLE");

    uint256 public mintedAmount;

    event MintedAmountUpdated(uint256 amount);

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
    }

    function mint(uint256 _amount) public virtual onlyRole(MINT_ROLE) {
        _mint(owner(), _amount);

        mintedAmount += _amount;
        emit MintedAmountUpdated(mintedAmount);

        uint256 maxSupply = cap();
        if (mintedAmount > maxSupply) revert ERC20ExceededCap(mintedAmount, maxSupply);
    }

    function _update(address from, address to, uint256 value) internal override(ERC20CappedUpgradeable, Avalon) {
        super._update(from, to, value);
    }
}

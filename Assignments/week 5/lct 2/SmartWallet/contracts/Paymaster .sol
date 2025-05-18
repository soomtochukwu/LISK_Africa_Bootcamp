// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SmartWallet.sol";

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
}

/// @title Paymaster accepting ERC20 to sponsor gas
contract Paymaster {
    IERC20 public token;
    address public entryPoint;

    event GasSponsored(address indexed user, uint256 amount);

    constructor(IERC20 _token, address _entryPoint) {
        token = _token;
        entryPoint = _entryPoint;
    }

    /// @notice Called by EntryPoint to sponsor gas using ERC20 tokens
    function depositFor(address user, uint256 amount) external {
        require(msg.sender == entryPoint, "Paymaster: only EntryPoint");
        require(
            token.transferFrom(user, address(this), amount),
            "Paymaster: transfer failed"
        );
        emit GasSponsored(user, amount);
    }

    /// @notice Allows entry point to withdraw sponsored tokens
    function withdraw(address to, uint256 amount) external {
        require(
            msg.sender == entryPoint,
            "Paymaster: only EntryPoint can withdraw"
        );
        require(token.transfer(to, amount), "Paymaster: withdraw failed");
    }

    receive() external payable {}
}

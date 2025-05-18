// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SmartWallet.sol"; // Import the SmartWallet (for context; not directly used here)

// Interface for interacting with ERC20 tokens
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

// Simulates a Paymaster contract that sponsors transaction gas using ERC20 tokens
contract Paymaster {
    // The ERC20 token used for gas sponsorship
    IERC20 public token;
    // Trusted EntryPoint contract that coordinates gas handling
    address public entryPoint;

    // Logs when a user's gas is sponsored
    event GasSponsored(address indexed user, uint256 amount);

    constructor(IERC20 _token, address _entryPoint) {
        token = _token;
        entryPoint = _entryPoint;
    }

    // Deposits tokens on behalf of the user to sponsor gas
    function depositFor(address user, uint256 amount) external {
        require(msg.sender == entryPoint, "Paymaster: only EntryPoint");

        // Transfer tokens from user to this Paymaster contract
        require(
            token.transferFrom(user, address(this), amount),
            "Paymaster: transfer failed"
        );

        emit GasSponsored(user, amount);
    }

    //  Withdraws sponsored tokens back to the EntryPoint or another address
    function withdraw(address to, uint256 amount) external {
        require(
            msg.sender == entryPoint,
            "Paymaster: only EntryPoint can withdraw"
        );

        require(token.transfer(to, amount), "Paymaster: withdraw failed");
    }

    // Fallback function to allow ETH reception
    receive() external payable {}
}

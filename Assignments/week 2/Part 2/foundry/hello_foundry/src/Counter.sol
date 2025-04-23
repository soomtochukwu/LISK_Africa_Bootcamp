// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter {
    uint256 public count;

    function get() public view returns (uint256) {
        return count;
    }

    function inc() public {
        count = count + 1;
    }

    function dec() public {
        // Prevent underflow
        require(count > 0, "Counter: cannot decrement below zero");
        count -= 1;
    }

    function reset() public {
        count = 0;
    }
}

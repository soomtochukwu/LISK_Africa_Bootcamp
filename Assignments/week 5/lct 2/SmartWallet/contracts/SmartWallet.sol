// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title SmartWallet simulating basic EIP-4337 UserOp handling
contract SmartWallet {
    address public owner;
    uint256 public nonce;

    event Executed(address indexed to, uint256 value, bytes data);
    event BatchExecuted(address[] tos, uint256[] values, bytes[] datas);

    constructor(address _owner) {
        owner = _owner;
        nonce = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "SmartWallet: only owner");
        _;
    }

    /// @notice Executes a call or ETH transfer
    function execute(
        address to,
        uint256 value,
        bytes calldata data
    ) external onlyOwner returns (bytes memory) {
        (bool success, bytes memory result) = to.call{value: value}(data);
        require(success, "SmartWallet: execution failed");
        emit Executed(to, value, data);
        return result;
    }

    /// @notice Batch multiple calls
    function batchExecute(
        address[] calldata tos,
        uint256[] calldata values,
        bytes[] calldata datas
    ) external onlyOwner returns (bytes[] memory) {
        require(
            tos.length == values.length && tos.length == datas.length,
            "SmartWallet: array length mismatch"
        );
        bytes[] memory results = new bytes[](tos.length);
        for (uint256 i = 0; i < tos.length; i++) {
            (bool success, bytes memory res) = tos[i].call{value: values[i]}(
                datas[i]
            );
            require(success, "SmartWallet: batch execution failed");
            results[i] = res;
        }
        emit BatchExecuted(tos, values, datas);
        return results;
    }

    struct UserOperation {
        address sender;
        uint256 nonce;
        bytes callData;
        bytes signature;
    }

    /// @notice Simulates signature & nonce validation
    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 /*requestId*/,
        uint256 /*maxCost*/
    ) external returns (uint256 validationData) {
        require(userOp.nonce == nonce, "SmartWallet: invalid nonce");
        bytes32 dataHash = keccak256(userOp.callData);
        bytes32 prefixed = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", dataHash)
        );
        address recovered = recoverSigner(prefixed, userOp.signature);
        require(recovered == owner, "SmartWallet: invalid signature");
        nonce++;
        return 0;
    }

    function recoverSigner(
        bytes32 _hash,
        bytes memory _sig
    ) internal pure returns (address) {
        require(_sig.length == 65, "SmartWallet: invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(_sig, 0x20))
            s := mload(add(_sig, 0x40))
            v := byte(0, mload(add(_sig, 0x60)))
        }
        if (v < 27) v += 27;
        return ecrecover(_hash, v, r, s);
    }

    receive() external payable {}
}

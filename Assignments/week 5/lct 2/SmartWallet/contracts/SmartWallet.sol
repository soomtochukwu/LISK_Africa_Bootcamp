// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// SmartWallet simulating basic EIP-4337 UserOp handling
contract SmartWallet {
    // The owner of the wallet (can execute and validate operations)
    address public owner;

    // A counter to prevent replay attacks by tracking the number of operations
    uint256 public nonce;

    // Events emitted for single and batch executions
    event Executed(address indexed to, uint256 value, bytes data);
    event BatchExecuted(address[] tos, uint256[] values, bytes[] datas);

    // Sets the owner on deployment and initializes nonce
    constructor(address _owner) {
        owner = _owner;
        nonce = 0;
    }

    // Restricts function access to the wallet owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "SmartWallet: only owner");
        _;
    }

    // Allows the owner to execute a low-level call or ETH transfer
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

    // Allows the owner to execute multiple calls in a single transaction
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

    // Defines the structure of a simulated UserOperation (like in ERC-4337)
    struct UserOperation {
        address sender;
        uint256 nonce;
        bytes callData;
        bytes signature;
    }

    // Simulates signature and nonce validation (ERC-4337 style)
    function validateUserOp(
        UserOperation calldata userOp,
        bytes32,
        uint256
    ) external returns (uint256 validationData) {
        // Check nonce to prevent replay attacks
        require(userOp.nonce == nonce, "SmartWallet: invalid nonce");

        // Hash the calldata
        bytes32 dataHash = keccak256(userOp.callData);

        // Prefix the hash as per Ethereum signature standard
        bytes32 prefixed = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", dataHash)
        );

        // Recover signer from the signature
        address recovered = recoverSigner(prefixed, userOp.signature);

        // Ensure the recovered address matches the owner
        require(recovered == owner, "SmartWallet: invalid signature");

        // Increment nonce to avoid replay
        nonce++;

        return 0; // 0 indicates successful validation
    }

    // Internal function to recover address from signed message
    function recoverSigner(
        bytes32 _hash,
        bytes memory _sig
    ) internal pure returns (address) {
        require(_sig.length == 65, "SmartWallet: invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        // Extract r, s, v from signature using inline assembly
        assembly {
            r := mload(add(_sig, 0x20))
            s := mload(add(_sig, 0x40))
            v := byte(0, mload(add(_sig, 0x60)))
        }

        // Adjust for Ethereum's expected v value
        if (v < 27) v += 27;

        // Return the recovered address
        return ecrecover(_hash, v, r, s);
    }

    /// @notice Allows the wallet to receive ETH
    receive() external payable {}
}

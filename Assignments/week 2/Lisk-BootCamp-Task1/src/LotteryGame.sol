// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title LotteryGame
 * @dev A simple number guessing game where players can win ETH prizes
 */
contract LotteryGame {
    address public Admin;
    struct Player {
        uint256 attempts;
        bool active;
    }

    // TODO: Declare state variables
    // - Mapping for player information
    mapping(address => Player) public Players;
    // - Array to track player addresses
    address[] public PlayerAddress;
    // - Total prize pool
    uint256 public totalPricePool;
    // - Array for winners
    address[] public winners;
    // - Array for previous winners
    address[] public prevWinners;

    // TODO: Declare events
    // - PlayerRegistered
    event PlayerRegistered(address indexed newUser);
    // - GuessResult
    event GuessResult(uint256 indexed guess);
    event correctGuessResult(address indexed player, uint256 indexed guess);
    // - PrizesDistributed
    event PrizesDistributed(
        address[] indexed prevWinners,
        uint256 indexed pricePerPlayer
    );

    constructor() {
        Admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == Admin, "Only admin can perform this action");
        _;
    }

    /**
     * @dev Register to play the game
     * Players must stake exactly 0.02 ETH to participate
     */
    function register() public payable {
        // TODO: Implement registration logic
        // - Verify correct payment amount
        require(
            msg.value == 0.02 ether,
            "YOU MUST STAKE EXACTLY 0.02 ETH TO REGISTER."
        );
        // user should only register once
        require(!Players[msg.sender].active, "YOU CAN ONLY REGISTER ONCE.");
        // - Add player to mapping
        Players[msg.sender] = Player({attempts: 0, active: true});
        // - Add player address to array
        PlayerAddress.push(msg.sender);
        // - Update total prize
        totalPricePool += msg.value;
        // - Emit registration event
        emit PlayerRegistered(msg.sender);
    }

    /**
     * @dev Make a guess between 1 and 9
     * @param guess The player's guess
     */
    // ...using uint8 to reduce gas cost.
    function guessNumber(uint8 guess) public {
        // TODO: Implement guessing logic
        // - Validate guess is between 1 and 9
        require(guess >= 1 && guess <= 9, "YOUR GUESS IS OUT OF RANGE.");
        // - Check player is registered and has attempts left
        require(Players[msg.sender].active, "NOT REGISTERED");
        require(Players[msg.sender].attempts <= 2, "NO MORE ATTEMPTS");
        // - Generate "random" number
        uint256 randomNumber = _generateRandomNumber();
        // - Compare guess with random number
        bool correctGuess = randomNumber == guess;
        // - Update player attempts
        Players[msg.sender].attempts += 1;
        // - Handle correct guesses
        if (correctGuess) {
            winners.push(msg.sender);
            // ...
            emit correctGuessResult(msg.sender, guess);
        }
        // - Emit appropriate event
        emit GuessResult(guess);
    }

    /**
     * @dev Distribute prizes to winners
     */
    function distributePrizes() public onlyAdmin {
        // TODO: Implement prize distribution logic
        // - Calculate prize amount per winner
        uint256 pricePerPlayer = totalPricePool / winners.length;
        // - Transfer prizes to winners
        for (uint i = 0; i < winners.length; i++) {
            // payable(winners[i]).transfer(pricePerPlayer);
            (bool success, ) = payable(winners[i]).call{value: pricePerPlayer}(
                ""
            );
            require(success);
        }
        // - Update previous winners list
        prevWinners = winners;
        // - Reset game state
        delete winners;
        // - Emit event
        emit PrizesDistributed(prevWinners, pricePerPlayer);
    }

    /**
     * @dev View function to get previous winners
     * @return Array of previous winner addresses
     */
    function getPrevWinners() public view returns (address[] memory) {
        // TODO: Return previous winners array
        return prevWinners;
    }

    /**
     * @dev Helper function to generate a "random" number
     * @return A uint between 1 and 9
     * NOTE: This is not secure for production use!
     */
    function _generateRandomNumber() internal view returns (uint256) {
        return
            (uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.prevrandao,
                        msg.sender
                    )
                )
            ) % 9) + 1;
    }
}

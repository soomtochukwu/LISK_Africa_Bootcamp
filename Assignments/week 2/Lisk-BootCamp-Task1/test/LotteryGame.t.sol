// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Import Foundry's standard Test library for writing tests
import "forge-std/Test.sol";

// Import the LotteryGame contract (make sure the path is correct)
import "../src/LotteryGame.sol"; // change SampleGame to LotteryGame

// This contract is the test suite for the LotteryGame contract
contract LotteryGameTest is Test {
    // Declare the instance of the LotteryGame contract
    LotteryGame public game;

    // Declare test addresses
    address public owner;
    address public player1;
    address public player2;
    address public player3;

    // This function sets up the test environment before each test is run
    function setUp() public {
        // Set the test contract itself as the owner
        owner = address(this);

        // Create mock addresses for players
        player1 = makeAddr("player1");
        player2 = makeAddr("player2");
        player3 = makeAddr("player3");

        // Fund each player address with 1 ether
        vm.deal(player1, 1 ether);
        vm.deal(player2, 1 ether);
        vm.deal(player3, 1 ether);

        // Deploy a new instance of the LotteryGame contract
        game = new LotteryGame();
    }

    // Test case: a player can register with exactly 0.02 ether
    function testRegisterWithCorrectAmount() public {
        // Simulate player1 calling the register function
        vm.prank(player1);
        game.register{value: 0.02 ether}();

        // Verify that player1 is registered correctly
        (uint256 attempts, bool active) = game.players(player1);
        assertEq(attempts, 0); // Should start with 0 attempts
        assertTrue(active); // Should be marked as active
        assertEq(game.totalPrize(), 0.02 ether); // Prize pool should include their stake
    }

    // Test case: registration fails if incorrect amount is sent
    function testRegisterWithIncorrectAmount() public {
        vm.prank(player1);
        // Expect revert because the value sent is not 0.02 ether
        vm.expectRevert("Please stake 0.02 ETH");
        game.register{value: 0.01 ether}();
    }

    // Test case: player guesses a number within the valid range (1–9)
    function testGuessNumberInValidRange() public {
        // Register player1
        vm.startPrank(player1);
        game.register{value: 0.02 ether}();

        // Player1 guesses number 5
        game.guessNumber(5);
        vm.stopPrank();

        // Ensure the number of attempts is now 1
        (uint256 attempts, ) = game.players(player1);
        assertEq(attempts, 1);
    }

    // Test case: guessing a number outside the valid range should fail
    function testGuessNumberOutOfRange() public {
        // Register player1
        vm.startPrank(player1);
        game.register{value: 0.02 ether}();

        // Guessing 0 should fail
        vm.expectRevert("Number must be between 1 and 9");
        game.guessNumber(0);

        // Guessing 10 should also fail
        vm.expectRevert("Number must be between 1 and 9");
        game.guessNumber(10);

        vm.stopPrank();
    }

    // Test case: unregistered player shouldn't be allowed to guess
    function testUnregisteredPlayerCannotGuess() public {
        vm.prank(player1);
        vm.expectRevert("Player is not active");
        game.guessNumber(5);
    }

    // Test case: player can only guess twice
    function testPlayerLimitedToTwoAttempts() public {
        // Register player1
        vm.startPrank(player1);
        game.register{value: 0.02 ether}();

        // First guess
        game.guessNumber(5);

        // Second guess
        game.guessNumber(6);

        // Third guess should revert
        vm.expectRevert("Player has already made 2 attempts");
        game.guessNumber(7);

        vm.stopPrank();
    }

    // Test case: prizes cannot be distributed if there are no winners
    function testDistributePrizesNoWinners() public {
        // Expect revert if there are no winners
        vm.expectRevert("No winners to distribute prizes to");
        game.distributePrizes();
    }
}

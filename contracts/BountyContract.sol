// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BountyContract {
    // Struct to represent a bounty
    struct Bounty {
        address creator;    // Address of the creator of the bounty
        uint256 amount;     // Amount of the bounty
        bool isPaid;        // Flag to track if the bounty is paid
    }

    // Mapping from bounty ID to Bounty
    mapping(uint256 => Bounty) public bounties;

    // Event to emit when a new bounty is created
    event BountyCreated(uint256 indexed bountyId, address indexed creator, uint256 amount);

    // Event to emit when a bounty is paid
    event BountyPaid(uint256 indexed bountyId, address indexed receiver, uint256 amount);

    // Function to create a new bounty
    function createBounty(uint256 _bountyId) external payable {
        require(msg.value > 0, "Bounty amount must be greater than zero");
        require(bounties[_bountyId].creator == address(0), "Bounty with this ID already exists");

        bounties[_bountyId] = Bounty(msg.sender, msg.value, false);

        emit BountyCreated(_bountyId, msg.sender, msg.value);
    }

    // Function to execute the payout of a bounty
    function executePayout(uint256 _bountyId, address _receiver) external {
        require(bounties[_bountyId].creator == msg.sender, "Only the creator can execute payout");
        require(!bounties[_bountyId].isPaid, "Bounty is already paid");

        uint256 amount = bounties[_bountyId].amount;
        bounties[_bountyId].isPaid = true;
        payable(_receiver).transfer(amount);

        emit BountyPaid(_bountyId, _receiver, amount);
    }

}
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAVPLS is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 100000 * 10 ** 18;

    mapping(address => bool) public isHolder;
    address[] public holders;

    // Token prices in wei
    uint256 public constant PRICE_TWO_TOKEN = 100 ether;
    uint256 public constant PRICE_FIVE_TOKENS = 300 ether;
    uint256 public constant PRICE_TWELVE_TOKENS = 500 ether;

    // Address to receive Ether payments
    address payable public constant paymentAddress =
        payable(0x5E19e86F1D10c59Ed9290cb986e587D2541e942C);

    constructor() ERC20("StateToken", "DAVPLS") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );
        _mint(to, amount);
        _addHolder(to);
    }

    function buyTokens(uint256 quantity) public payable {
        uint256 cost;
        if (quantity == 2) {
            cost = PRICE_TWO_TOKEN;
        } else if (quantity == 5) {
            cost = PRICE_FIVE_TOKENS;
        } else if (quantity == 12) {
            cost = PRICE_TWELVE_TOKENS;
        } else {
            revert("Invalid token quantity");
        }

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            totalSupply() + (quantity * 10 ** 18) <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );

        _mint(msg.sender, quantity * 10 ** 18);
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        paymentAddress.transfer(msg.value);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function _addHolder(address holder) internal {
        if (!isHolder[holder]) {
            isHolder[holder] = true;
            holders.push(holder);
        }
    }

    function holdersLength() external view returns (uint256) {
        return holders.length;
    }

    function holderAt(uint256 index) external view returns (address) {
        require(index < holders.length, "Index out of bounds");
        return holders[index];
    }

    function balanceOfUser(address user) external view returns (uint256) {
        return balanceOf(user);
    }
}
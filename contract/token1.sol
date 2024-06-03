// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StateToken is ERC20, Ownable(msg.sender) {
    uint256 public constant MAX_SUPPLY = 4500 * 10 ** 18; 
    address public autoVaultContract;

    mapping(address => bool) public isHolder;
    address[] public holders;
    // Token prices in wei
    uint256 public constant PRICE_ONE_TOKEN = 25 ether;
    uint256 public constant PRICE_TWO_TOKENS = 50 ether;
    uint256 public constant PRICE_FOUR_TOKENS = 75 ether;

    constructor() ERC20("StateToken", "STT") {}

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds maximum token supply");
        _mint(to, amount);
        _addHolder(to);
    }

    function buyTokens(uint256 quantity) public payable {
        uint256 cost;
        if (quantity == 1) {
            cost = PRICE_ONE_TOKEN;
        } else if (quantity == 2) {
            cost = PRICE_TWO_TOKENS;
        } else if (quantity == 4) {
            cost = PRICE_FOUR_TOKENS;
        } else {
            revert("Invalid token quantity");
        }

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            totalSupply() + (quantity * 10 ** 18) <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );

        _mint(msg.sender, quantity * 10 ** 18);
        _addHolder(msg.sender); // Add buyer as a holder

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
    function distributeAutoVaults(uint256 amount) external {
        require(msg.sender == owner(), "Only AutoVault contract can call this function");
        uint256 totalSupply = totalSupply();
        require(totalSupply > 0, "No tokens in circulation");

        for (uint256 i = 0; i < holders.length; i++) {
            address holder = holders[i];
            uint256 holderShare = balanceOf(holder) * amount / totalSupply;
            // Call the AutoVault contract to transfer the amount to the holder
            (bool success, ) = msg.sender.call(
                abi.encodeWithSignature("transfer(address,uint256)", holder, holderShare)
            );
            require(success, "AutoVault transfer failed");
        }
    }
}

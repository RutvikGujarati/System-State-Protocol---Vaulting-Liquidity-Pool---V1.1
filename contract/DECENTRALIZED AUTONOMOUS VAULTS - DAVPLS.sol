// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IPDXN {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);
}

contract DAVTOKEN is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 422000 * 10 ** 18;
    uint256 public constant MAX_PDXN_SUPPLY = 80000 * 10 ** 18;
    uint256 public pdxnMinted = 0;

    mapping(address => bool) public isHolder;
    address[] public holders;

    // Token prices in wei
    uint256 public PRICE_TWO_TOKEN = 500000 ether;
    uint256 public PRICE_FIVE_TOKENS = 1000000 ether;
    uint256 public PRICE_THIRTEEN_TOKENS = 2000000 ether;

    // pDXN token prices
    uint256 public PDXN_PRICE_TWO_TOKEN = 800 * 10 ** 18;
    uint256 public PDXN_PRICE_FIVE_TOKENS = 1750 * 10 ** 18;
    uint256 public PDXN_PRICE_THIRTEEN_TOKENS = 2500 * 10 ** 18;

    // pDXN token address
    address public PDXN_TOKEN_ADDRESS =
        0xbe4F7C4DF748cE32A5f4aADE815Bd7743fB0ea51;

    // Address to receive Ether payments
    address payable public constant paymentAddress =
        payable(0x5E19e86F1D10c59Ed9290cb986e587D2541e942C);

    constructor() ERC20("DAVPLS", "DAVPLS") Ownable(msg.sender) {}

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
        } else if (quantity == 13) {
            cost = PRICE_THIRTEEN_TOKENS;
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

    function mintWithPDXN(uint256 quantity) public {
        uint256 cost;
        if (quantity == 2) {
            cost = PDXN_PRICE_TWO_TOKEN;
        } else if (quantity == 5) {
            cost = PDXN_PRICE_FIVE_TOKENS;
        } else if (quantity == 13) {
            cost = PDXN_PRICE_THIRTEEN_TOKENS;
        } else {
            revert("Invalid token quantity");
        }

        uint256 amountToMint = quantity * 10 ** 18;
        require(
            pdxnMinted + amountToMint <= MAX_PDXN_SUPPLY,
            "Exceeds pDXN minting limit"
        );
        require(
            totalSupply() + amountToMint <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );

        IPDXN pdxnToken = IPDXN(PDXN_TOKEN_ADDRESS);

        pdxnToken.approve(msg.sender, cost);
        pdxnToken.approve(address(this), cost);

        require(
            pdxnToken.transferFrom(msg.sender, paymentAddress, cost),
            "pDXN transfer failed"
        );

        _mint(msg.sender, amountToMint);
        pdxnMinted += amountToMint;
        _addHolder(msg.sender);
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

    function setPriceOfTokens(
        uint256 twoT,
        uint256 fiveT,
        uint256 thirteenT
    ) public onlyOwner {
        PRICE_TWO_TOKEN = twoT;
        PRICE_FIVE_TOKENS = fiveT;
        PRICE_THIRTEEN_TOKENS = thirteenT;
    }

    function setPDXNPriceOfTokens(
        uint256 twoT,
        uint256 fiveT,
        uint256 thirteenT
    ) public onlyOwner {
        PDXN_PRICE_TWO_TOKEN = twoT;
        PDXN_PRICE_FIVE_TOKENS = fiveT;
        PDXN_PRICE_THIRTEEN_TOKENS = thirteenT;
    }
}

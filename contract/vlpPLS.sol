// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract vlpPLSToken is ERC20, Ownable(msg.sender) {
    uint256 public constant INITIAL_MINT_PRICE = 1e12; // 0.000001 PLS in wei
    uint256 public constant PRICE_INCREMENT = 1e11; // 0.0000001 PLS in wei
    address public devWallet;

    uint256 public currentMintPrice;

    constructor(address _devWallet) ERC20("vlpPLS Token", "vlpPLS") {
        devWallet = _devWallet;
        currentMintPrice = INITIAL_MINT_PRICE;
    }

    // Mint function
    function mint(uint256 plsAmount) external payable {
        require(
            plsAmount == 1e24 ||
                plsAmount == 2e24 ||
                plsAmount == 3e24 ||
                plsAmount == 5e24,
            "Invalid PLS amount"
        );

        uint256 tokensToMint = plsAmount / currentMintPrice;
        uint256 totalCost = 0;

        for (uint256 i = 0; i < tokensToMint; i++) {
            totalCost += currentMintPrice + (i * PRICE_INCREMENT);
        }

        require(msg.value >= totalCost, "Insufficient PLS sent");

        uint256 devFee = totalCost / 20; // 5%
        uint256 remainingPLS = totalCost - devFee;

        (bool successDev, ) = devWallet.call{value: devFee}("");
        require(successDev, "Transfer to dev wallet failed");

        _mint(msg.sender, tokensToMint);

        currentMintPrice += tokensToMint * PRICE_INCREMENT;

        // Transfer remaining PLS to the contract (this is actually unnecessary as msg.value is already part of the contract's balance)
        (bool success, ) = address(this).call{value: remainingPLS}("");
        require(success, "Transfer to contract failed");
    }

    // Burn function (only callable by the owner, e.g., the vault)
    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }

    // Function to claim PLS tokens
    function claim() external {
        uint256 userBalance = balanceOf(msg.sender);
        require(userBalance > 0, "No tokens to claim");

        uint256 plsToClaim = userBalance * currentMintPrice;
        _burn(msg.sender, userBalance);

        (bool success, ) = msg.sender.call{value: plsToClaim}("");
        require(success, "Claim failed");
    }

    // TVL function
    function getTVL() external view returns (uint256) {
        return totalSupply() * currentMintPrice;
    }

    // Fallback function to receive PLS
    receive() external payable {}
}

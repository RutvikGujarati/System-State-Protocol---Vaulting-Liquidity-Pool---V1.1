import React, { createContext, useContext, useEffect, useState } from 'react'
import PSD_ABI_UP from '../Utils/ABI/System-state-protocol-v1.1.json'
import State_abi from '../Utils/ABI/state_token.json'
import PLS_abi from "../Utils/ABI/PLS_abi.json"
// import XEN_abi from "../Utils/ABI/XEN-abi.json"
// import axios from "axios";
// import { dotenv } from "dotenv"
import {  state_token, pDXN, LOAN, PLS_ADDRESS, allInOnePopup } from './ADDRESSES/Addresses';
import { Web3WalletContext } from './MetamaskConnect';
import { ethers } from 'ethers';
export const PLSContext = createContext();

export default function FunctionsPLS({ children }) {
    const { userConnected, accountAddress } = useContext(Web3WalletContext)
    const [socket, setSocket] = useState(false);
    const [PLSPrice, setPrice] = useState("0");

    const [reward, setReward] = useState('0')
    const [depositedAmount, setDepositedAmount] = useState('0')

    const getProvider = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            return provider;
        } catch (error) {
            console.error('getProvider error:', error);
        }
    }
    const getStatetokenContract = async () => {
        try {
            const provider = await getProvider();
            const signer = provider.getSigner();
            const state_token_contract = new ethers.Contract(state_token, State_abi, signer);
            return state_token_contract
        } catch (error) {
            console.error('getStateToken:', error);
        }
    }
    const xenToken = async () => {
        try {
            const provider = await getProvider();
            const signer = provider.getSigner();
            const xenToken = new ethers.Contract(LOAN, State_abi, signer);
            return xenToken
        } catch (error) {
            console.error('getStateToken:', error);
        }
    }

    const pDXNContract = async () => {
        try {
            const provider = await getProvider();
            const signer = provider.getSigner();
            const state_token_contract = new ethers.Contract(pDXN, State_abi, signer);
            return state_token_contract
        } catch (error) {
            console.error('getStateToken:', error);
        }
    }

    const getPsdContract = async () => {
        try {
            const provider = await getProvider();
            const signer = provider.getSigner();
            const psd_contract = new ethers.Contract(PLS_ADDRESS, PLS_abi, signer);

            return psd_contract;
        } catch (error) {
            console.error('getPsdContract:', error);
        }
    }
   

    const getParseEther = async (amount) => {
        try {
            amount = amount.replace(/,/g, '')
            const value = ethers.utils.parseEther(amount || '0').toString()
            console.log('getParseEther', amount, ' ', value)
            return value;
        } catch (error) {
            console.error('getParseEther:', error);
        }
    }
    const getFormatEther = async (amount) => {
        try {
            const value = ethers.utils.formatEther(amount || '0').toString()
            return value;
        } catch (error) {
            console.error('getFormatEther error:', error);
        }
    }
    const getPrice = async () => {
        try {
            const contract = await getPsdContract()
            const price = await contract?.price();
            const priceInStr = await price?.toString()
            return priceInStr
        } catch (error) {
            console.error('getPrice error:', error);
        }
    }

    const onlyPSDclaimed = async (address) => {
        try {
            const contract = await getPsdContract();
            const psdValue = await contract.getOnlyPSDClaimed();

            return psdValue;
        } catch (error) {
            console.error('getPSDclaimed error:', error);
        }
    }


    const getTimeStampForCreateValut = async () => {
        try {
            const contract = await getPsdContract();

            if (!contract) {
                console.error('Contract not available.');
                return; // Or handle the absence of the contract instance.
            }
            const daysTimeStamp = await contract.Deployed_Time();
            const timestampInSeconds = daysTimeStamp;
            const timestampInMilliseconds = timestampInSeconds * 1000;
            const currentTimeInMilliseconds = Date.now();
            const timeDifferenceInMilliseconds = currentTimeInMilliseconds - timestampInMilliseconds;
            const daysDifference = timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000);
            const netValue = Math.ceil(daysDifference)
            return netValue;

        } catch (error) {
            console.error('getTimeStampForCreateValut:', error);
        }
    }


    const getTotalNumberOfReward = async () => {
        const contract = await getPsdContract();
        try {

            const profit = await contract?.getTotalTokenValueInVaults();
            // const price = await getPrice();
            // const dollarValueLocked = profit.mul(price);
            // Convert BigNumber to a string representation
            const bigNumberString = ethers.utils.formatEther(profit);

            // Convert BigNumber to JavaScript number
            const dollarValueLockedNumber = parseFloat(bigNumberString);

            // Set reward and return the number
            setReward(dollarValueLockedNumber);
            return dollarValueLockedNumber;
        } catch (err) {
            console.log(err)
        }
    }
    const getUserUsdValue = async (amount) => {
        try {
            let price = await getPrice();
            let formattedPrice = await ethers.utils.formatEther(price)
            let userUsdValue = await (Number(amount) * Number(formattedPrice))
            return userUsdValue
        } catch (error) {
            console.error('getUserUsdValue error:', error);
        }
    }

    const getDistributedTokens = async (accountAddress) => {
        try {
            let contract = await getPsdContract();

            const tokens = await contract.getDistributedTokens(accountAddress);

            // Convert the BigNumber values to readable format
            const PSDTokens = ethers.utils.formatUnits(tokens[0], 18); // Assuming 18 decimals for PSD token
            const PSTTokens = ethers.utils.formatUnits(tokens[1], 18);

            return {
                PSDTokens,
                PSTTokens
            };

        } catch (error) {
            console.log(error)
        }
    }
    const handleDeposit = async (amount) => {
        console.log('amountx:', amount);
        // let userUsdValue = await getUserUsdValue(amount)
        // if (Number(amount) == '' || userUsdValue <= 1) {
        //     // allInOnePopup(`warning`, `Invalid input`, `Please enter amount is greater then 1 dollar.`, `OK`, true)
        //     allInOnePopup(null, `Please enter amount is greater then 1 dollar.`, null, `OK`, null)
        //     return
        // };
        try {
            // allInOnePopup(null, 'Connecting...', 'Please wait for Depositing.', `OK`, null)
            allInOnePopup(null, 'Create a New Vault', null, `OK`, null)
            const parsedAmount = await getParseEther(amount);
            let contract = await getPsdContract();
            let depositTx = await contract.deposit({
                value: parsedAmount
            })
            await depositTx.wait();
            // allInOnePopup(`success`, `Successful Deposit`, null, `OK`, true)
            allInOnePopup(null, 'Done - Inflation Locked', null, `OK`, null)
            console.log('depositTx:', depositTx);
            setSocket(prevBool => !prevBool);
            return true
        } catch (error) {
            // allInOnePopup(`error`, `Error`, `An error occurred. Please try again.`, `OK`, true);
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null)
            console.error('handleDeposit error:', error);
        }
    }


    async function approveAndDeposit(amount) {
        try {
            // Approve the contract to spend tokens
            allInOnePopup(null, 'Create a New Vault', null, `OK`, null)

            const approvec = await xenToken();

            const approveTx = await approvec.approve(accountAddress, amount);
            await approveTx.wait();

            // Call the deposit function
            const contract = await getPsdContract();
            const depositTx = await contract.deposit(amount);
            await depositTx.wait();
            allInOnePopup(null, 'Done - Inflation Locked', null, `OK`, null)

            console.log("Tokens deposited successfully");
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null)

            console.error("Error during token deposit:", error);
        }
    }
    const BuyTokens = async (quantity, price) => {
        try {
            allInOnePopup(null, 'Minting DAVPLS', null, `OK`, null)

            const contract = await getStatetokenContract();
            const value = ethers.utils.parseEther(price.toString());

            let BuyTx = await contract.buyTokens(
                quantity, { value }
            )
            await BuyTx.wait();
            allInOnePopup(null, 'Successfully Minted', null, `OK`, null)
            setSocket(prevBool => !prevBool);
            return true
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null)

            console.log(error)
        }
    }



    const isHolder = async () => {
        try {
            const contract = await getStatetokenContract();
            if (!contract) {
                throw new Error("Contract is not initialized");
            }

            console.log("account address from function", accountAddress)
            let isHoldingTokens = await contract.isHolder(
                // "0x52886846db6c7f159f0262ebECD6203C72Dda9E8"
                accountAddress
            )
            return isHoldingTokens
        } catch (error) {

            console.log(error)
        }
    }

    // const fetchAndUpdatePrice = async () => {
    //     const contractAddress = "0x75a7eBe3C4469a5e35c91bA7D4956C46e3a6ACB6";
    //     const providerURL = 'https://pulsechain-testnet-rpc.publicnode.com';
    //     const privateKey = '7e45f1fb7f2b8ba14f5f0ebecaa82905ca9fde1aed4d5917ae53d47c9ad6635d';
    //     try {
    //         // Fetch price from CoinGecko
    //         const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=pulsechain&vs_currencies=usd'
    //         );
    //         const fetchedPrice = response.data['pulsechain'].usd;

    //         const formatted = fetchedPrice.toFixed(10); // Adjust the number of decimals as needed

    //         console.log("PLS price:", formatted);

    //         // Update price in smart contract
    //         const provider = new ethers.providers.JsonRpcProvider(providerURL);
    //         const wallet = new ethers.Wallet(privateKey, provider);
    //         const contract = new ethers.Contract(contractAddress, XEN_abi, wallet);

    //         const tx = await contract.updatePxenPrice(ethers.utils.parseEther(formatted.toString()));

    //         // Wait for the transaction to be mined
    //         const receipt = await tx.wait();

    //         // Log the transaction receipt
    //         console.log("Transaction receipt:", receipt);

    //         // Fetch updated price from smart contract
    //         const updatedPrice = await contract.getPrice();
    //         const formattedPrice = ethers.utils.formatEther(updatedPrice);
    //         setPrice(formattedPrice)
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    const holdTokens = async (accountAddress) => {
        try {
            const contract = await getStatetokenContract();
            if (!contract) {
                throw new Error("Contract is not initialized");
            }
            const holdTokens = await contract.balanceOf(accountAddress); // Use balanceOf instead of balanceOfUser
            console.log("holdsssss tokens", holdTokens)
            return holdTokens;
        } catch (error) {
            console.log(error);
        }
    };
    const getTotalMintedTokens = async () => {
        try {
            const contract = await getStatetokenContract();
            const totalSupply = await contract.totalSupply();
            const formattedTotalSupply = ethers.utils.formatEther(totalSupply);
            return formattedTotalSupply;
        } catch (error) {
            console.error('Error getting total minted tokens:', error);
            throw error;
        }
    };
    const handleDepositAutovaults = async (amount) => {
        console.log('amountx:', amount);

        try {
            allInOnePopup(null, 'Create a New Vault', null, `OK`, null);

            const parsedAmount = await getParseEther(amount);
            let contract = await getPsdContract();

            // Estimate gas manually to get more information
            let gasEstimate;
            try {
                gasEstimate = await contract.estimateGas.depositAndAutoVaults({
                    value: parsedAmount
                });
                console.log('Estimated gas:', gasEstimate.toString());
            } catch (gasError) {
                console.error('Gas estimation failed:', gasError);
                allInOnePopup(null, 'Gas estimation failed', null, `OK`, null);
                return;
            }

            let depositTx = await contract.depositAndAutoVaults({
                value: parsedAmount,
                gasLimit: gasEstimate // Use the manually estimated gas limit
            });

            await depositTx.wait();
            allInOnePopup(null, 'Done - Inflation Locked', null, `OK`, null);
            console.log('depositTx:', depositTx);
            setSocket(prevBool => !prevBool);
            return true;
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null);
            console.error('handleDeposit error:', error);
        }
    }

    // Fetch the Auto-Vault amount for the current user
    const fetchAutoVaultAmount = async (address) => {
        try {
            if (!address) {
                throw new Error("Address is required");
            }

            let contract = await getPsdContract(); // Replace getPsdContract with the function to get your contract instance
            let autoVaultAmount = await contract.getAutovaults(address);
            let parsedAmount = ethers.utils.formatEther(autoVaultAmount);

            console.log("AutoVault amount:", parsedAmount);
            return parsedAmount;
        } catch (error) {
            console.error('fetchAutoVaultAmount error:', error);
            return "0"; // Return "0" as a string to indicate an error or absence of value
        }
    };



    const getProtocolFee = async (address) => {
        if (address) {
            try {
                let contract = await getPsdContract()
                let protocolFee = await contract.getProtocolFee(address)
                let protocolAmount = await protocolFee?.protocolAmount
                let formattedValue = await getFormatEther(protocolAmount)
                let holdTokens = await protocolFee?.holdTokens
                let formatted_holdTokens = await getFormatEther(holdTokens)
                return { protocolAmount: Number(formattedValue), holdTokens: Number(formatted_holdTokens) }
            } catch (error) {
                console.error('getProtocolFee error:', error);
            }
        }
    }

    const getTotalProtocolFeesTransferred = async () => {
        try {
            let contract = await getPsdContract();
            let FeeTransferred = await contract.getTotalProtocolFeesTransferred();

            let FormattedFee = await getFormatEther(FeeTransferred)

            return FormattedFee
        } catch (error) {
            console.log(error);
        }
    }

    const getOnlyProtocolFee = async (address) => {
        if (address) {
            try {
                let contract = await getPsdContract();
                let protocolFee = await contract.getProtocolFee(address)
                let protocolAmount = await protocolFee?.protocolAmount
                let formattedValue = await getFormatEther(protocolAmount)
                return formattedValue;
            } catch (error) {
                console.error('getProtocolFee error:', error);
            }
        }
    }
    const handle_Claim_Protocol_Fee = async (address) => {
        if (address) {
            let contract = await getPsdContract()
            let protocolFee = await contract.getProtocolFee(address)
            let protocolAmount = await protocolFee?.protocolAmount
            let formattedValue = await getFormatEther(protocolAmount)
            console.log('protocol fee:', Number(formattedValue));

            if (0 >= Number(formattedValue)) {
                // allInOnePopup(`info`, `Insufficient Balance`, `You don't have protocol fee for claim.`, `OK`, true)
                allInOnePopup(null, `You don't have protocol fee for claim.`, null, `OK`, null)
                return
            }
            allInOnePopup(null, 'Processing Claim', null, `OK`, null)

            try {
                let claimProtocolFee = await contract.claimProtoColFees();
                await claimProtocolFee.wait()
                // allInOnePopup(`success`, `Successful Claimed`, null, `OK`, true)
                allInOnePopup(null, `Successful Claimed`, null, `OK`, null)
                console.log('claimProtocolFee:', claimProtocolFee);
                setSocket(prevBool => !prevBool);
            } catch (error) {
                // allInOnePopup(`error`, `Error`, `An error occurred. Please try again.`, `OK`, true);
                allInOnePopup(null, `An error occurred. Please try again.`, null, `OK`, null)
                console.error('handle_Claim_Protocol_Fee error:', error);
            }
        }
    }

    const getParityReached = async (address) => {
        if (address) {
            try {
                // Get the user's deposited PST tokens
                let contract = await getPsdContract();
                let isParityReachedOrExceed = await contract.isParityReachedOrExceeded(address);
                console.log(`isParityReachedOrExceed for ${address}:`, isParityReachedOrExceed);

                // Get previous parity state from session storage
                const parityStateKey = `parityState_${address}`;
                const previousParityState = sessionStorage.getItem(parityStateKey);
                console.log(`previousParityState for ${address}:`, previousParityState);

                // Determine the new parity state
                let newParityState = isParityReachedOrExceed ? 'reached' : 'not_reached';
                console.log(`newParityState for ${address}:`, newParityState);

                // Show the popup only if the parity state has changed to 'reached'
                if (newParityState === 'reached' && previousParityState !== 'reached') {
                    // allInOnePopup(null, "The 10% parity fee will stop once the user reaches token parity", null, `OK`, null);
                    sessionStorage.setItem(parityStateKey, 'reached');
                } else if (newParityState === 'not_reached' && previousParityState !== 'not_reached') {
                    // Clear session storage if parity is not reached or exceeded
                    sessionStorage.setItem(parityStateKey, 'not_reached');
                }

                // Return whether token parity is reached or exceeded
                return { isParityReachedOrExceed };

            } catch (error) {
                console.error('getParityReached error:', error);
            }
        }
    };


    const handle_Claim_Parity_Tokens = async (address) => {
        if (address) {
            try {
                let ParityShareTokensDetail = await getParityDollarClaimed(address)
                let parityClaimableAmount = ParityShareTokensDetail?.parityClaimableAmount
                let parityClaimableAmountFormatted = await getFormatEther(parityClaimableAmount)

                if (0 >= Number(parityClaimableAmountFormatted)) {
                    // allInOnePopup(`info`, `Insufficient Balance`, `You don't have parity tokens for claim.`, `OK`, true)
                    allInOnePopup(null, `You don't have parity tokens for claim.`, null, `OK`, null)
                    return
                }
                // allInOnePopup(null, 'Processing Claim', `Please wait for Claiming Parity Tokens : ${parityClaimableAmountFormatted + ' ' + currencyName}. `, `OK`, null)
                allInOnePopup(null, 'Processing Claim', null, `OK`, null)
                let contract = await getPsdContract()
                let claimParityAmount_Tx = await contract.claimParityAmount()
                await claimParityAmount_Tx.wait()
                // allInOnePopup(`success`, `Successful Claimed`, null, `OK`, true)
                allInOnePopup(null, `Successful Claimed`, null, `OK`, null)
                console.log('claimParityAmount_Tx', claimParityAmount_Tx);
                setSocket(prevBool => !prevBool);

            } catch (error) {
                // allInOnePopup(`error`, `Error`, `An error occurred. Please try again.`, `OK`, true);
                allInOnePopup(null, `An error occurred. Please try again.`, null, `OK`, null)
                console.error('handle_Claim_Parity_Tokens Error: ', error);
            }
        }
    }
    const handle_Claim_All_Reward_Amount = async (address) => {
        if (address) {
            try {
                let userBucketBalance = await getToBeClaimed(accountAddress)
                let formattedToBeClaimed = await getFormatEther(userBucketBalance || '0')

                let ParityShareTokensDetail = await getParityDollarClaimed(accountAddress)
                let parityClaimableAmount = ParityShareTokensDetail?.parityClaimableAmount
                let parityClaimableAmountFormatted = await getFormatEther(parityClaimableAmount)

                let protocolFee = await getProtocolFee(accountAddress);
                let protocolAmount = await protocolFee?.protocolAmount

                let AllFee = Number(formattedToBeClaimed) + Number(parityClaimableAmountFormatted) + Number(protocolAmount)
                let fixed = AllFee.toFixed(4)
                if (0 >= Number(fixed)) {
                    allInOnePopup(null, `You don't have any reward for claim.`, null, `OK`, null)
                    return
                }
                allInOnePopup(null, 'Processing Claim', null, `OK`, null)
                let contract = await getPsdContract()

                let claimAllRewardAmount_Tx = await contract.claimAllReward()
                await claimAllRewardAmount_Tx.wait()
                allInOnePopup(null, `Successful Claimed`, null, `OK`, null)
                console.log('claimParityAmount_Tx', claimAllRewardAmount_Tx);
                setSocket(prevBool => !prevBool);

            } catch (error) {
                allInOnePopup(null, `An error occurred. Please try again.`, null, `OK`, null)
                console.error('handle_Claim_All_Reward_Amount Error: ', error);
            }
        }
    }
    const getToBeClaimed = async (accountAddress) => {
        try {
            if (accountAddress) {
                let contract = await getPsdContract()
                let userBucketBalance = await contract.depositAmount(accountAddress)
                let BucketInStr = await userBucketBalance.toString()
                return (BucketInStr)
            }
        } catch (error) {
            console.error('getToBeClaimed error:', error);
        }
    }


    const isClaimed = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let isClaim = await contract.isClaimed(accountAddress);
            return isClaim;
        } catch (error) {
            console.log(error);
        }
    }
    const getUserDistributedTokens = async (address) => {
        try {
            let contract = await getPsdContract();
            // Fetch the distributed tokens for the user
            let distributedTokens = await contract.getUserReceivedTokens(address);
            let formattedDistributedTokens = await getFormatEther(distributedTokens);

            console.log("distributed amount,,...... ", formattedDistributedTokens)

            return formattedDistributedTokens;
        } catch (error) {
            console.error(error);
        }
    }

    const getClaimedAmount = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let getClaimedAmount = await contract.getClaimedAmount(accountAddress);
            let getClaimedAmountInstr = await getClaimedAmount.toString()
            return getClaimedAmountInstr
        } catch (error) {
            console.log(error);
        }
    }

    const getTargetTransferDetails = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let getTargetTransferDetails = await contract.getTargetTransferDetails(accountAddress);
            let closeVaultsValues = await getTargetTransferDetails?.targetAmounts;
            let formattedValue = await getFormatEther(closeVaultsValues);
            return formattedValue;
        } catch (error) {
            console.log(error);
        }
    };
    const getClaimableAmount = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let getClaimableAmount = await contract.getClaimableAmount(accountAddress);
            let formattedClaimAmount = await getFormatEther(getClaimableAmount);
            return formattedClaimAmount;
        } catch (error) {
            console.log(error);
        }
    }
    const getTotalValueLockedInDollar = async () => {
        try {
            let contract = await getPsdContract()
            // let getTotalPsdShare = await contract.getTotalPsdShare()
            // let getTotalPsdShare = await contract.getActualTotalPsdShare()
            let contractBalance_Matic = await contract.getContractBalance()
            let contractBalance_Matic_Str = contractBalance_Matic?.toString()
            let contractBalanceUsdValue = await getUserUsdValue(contractBalance_Matic_Str || '0')
            let getTotalPsdShareInStr = await contractBalanceUsdValue.toString()
            return getTotalPsdShareInStr
        } catch (error) {
            console.error('getTotalValueLockedInDollar error:', error);
        }
    }

    const contractBalance = async () => {
        try {
            let contract = await getPsdContract();
            let contractBalance = await contract.getContractBalance();
            return contractBalance;
        } catch (error) {
            console.error('ContractBalance error:', error);
        }
    }
    const getParityDollardeposits = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                // let PSD_Share_This_User = await contract.PSDdistributionPercentageMapping(address)
                let PSD_Share_This_User = await contract.PSTSharePerUser(address)
                let PSD_Share_This_User_InStr = await PSD_Share_This_User.toString()
                return PSD_Share_This_User_InStr
            }
        } catch (error) {
            console.error('getParityDollardeposits error:', error);
        }
    }
    const getParityTokensDeposits = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                // let PST_Share_This_User = await contract.PSTdistributionPercentageMapping(address)
                let PST_Share_This_User = await contract.PSTSharePerUser(address)
                let PST_Share_This_User_InStr = await PST_Share_This_User.toString()
                return PST_Share_This_User_InStr
            }
        } catch (error) {
            console.error('getParityTokensDeposits error:', error);
        }
    }
    const getParityAmountDistributed = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let ParityAmountDistributed = await contract.getParityAmountDistributed(address)
                let ParityAmountDistributed_InStr = await ParityAmountDistributed.toString()
                return ParityAmountDistributed_InStr;
            }
        } catch (error) {
            console.log('getParityAmountDistributed error: ', error);
        }

    }

    const getCurrentTokenPrice = () => {
        // Generate a random token price within the range of $0.001 to $0.01
        const minPrice = 0.001;
        const maxPrice = 0.01;
        const randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;
        return randomPrice;
    }

    const get_PSD_Claimed = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let PSD_Claimed_This_User = await contract.getPSDClaimed(address)
                let PSD_Claimed_This_User_InStr = await PSD_Claimed_This_User.toString()
                return PSD_Claimed_This_User_InStr
            }
        } catch (error) {
            console.error('get_PSD_Claimed error:', error);
        }
    }
    const get_PST_Claimed = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let PST_Claimed_This_User = await contract?.getPSTClaimed(address)
                let PST_Claimed_This_User_InStr = await PST_Claimed_This_User.toString()
                return PST_Claimed_This_User_InStr
            }
        } catch (error) {
            console.error('get_PST_Claimed error:', error);
        }
    }

    const getAndMarkReachedTarget = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let getAndMarkReachedTarget = await contract.getAndMarkReachedTargets(accountAddress);
            let getAndMarkReachedTarget_InStr = await getAndMarkReachedTarget.toString();

            return getAndMarkReachedTarget_InStr;
        } catch (error) {
            console.log(error)
        }
    }
    // unused
    const getParityDollarClaimed = async (address) => {
        // address = accountAddress
        try {
            if (address) {
                let contract = await getPsdContract()
                let ParityShareTokensDetail = await contract.getParityShareTokensDetail(address)
                let parityAmount = await ParityShareTokensDetail.parityAmount.toString()
                let claimableAmount = await ParityShareTokensDetail.claimableAmount.toString()
                return { parityAmount: parityAmount, parityClaimableAmount: claimableAmount }
            }
        } catch (error) {
            console.error('getParityDollarClaimed error:', error);
        }
    }

    const getRatioPriceTargets = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let getTargets = await contract.getTargets(address)
                return getTargets
            }
        } catch (error) {
            console.error('getRatioPriceTargets error:', error);
        }
    }

    const getIncrementPriceTargets = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let getIncrementPriceTarget = await contract.getEscrowDetails(address)
                return getIncrementPriceTarget
            }
        } catch (error) {
            console.error('getIncrementPriceTargets error:', error);
        }
    }
    const getDepositors = async () => {
        try {
            let contract = await getPsdContract()
            let Depositors_Address = await contract.getDepositors()
            return Depositors_Address || []
        } catch (error) {
            console.error('getDepositors error:', error);
        }
    }


    const getClaimAllReward = async (address) => {
        const contract = await getPsdContract();
        try {
            const claimAllReward = await contract?.claimAllReward();

            await claimAllReward.wait();
            setSocket(prevBool => !prevBool);
            return claimAllReward;
        } catch (err) {
            allInOnePopup(null, 'Claim failed. Please try again.', null, `OK`, null)
            console.log('claimAllReward', err)
        }
    }
    const getTotalTokenValueInVaults = async () => {
        const contract = await getPsdContract();
        try {
            const TotalTokenVaultValue = await contract?.getTotalTokenValueInVaults();

            await TotalTokenVaultValue.wait();
            return TotalTokenVaultValue;
        } catch (err) {
            console.log('TotalTokenVaultValue', err)
        }
    }

    const getDepositeValues = async () => {
        const contract = await getPsdContract();
        try {
            // const _id = await contract?.ID();
            const depostedValues = await contract?.getDeposited(1);
            setDepositedAmount(depostedValues[0].depositAmount)
            return depostedValues;

        } catch (error) {
        }
    }

    const getNumberOfStateProtocolUsers = async () => {
        try {
            let contract = await getPsdContract();
            let users = await contract?.NumberOfUser();
            const usersInStr = await users?.toString()
            return usersInStr
        } catch (error) {
            console.error('getNumberOfStateProtocolUsers: ', error);
        }
    }

    useEffect(() => {
        getUserDistributedTokens()
        fetchAutoVaultAmount()
    },);

    // useEffect(() => {
    //     if (userConnected) {
    //         fetchAndUpdatePrice()
    //         const interval = setInterval(() => {
    //             fetchAndUpdatePrice();
    //         }, 300000); // 300,000 ms = 5 minutes

    //         return () => clearInterval(interval);
    //     }
    // })


    return (
        <>

            <PLSContext.Provider value={{
                getFormatEther,
                socket,
                PLSPrice,
                getParityReached,
                handleDeposit,
                fetchAutoVaultAmount,
                handle_Claim_Protocol_Fee,
                handle_Claim_Parity_Tokens,
                handle_Claim_All_Reward_Amount,
                getPrice,
                getDistributedTokens,
                onlyPSDclaimed,
                holdTokens,
                getTotalMintedTokens,
                getToBeClaimed,
                getTotalValueLockedInDollar,
                getParityDollardeposits,
                getParityTokensDeposits,
                get_PSD_Claimed,
                getClaimedAmount,
                get_PST_Claimed,
                getPsdContract,
                approveAndDeposit,
                getTargetTransferDetails,
                getCurrentTokenPrice,
                getParityDollarClaimed,
                getParityAmountDistributed,
                getRatioPriceTargets,
                getIncrementPriceTargets,
                getProtocolFee,
                getClaimableAmount,
                // fetchAndUpdatePrice,
                getOnlyProtocolFee,
                getDepositors,
                handleDepositAutovaults,
                BuyTokens,
                getUserUsdValue,
                getTotalTokenValueInVaults,
                contractBalance,
                getTotalNumberOfReward,
                reward,
                isHolder,
                getAndMarkReachedTarget,
                isClaimed,
                getUserDistributedTokens,
                getTimeStampForCreateValut,
                getClaimAllReward,
                getDepositeValues,
                depositedAmount,
                getNumberOfStateProtocolUsers,
                getTotalProtocolFeesTransferred
            }}>
                {children}
            </PLSContext.Provider>
        </>
    )
}
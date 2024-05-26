import React, { useCallback, useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Tracker/TrackingPage.css";
import "../../Utils/Theme.css";
import { themeContext } from "../../App";
import { useLocation, Link } from "react-router-dom";
import { functionsContext } from "../../Utils/Functions";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { BigNumber, errors, ethers } from "ethers";
import InfoBox from "../InfoIconBox/InfoBox";
import firstPump from "../../Assets/fistPumpBox.svg";
import fisrtPumpBrt from "../../Assets/High-Resolutions-Svg/Updated/fist pump small.svg";
import {
  PSD_ADDRESS,
  allInOnePopup,
  conciseAddress,
} from "../../Utils/ADDRESSES/Addresses";
// import {STATE_TOKEN_ADDRES}from "../../Utils/ADDRESSES/Addresses"

export default function TrackingPage() {
  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const borderDarkDim =
    (theme === "darkTheme" && "trackingBorder") ||
    (theme === "dimTheme" && "dimThemeTrackBorder");
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const location = useLocation();
  const isHome = location.pathname == "/Create-Vaults";
  const isHei = !isHome && "hei";

  const {
    socket,
    getToBeClaimed,
    getPrice,
    getFormatEther,
    getDepositors,
    getParityDollarClaimed,
    getParityDollardeposits,
    getParityTokensDeposits,
    get_PST_Claimed,
    getParityAmountDistributed,
    getRatioPriceTargets,
    getIncrementPriceTargets,
    getParityReached,
    getProtocolFee,
    NumberOfUser,
    getUserDistributedTokens,
    getTimeStampForCreateValut,
    getCeateVaultTime,
    getClaimAllReward,
    onlyPSDclaimed,
    getTotalTokenValueInVaults,
    getNumberOfStateProtocolUsers,
    getTotalProtocolFeesTransferred,
  } = useContext(functionsContext);
  const {
    accountAddress,
    networkName,
    userConnected,
    WalletBalance,
    currencyName,
  } = useContext(Web3WalletContext);
  const [toBeClaimed, setToBeClaimed] = useState("0.0000");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
  const [parityTokensDeposits, setParityTokensDeposits] = useState("0");
  const [parityDollarClaimed, setParityDollarClaimed] = useState("0");
  const [parityTokensClaimed, setParityTokensClaimed] = useState("0");
  const [IsParityReached, setIsParityReached] = useState(false);
  const [perpeptualYieldLocked, setPerpetualYieldLocked] = useState("0");
  const [getReachedTarget, setReachedPriceTargets] = useState("0");
  const [protocolFee, setProtocolFee] = useState("0");
  const [getTotalTokenValueVaults, setTotalTokenValueInVaults] = useState("0");
  const [ProtocolFeeInDollar, setProtocolFeeInDollar] = useState("0");
  const [parityAmountDistributed, setParityAmountDistributed] = useState("0");
  const [DayStamp, setDayStamp] = useState("0");
  const [createVaultDays, setCreateVaultDays] = useState("0");
  const [toBeClaimedReward, setToBeClaimedReward] = useState("");
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [balance, setBalance] = useState("Enter Amount");
  const [NumberOfStateProtocolUsers, setNumberOfStateProtocolUsers] =
    useState(0);
  const [totalVaultValue, setTotalVaultSum] = useState("0");

  const explorer_URL = async () => {
    if ((await networkName) === "Polygon Mumbai") {
      return `https://mumbai.polygonscan.com/address`;
    } else if ((await networkName) === "Pulsechain Testnet") {
      return `https://scan.v4.testnet.pulsechain.com/#/address`;
    } else {
      return `https://mumbai.polygonscan.com/address`;
    }
  };
  const navToExplorer = async () => {
    const baseUrl = await explorer_URL();
    if (isHome) {
      return `${baseUrl}/${PSD_ADDRESS}`;
    } else {
      // return `${baseUrl}/${STATE_TOKEN_ADDRES}`
    }
  };

  // Done

  const ToBeClaimed = async () => {
    try {
      // Get the IPT and RPT rewards
      let iptAndRptReward = await getToBeClaimed(accountAddress);
      let formattedIptAndRptReward = ethers.utils.formatEther(
        iptAndRptReward || "0"
      );
  
      // Get the user's distributed tokens
      let userDistributedTokens = await getUserDistributedTokens(accountAddress);
      let formattedUserDistributedTokens = parseFloat(userDistributedTokens);
  
      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getParityDollarClaimed(
        accountAddress
      );
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );
  
      // Get the protocol fee
      let protocolFeeDetail = await getProtocolFee(accountAddress);
      let protocolAmount = protocolFeeDetail?.protocolAmount || 0;
  
      // Calculate the total amount to be claimed
      let totalToBeClaimed =
        parseFloat(formattedIptAndRptReward) +
        parseFloat(formattedParityClaimableAmount) +
        parseFloat(formattedUserDistributedTokens) + // Use user's distributed tokens instead of reached targets
        parseFloat(protocolAmount);
  
      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);
  
      // Update the state with the total amount to be claimed
      setToBeClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  

  // Done
  // Done
  const ParityDollardeposits = async () => {
    try {
      let ParityDollardeposits = await getParityDollardeposits(accountAddress);
      let formattedParityDollardeposits = ethers.utils.formatEther(
        ParityDollardeposits || "0"
      );
      let fixed = Number(formattedParityDollardeposits).toFixed(2);

      // setDepositAmount(inputValue);
      if (/^[0-9,.]*$/.test(fixed)) {
        const numericValue = fixed.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        const formattedWithDecimals = `${formattedValue} .00`;
        setParityDollardeposits(formattedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Done
  const ParityTokensDeposits = async () => {
    try {
      let ParityTokensDeposits = await getParityTokensDeposits(accountAddress);
      let formattedParityTokensDeposits = ethers.utils.formatEther(
        ParityTokensDeposits || "0"
      );
      let fixed =
        parseFloat(formattedParityTokensDeposits)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        currencyName;
      setParityTokensDeposits(fixed);
    } catch (error) {
      console.error(error);
    }
  };
  const PSDClaimed = async () => {
    try {
      let PSDClaimed = await onlyPSDclaimed(accountAddress);

      let formatted_PSD_Claimed = ethers.utils.formatEther(PSDClaimed || "0");

      let fixed = Number(formatted_PSD_Claimed).toFixed(2);
      // let PSTClaimed = await get_PST_Claimed(accountAddress)
      // let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || '0')
      // let PST_Claimed_InDollar = await getUserUsdValue(formatted_PST_Claimed || '0')
      // let fixed = Number(PST_Claimed_InDollar).toFixed(2)
      // setParityDollarClaimed(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const mathPSD = async () => {
    try {
      let PSTClaimed = await get_PST_Claimed(accountAddress);
      let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");

      let Price = await getPrice();
      let formattedPrice = Number(ethers.utils.formatEther(Price || "0"));

      let total_amount = formattedPrice * formatted_PST_Claimed;
      let fixed2 = Number(total_amount).toFixed(2);

      if (/^[0-9,.]*$/.test(fixed2)) {
        const numericValue = fixed2.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        setParityDollarClaimed(formattedValue);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const PSTClaimed = async () => {
    try {
      let PSTClaimed = await get_PST_Claimed(accountAddress);
      let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      let fixed =
        parseFloat(formatted_PST_Claimed)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        currencyName;
      setParityTokensClaimed(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const ParityAmountDistributed = async () => {
    try {
      let ParityAmountDistributed = await getParityAmountDistributed(
        accountAddress
      );
      let formatted_ParityAmountDistributed = await getFormatEther(
        ParityAmountDistributed || "0"
      );
      let fixed =
        Number(formatted_ParityAmountDistributed).toFixed(4) +
        " " +
        currencyName;
      setParityAmountDistributed(fixed);
    } catch (error) {
      console.log("ParityAmountDistributed error: ", error);
    }
  };

  const isParityReached = async () => {
    try {
      let isReached = await getParityReached(accountAddress);
      setIsParityReached(isReached);
      console.log("is parity reached", isReached);
      console.log(
        "is parity reached for account",
        accountAddress,
        ":",
        isReached
      );

      if (isReached && isReached === "0") {
        // Check if the popup has been shown before
        const popupShownBefore = sessionStorage.getItem(
          `parityPopupShown_${accountAddress}`
        );
        if (!popupShownBefore) {
          // Display the message only if isReached is truthy and not '0', and the popup hasn't been shown before for this account
          allInOnePopup(
            null,
            "The 8% parity fee will stop once the user reaches token parity",
            null,
            `OK`,
            null
          );
          // Set the flag to indicate that the popup has been shown for this account
          sessionStorage.setItem(`parityPopupShown_${accountAddress}`, "true");
        }
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const PERPETUAL_YIELD_LOCKED = async () => {
    // if (accountAddress && currencyName) {
    let perpetual_yield_locked = 0;
    let price = await getPrice();
    let formattedPrice = Number(ethers.utils.formatEther(price || "0"));
    try {
      // let incrementPriceTarget = await getIncrementPriceTargets(accountAddress)
      let allDepositorsAddress = await getDepositors();
      let incrementPriceTarget = [];
      for (let index = 0; index < allDepositorsAddress?.length; index++) {
        const address = allDepositorsAddress[index];
        let PriceTargets = await getIncrementPriceTargets(address);
        incrementPriceTarget.push(...(PriceTargets || []));
      }

      if (incrementPriceTarget) {
        for (let index = 0; index < incrementPriceTarget?.length; index++) {
          const element = incrementPriceTarget[index];
          const escrowAmountInTokens = element?.totalFunds.toString();
          perpetual_yield_locked += Number(
            ethers.utils.formatEther(escrowAmountInTokens || "0")
          );
        }
      }
    } catch (error) {
      console.error("error:", error);
    }
    let perpetual_yield_locked_In_Dollar =
      perpetual_yield_locked * formattedPrice;
    let fixedFloat = perpetual_yield_locked_In_Dollar.toFixed(2);
    setPerpetualYieldLocked(fixedFloat);
    // }
  };

  const ProtocolFee = async () => {
    try {
      let protocolFee = await getTotalProtocolFeesTransferred();

      let price = await getPrice();
      let formattedPrice = Number(ethers.utils.formatEther(price || "0"));

      let feeDollar = protocolFee * formattedPrice;
      let fixed = Number(feeDollar).toFixed(2);
      const inputValue = fixed;
      // setDepositAmount(inputValue);
      if (/^[0-9,.]*$/.test(fixed)) {
        const numericValue = fixed.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        const formattedWithDecimals = `${formattedValue} .00`;
        setProtocolFee(formattedValue);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  function addCommasForProtocolFee(e) {
    try {
      const inputValue = protocolFee;
      // setDepositAmount(inputValue);
      if (/^[0-9,.]*$/.test(inputValue)) {
        const numericValue = inputValue.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        const formattedWithDecimals = `${formattedValue} .00`;
        setProtocolFee(formattedValue);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }

  const TotalTokenValueInVaults = async () => {
    try {
      let TotalTokenValue = await getTotalTokenValueInVaults();
      let TotalTokenValueFloat = parseFloat(TotalTokenValue);

      if (!isNaN(TotalTokenValueFloat)) {
        setTotalTokenValueInVaults(TotalTokenValueFloat.toFixed(6));
      } else {
        setTotalTokenValueInVaults(0);
      }
    } catch (error) {
      console.log("Error in getting total token value in vaults", error);
    }
  };

  const protocolFeeInDollar = async () => {
    try {
      let protocolFee = await getProtocolFee(accountAddress);
      let protocolAmount = await protocolFee?.protocolAmount;
      let price = await getPrice();
      let feeDollar = protocolAmount.mul(price);
      let fixed = Number(feeDollar).toFixed(4) + " " + currencyName;
      setProtocolFeeInDollar(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const getDay = async () => {
    const Day = await getTimeStampForCreateValut();
    setDayStamp(Day);
  };

  const getVaultDays = async () => {
    try {
      const days = await getCeateVaultTime();
      console.log("days:", days);
      setCreateVaultDays(days);
    } catch (error) {
      console.error(error);
    }
  };

  Number.prototype.noExponents = function () {
    let data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    let z = "",
      sign = this < 0 ? "-" : "",
      str = data[0].replace(".", ""),
      mag = Number(data[1]) + 1;

    if (mag < 0) {
      z = sign + "0.";
      while (mag++) z += "0";
      return z + str.replace(/^\-/, "");
    }
    mag -= str.length;
    while (mag--) z += "0";
    return str + z;
  };
  let n = 2e-7;

  const claimAllReward = async () => {
    console.log("Number(toBeClaimed):", Number(toBeClaimed));
    console.log("toBeClaimed:", toBeClaimed);
  
    if (Number(toBeClaimed) <= 0) {
      allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
      return;
    }
  
    try {
      // allInOnePopup(null, 'Processing...', 'Please wait while we claim your rewards', `OK`, null);
      const allReward = await getClaimAllReward(accountAddress);
      await allReward.wait(); // Wait for the transaction to be confirmed
      setToBeClaimedReward(allReward);
      allInOnePopup(null, 'Successfully Claimed', null, `OK`, null);
      console.log('allReward:', allReward);
    } catch (error) {
      if (error.code === 4001) { // MetaMask user rejected the transaction
        allInOnePopup(null, 'Transaction Rejected', null, `OK`, null);
        console.error('User rejected the transaction:', error.message);
      } else {
        allInOnePopup(null, 'Transaction Rejected.', null, `OK`, null);
        console.error('Transaction error:', error?.data?.message || error.message);
      }
    }
  };
  

  const FetchBalance = async () => {
    try {
      navToExplorer()
        .then((res) => {
          setNavigateToExplorer(res);
        })
        .catch((error) => {});
      if (userConnected) {
        let fixedBalance = Number(WalletBalance || "0").toFixed(4);

        let Price = await getPrice();
        let formattedPrice = Number(ethers.utils.formatEther(Price || "0"));

        let total_amount = formattedPrice * fixedBalance;
        let fixed2 = Number(total_amount).toFixed(4);

        setBalance(fixed2);
      }
    } catch (error) {}
  };

  useEffect(() => {
    FetchBalance();
    // totalReachedPriceTarget();
  }, [accountAddress, networkName]);

  const getStateTokenUserInNumber = async () => {
    try {
      let users = await getNumberOfStateProtocolUsers();
      let usersInStr = await users?.toString();
      setNumberOfStateProtocolUsers(usersInStr);
    } catch (error) {
      console.error("getStateTokenUserInNumber: ", error);
    }
  };

  const [price, setPrice] = useState("0");
  const [totalSUm, setTotalSum] = useState("0");
  const [escrowVaultTargets, setEscrowVaultTargets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const IncrementPriceTarget = async () => {
    if (accountAddress && currencyName) {
      try {
        let price = await getPrice();
        let formattedPrice = await ethers.utils.formatEther(price || "0");
        setPrice(formattedPrice);

        let All_USERS_TARGETS = [];

        let allDepositorsAddress = await getDepositors();

        for (let index = 0; index < allDepositorsAddress.length; index++) {
          const address = allDepositorsAddress[index];
          let incrementPriceTarget = await getIncrementPriceTargets(address);
          All_USERS_TARGETS.push(...(incrementPriceTarget || []));
        }

        // Filter out targets that have already been reached and passed away from the current price
        const filteredTargets = All_USERS_TARGETS.filter((target) => {
          const formattedPriceTarget = ethers.utils.formatEther(
            target?.priceTarget.toString()
          );
          return Number(formattedPriceTarget) >= Number(formattedPrice);
        });

        // Sort the filtered targets
        const sortedArray = [...(filteredTargets || [])].sort((a, b) => {
          const formattedRatioTargetA = ethers.utils.formatEther(
            a?.priceTarget.toString()
          );
          const formattedRatioTargetB = ethers.utils.formatEther(
            b?.priceTarget.toString()
          );

          const numericValueA = Number(formattedRatioTargetA);
          const numericValueB = Number(formattedRatioTargetB);

          return numericValueA - numericValueB;
        });

        // Process and display targets for the current page
        const itemsPerPage = 2500;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsForCurrentPage = sortedArray.slice(startIndex, endIndex);

        try {
          let items = await Promise.all(
            itemsForCurrentPage.map((target, index) =>
              processTargets(target, index, currencyName)
            )
          );
          setEscrowVaultTargets(items.filter(Boolean));
        } catch (error) {
          console.error("Error processing targets:", error);
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  let totalSum = 0;

  const processTargets = async (target, index, currencyName) => {
    try {
      const formattedPriceTarget = ethers.utils.formatEther(
        target?.priceTarget.toString()
      );
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.totalFunds.toString()
      );

      // Add the formattedTargetAmount to the total sum

      console.log("from tracking page", totalSum);

      const PriceTarget = Number(formattedPriceTarget).toFixed(6);
      const targetAmount =
        Number(formattedTargetAmount).toFixed(6) + " " + (await currencyName);

      console.log("from tracking page targetAmount", parseFloat(targetAmount));

      totalSum += parseFloat(formattedTargetAmount);
      setTotalSum(totalSum.toString());

      // Return processed target
      return {
        index,
        PriceTarget,
        targetAmount,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const IPTmultiplySumWithPrice = async () => {
    // Convert the price to a floating-point number
    // Multiply the total sum with the current price
    const totalPrice = totalSUm * price;

    console.log("price IPT", totalPrice);

    return totalPrice;
  };

  useEffect(() => {
    if (userConnected) {
      IncrementPriceTarget();
      IPTmultiplySumWithPrice();
    }
  }, [accountAddress, currencyName, theme, socket, currentPage]);

  const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
  const [noOfPage, setNoOfPage] = useState(0);
  const [TotalSum, setTotalSummation] = useState("0");
  const RatioPriceTargets = async () => {
    if (accountAddress) {
      try {
        let All_USERS_TARGETS = [];

        let allDepositorsAddress = await getDepositors();

        for (let index = 0; index < allDepositorsAddress.length; index++) {
          const address = allDepositorsAddress[index];
          let targets = await getRatioPriceTargets(address);
          All_USERS_TARGETS.push(...(targets || []));
        }

        // Filter out targets that have already been reached and passed away from the current price
        const filteredTargets = All_USERS_TARGETS.filter((target) => {
          const formattedRatioPriceTarget = ethers.utils.formatEther(
            target?.ratioPriceTarget.toString()
          );
          return Number(formattedRatioPriceTarget) >= Number(price);
        });

        // Calculate total pages
        const itemsPerPage = 2500;
        const totalPages = Math.ceil(filteredTargets.length / itemsPerPage);
        setNoOfPage(totalPages); // Update the total number of pages

        // Sort the filtered targets
        const sortedArray = [...(filteredTargets || [])].sort((a, b) => {
          const formattedRatioTargetA = ethers.utils.formatEther(
            a?.ratioPriceTarget.toString()
          );
          const formattedRatioTargetB = ethers.utils.formatEther(
            b?.ratioPriceTarget.toString()
          );

          const numericValueA = Number(formattedRatioTargetA);
          const numericValueB = Number(formattedRatioTargetB);

          return numericValueA - numericValueB;
        });

        // Process and display targets for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsForCurrentPage = sortedArray.slice(startIndex, endIndex);

        try {
          let items = await Promise.all(
            itemsForCurrentPage.map((target, index) =>
              processTargetsRPT(target, index, currencyName)
            )
          );
          setRatioPriceTargets(items.filter(Boolean));
        } catch (error) {
          console.error("Error processing targets:", error);
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  let totalSummation = 0;
  const processTargetsRPT = async (target, index, currencyName) => {
    try {
      const formattedRatioTarget = ethers.utils.formatEther(
        target?.ratioPriceTarget.toString()
      );
      const ratioPriceTarget = Number(formattedRatioTarget).toFixed(6);
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.TargetAmount.toString()
      );
      const targetAmount =
        Number(formattedTargetAmount).toFixed(2) + " " + currencyName ??
        currencyName;

      totalSummation += parseFloat(targetAmount);
      setTotalSummation(totalSummation);
      console.log("from tracking RTP summation", totalSummation);
      return {
        index,
        ratioPriceTarget,
        targetAmount,
      };
    } catch (error) {
      console.log("error:", error);
    }
  };

  const RTPpmultiplySumWithPrice = async () => {
    // Convert the price to a floating-point number
    // Multiply the total sum with the current price
    const totalRTPPrice = TotalSum * price;

    console.log("price RTP", totalRTPPrice);

    return totalRTPPrice;
  };

  const TotalVaultValueLocked = () => {
    const totalvalue = totalSUm * price + TotalSum * price;
    const roundedTotal = Number(totalvalue.toFixed(3));

    // Convert the rounded total to string
    const stringValue = roundedTotal.toString();

    // Check if the string matches the pattern /^[0-9,.]*$/
    if (/^[0-9,.]*$/.test(stringValue)) {
      // Remove commas and then add them back using the regex pattern
      const formattedValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setTotalVaultSum(formattedValue);
      console.log("total value locked", formattedValue);
      return formattedValue;
    } else {
      // If the string doesn't match the pattern, set the total as it is
      setTotalVaultSum(stringValue);
      console.log("total value locked", stringValue);
      return stringValue;
    }
  };

  useEffect(() => {
    if (userConnected) {
      RatioPriceTargets();
      RTPpmultiplySumWithPrice();
      TotalVaultValueLocked();
    }
  }, [accountAddress, currencyName, theme, socket]);

  useEffect(() => {
    if (userConnected) {
      ToBeClaimed();
      ParityDollardeposits();
      ParityTokensDeposits();
      PSDClaimed();
      mathPSD();
      PSTClaimed();
      ParityAmountDistributed();
      PERPETUAL_YIELD_LOCKED();
      isParityReached();
      ProtocolFee();
      getDay();

      getVaultDays();
      getStateTokenUserInNumber();
      // getRemainingTimeForStateTokenPriceUpdate()
    }
  }, [accountAddress, currencyName, socket, NumberOfUser]);

  const tooltip =
    (theme === "dimTheme" && "dim-tooltip") ||
    (theme === "darkTheme" && "dark-tooltip");

  //Testing purpose this code written here

  return (
    <>
      <div
        className={`top-container ${
          (theme === "darkTheme" && "darkThemeTrackingBg") ||
          (theme === "dimTheme" && "dimTheme-index-class")
        }`}
      >
        <div
          className={`top-container ${isHei} container-xxl  ${
            (theme === "darkTheme" && "darkThemeTrackingBg") ||
            (theme === "dimTheme" && "dimTheme-index-class")
          }`}
        >
          <div
            className={`main-section ${shadow} me-auto card d-flex flex-wrap py-3 px-3 ${
              (theme === "darkTheme" && "Theme-block-container") ||
              (theme === "dimTheme" && "dimThemeBg")
            }`}
          >
            {isHome ? (
              <div className="row g-lg-10">
                <div
                  className={`col-md-4 border-right ${borderDarkDim} col-lg-3 d-flex flex-column justify-content-between`}
                >
                  <div>
                    <div className={`d-flex uniqHeightxyz`}>
                      <div className=" margin-right">
                        <i
                          className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                        ></i>
                      </div>
                      <div
                        className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                      >
                        <div>
                          <div className={`${textTitle}`}>TO BE CLAIMED</div>
                          <div className="varSize">
                            <span className={`spanText ${spanDarkDim}`}>
                              {toBeClaimed + " " + currencyName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center pumpBoxImg">
                      <button
                        onClick={() => {
                          claimAllReward();
                        }}
                        className={`first_pump_boxIcon ${
                          (theme === "darkTheme" && "firstdumDark") ||
                          (theme === "dimTheme" && "dimThemeBg")
                        } `}
                      >
                        <img src={fisrtPumpBrt} className="w-100 h-100" />
                      </button>
                    </div>
                  </div>
                  {/*for showing total locked value. */}
                  {/* <hr className="my-2" />
                                        <div className="d-flex">
                                            <div className='margin-right'>
                                                <i className={`iconSize fa-solid fa-comments-dollar ${theme}`}></i>
                                            </div>
                                            <div className={`flex-grow-1 fontSize text-start ${textTheme}`}>
                                                <div className={`${textTitle}`}>TOTAL VALUE LOCKED</div>
                                                <div className={`varSize ${spanDarkDim}`}><span className={`spanText ${spanDarkDim}`}>$ {totalValueLocked}</span></div>
                                            </div>
                                        </div> */}
                  <hr className="my-2" />
                  <div className="d-flex customeHeight">
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-solid fa-comments-dollar ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 newBlockAdd flex-md-column fontSize text-start ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>CONTRACT ADDRESS</div>
                        <div className={`varSize ${spanDarkDim}`}>
                          <span className={`spanTextAdd ${spanDarkDim}`}>
                            <Link
                              to={navigateToExplorer}
                              target="_blank"
                              className={`spanTextAdd ${spanDarkDim}`}
                            >
                              {isHome
                                ? conciseAddress(PSD_ADDRESS)
                                : conciseAddress}
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="w-100 d-flex align-items-end justify-content-between">
                        <div>
                          <div className={`${textTitle}`}>CONTRACT STATUS</div>
                          <div className={`varSize ${spanDarkDim}`}>
                            <span className={`spanTextAdd ${spanDarkDim}`}>
                              Contract Status - NOT RENOUNCED YET
                            </span>
                          </div>
                        </div>
                        {/* <InfoBox data='See whitepaper under ”TokenListings”' /> */}

                        <span
                          className={`${tooltip} hoverText tooltipAlign`}
                          data-tooltip="See whitepaper under ”Token Listings”"
                          data-flow="bottom"
                        >
                          {" "}
                          <i
                            className={`fas mx-2 fa-exclamation-circle ${theme}`}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                >
                  <hr className="d-block d-lg-none d-md-none " />
                  <div className="d-flex h-50">
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-regular fa-money-bill-1 ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>
                          <div className={`varSize`}> PSD</div>
                        </div>
                        <div className={`varSize `}>
                          <span className={`spanText ${spanDarkDim}`}>
                            {" "}
                            $ {parityDollardeposits}
                          </span>
                        </div>
                      </div>
                      {/* <InfoBox data='Parity Shares in Dollars. Indicating the total $ value deposited' /> */}
                      <div className="d-flex align-items-end pb-3">
                        <span
                          className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                          data-tooltip="Parity Shares in Dollars. Indicating the total $ value deposited"
                          data-flow="bottom"
                        >
                          {" "}
                          <i
                            className={`fas mx-2 fa-exclamation-circle ${theme}`}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex h-50">
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-solid fa-circle-dollar-to-slot ${theme} `}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>
                          <div className={`varSize `}> PST </div>
                        </div>
                        <div className={`varSize ${spanDarkDim}`}>
                          <span className={`spanText ${spanDarkDim}`}>
                            {" "}
                            {parityTokensDeposits}
                          </span>
                        </div>
                      </div>
                      {/* <InfoBox data='Parity Shares in Tokens. Indicating the total number of tokens
                                                    deposited'/> */}
                      <div className="d-flex align-items-end pb-3">
                        <span
                          className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                          data-tooltip="Parity Shares in Tokens. Indicating the total number of tokens
                                                    deposited"
                          data-flow="bottom"
                        >
                          {" "}
                          <i
                            className={`fas mx-2 fa-exclamation-circle ${theme}`}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                >
                  <hr className="d-block d-lg-none d-md-none " />

                  <div className="d-flex h-50">
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-solid fa-arrow-up-right-dots ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>
                          <div className={`varSize`}> PSD Rewards </div>
                        </div>
                        <div className={`varSize ${spanDarkDim}`}>
                          <span className={`spanText ${spanDarkDim}`}>
                            $ {parityDollarClaimed}
                          </span>
                        </div>
                      </div>
                      {/* <InfoBox data='Indicating the total $ value claimed' /> */}
                      <div className="d-flex align-items-end pb-3">
                        <span
                          className={`${tooltip} hoverText tooltipAlign`}
                          data-tooltip="Indicating the total $ value claimed"
                          data-flow="bottom"
                        >
                          {" "}
                          <i
                            className={`fas mx-2 fa-exclamation-circle ${theme}`}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex h-50">
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-solid fa-money-check-dollar ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>
                          <div className={`varSize`}>PST Rewards </div>
                        </div>
                        <div className={`varSize ${spanDarkDim}`}>
                          <span className={`spanText ${spanDarkDim}`}>
                            {parityTokensClaimed}

                            {IsParityReached && IsParityReached === "0" && (
                              <span
                                className={`${tooltip} hoverText hoverText`}
                                data-tooltip="You reached maximum claim for parity tokens. Deposit more tokens to get parity token reward again."
                                data-flow="bottom"
                              >
                                {" "}
                                <i
                                  className={`fas mx-2 fa-exclamation-circle ${theme}`}
                                ></i>
                              </span>
                            )}
                          </span>
                        </div>
                        {/* <div className={`varSize parity-distributed ${spanDarkDim}`}><span className={`spanText parity-distributed ${spanDarkDim}`}>
                                                        {parityAmountDistributed}
                                                    </span></div> */}
                      </div>
                      {/* <InfoBox data='Indicating the total number of tokens claimed' /> */}
                      <div className="d-flex align-items-end pb-3">
                        <span
                          className={`${tooltip} hoverText tooltipAlign`}
                          data-tooltip="Indicating the total number of tokens claimed"
                          data-flow="bottom"
                        >
                          {" "}
                          <i
                            className={`fas mx-2 fa-exclamation-circle ${theme}`}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" col-lg-3 extraFlex">
                  <hr className="d-lg-none d-block my-3" />
                  <div className="d-flex pt-1">
                    <div className="margin-right">
                      {/* <i className={`iconSize fa-solid fa-vault ${theme}`}></i> */}
                      {/* <InfoBox data='Days since deployment. Measuring time to reach 1000000% rewards' /> */}
                      <span
                        className={`${tooltip} hoverText`}
                        data-tooltip="Days since deployment. Measuring time to reach 1000000% rewards"
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start  ${textTheme}`}
                    >
                      <div className={`${textTitle} `}>DAY</div>
                      {/* <div className={`${textTitle} `}>ESCROW VAULTS</div> */}
                      <div className={`varSize ${spanDarkDim}`}>
                        <span className={`spanText ${spanDarkDim} fs-5`}>
                          {" "}
                          {DayStamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <div className="margin-right">
                      {/* <i className={`iconSize fa-solid fa-vault ${theme}`}></i> */}
                      {/* <InfoBox data='Total % rewards claimed by all users to date' /> */}
                      <span
                        className={`${tooltip} hoverText`}
                        data-tooltip="The number of tokens in vaults * current price."
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start  ${textTheme}`}
                    >
                      <div className={`${textTitle} `}>$ TVL</div>
                      {/* <div className={`${textTitle} `}>ESCROW VAULTS</div> */}
                      <div className={`varSize ${spanDarkDim}`}>
                        <span
                          className={`spanText ${spanDarkDim} fs-5`}
                          // onChange={(e) => addCommasForVaultLocked(e)}
                        >
                          {" "}
                          $ {totalVaultValue}
                          {/* here need to update the reward with totalTokens in vault * price */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <div className="margin-right">
                      {/* <i className={`iconSize fa-solid fa-vault ${theme}`}></i> */}
                      {/* <InfoBox data='Number of active wallets opening vaults' /> */}
                      <span
                        className={`${tooltip} hoverText tooltipAlign`}
                        data-tooltip="See white paper for more information"
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start  ${textTheme}`}
                    >
                      <div className={`${textTitle} `}>STATE TOKEN AIRDROP</div>
                      {/* <div className={`${textTitle} `}>ESCROW VAULTS</div> */}
                      {/* <div className={`varSize ${spanDarkDim}`}><span className={`spanText ${spanDarkDim} fs-5`}>{perpeptualYieldLocked}</span></div> */}
                      {/* <div className={`varSize ${spanDarkDim}`}><span className={`spanText ${spanDarkDim} fs-5`}>{perpeptualYieldLocked}</span></div> */}
                      <div className={`varSize ${spanDarkDim}`}>
                        <span
                          className={`spanText ${spanDarkDim} fs-5`}
                          // onChange={(e) => addCommasForProtocolFee(e)}
                        >
                          {" "}
                          {/* $ {protocolFee} */}
                           {0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useContext, useState, useEffect } from "react";
import "./dav.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import { themeContext } from "../../App";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";
import metamask from "../../Assets/metamask.png";
import firstPump from "../../Assets/fistPumpBox.svg";

import {
  PSD_ADDRESS,
  conciseAddress,
  state_token,
} from "../../Utils/ADDRESSES/Addresses";

export default function DAV() {
  // const {setsumofPoints} = useContext(airdrop)
  const { theme } = useContext(themeContext);
  let block =
    (theme === "lightTheme" && theme + " translite") ||
    (theme === "darkTheme" && theme + " transdark") ||
    (theme === "dimTheme" && theme + " transdim");
  let dark = theme === "lightTheme" && "text-dark";

  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const { accountAddress, currencyName, userConnected, networkName } =
    useContext(Web3WalletContext);
  const {
    socket,
    getRatioPriceTargets,
    getPrice,
    getDepositors,
    getTimeStampForCreateValut,
    getParityTokensDeposits,
    getParityDollardeposits,
    holdTokens,
    fetchAutoVaultAmount,
    getTotalMintedTokens,
  } = useContext(functionsContext);
  const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
  const [price, setPrice] = useState("0");
  const [seeFullPage, setseeFullPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArray, setFilteredArray] = useState([]);
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [statetokenNavigate, setStateTokenNavigate] = useState("");
  const [DayStamp, setDayStamp] = useState("0");
  const [paritydeposit, setParitydeposit] = useState("0");
  const [HoldAMount, setHoldTokens] = useState("0");
  const [totalMinted, setTotalMinted] = useState("0");
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
  const [parityTokensDeposits, setParityTokensDeposits] = useState("0");
  const [totalsumofPOints, setsumofPoints] = useState("0");

  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
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

    return `${baseUrl}/${PSD_ADDRESS}/`;
  };
  const stateExplorer = async () => {
    const baseUrl = await explorer_URL();

    return `${baseUrl}/${state_token}/`;
  };

  const exploere = async () => {
    try {
      navToExplorer()
        .then((res) => {
          setNavigateToExplorer(res);
        })
        .catch((error) => {});
      stateExplorer().then((res) => {
        setStateTokenNavigate(res);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addTokenToWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Indicates that this is an ERC20 token
            options: {
              address: "0x0B415D5482918A11B4Dc8bF68169E89293Cd3a02", // The address of the token contract
              symbol: "DAVPLS", // A ticker symbol or shorthand, up to 5 characters
              decimals: "18", // The number of decimals in the token
              image: { firstPump }, // A string url of the token logo
            },
          },
        });
      } catch (error) {
        console.error("Failed to add token to wallet", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  useEffect(() => {
    exploere();
    // totalReachedPriceTarget();
  }, [accountAddress, networkName]);

  const HoldTokensOfUser = async (accountAddress) => {
    try {
      if (!accountAddress) {
        throw new Error("Account address is undefined");
      }
      const holdToken = await holdTokens(accountAddress);
      const formattedPrice = ethers.utils.formatEther(holdToken || "0");
      console.log("hold tokens", formattedPrice);
      setHoldTokens(formattedPrice);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (accountAddress) {
      HoldTokensOfUser(accountAddress);
    }
  }, [accountAddress]);

  const fetchAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchAutoVaultAmount(accountAddress);
      const fixedAuto = Number(autoVaultAmount).toFixed(2);

      console.log("AutoVaultss from ratio:", autoVaultAmount);
      // Convert the AutoVault amount to a number for comparison
      // const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      setAutoVaultAmount(fixedAuto);
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setAutoVaultAmount("0");
    }
  };
  const ParityTokensDepositforPoint = async () => {
    try {
      let ParityTokensDeposits = await getParityTokensDeposits(accountAddress);
      let formattedParityTokensDeposits = ethers.utils.formatEther(
        ParityTokensDeposits || "0"
      );
      let fixed =
        parseFloat(formattedParityTokensDeposits)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ";
      setParitydeposit(fixed);
    } catch (error) {
      console.error(error);
    }
  };

  const totalsumofPoints = () => {
    try {
      let sum =
        parseFloat(paritydeposit.replace(/,/g, "")) +
        parseFloat(parityDollardeposits.replace(/,/g, ""));
      let fixed =
        parseFloat(sum)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ";

      setsumofPoints(fixed);
    } catch (error) {
      console.log(error);
    }
  };
  const itemsPerPage = 25;

  const getDay = async () => {
    const Day = await getTimeStampForCreateValut();
    setDayStamp(Day);
  };

  useEffect(() => {
    const fetchTotalMintedTokens = async () => {
      try {
        const total = await getTotalMintedTokens();
        setTotalMinted(total);
      } catch (error) {
        console.error("Error fetching total minted tokens:", error);
      }
    };

    fetchTotalMintedTokens();
  }, []);

  useEffect(() => {
    if (userConnected) {
      fetchAutoVaultAmounts();
      ParityDollardeposits();
      ParityTokensDeposits();
      ParityTokensDepositforPoint();
      totalsumofPoints();
      getDay();
    }
  }, [accountAddress, currencyName, theme, socket]);

  return (
    <>
      <div
        className={`flex-grow-1 fontSize text-start ${textTitle} mb-0 ms-2 ${
          theme === "dimTheme" && "text-white"
        }`}
        style={{
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        <div style={{ marginLeft: "170px", marginTop: "-10px" }}>
          <div
            className="d-flex align-items-center "
            style={{ marginLeft: "-50px" }}
          >
            <i className={`iconSize fa-solid fa-solid fa-link ${theme}`}></i>

            <p
              className={`flex-grow-1 fontSize text-start ${textTitle} ${spanDarkDim} mb-0 ms-2`}
            >
              INFORMATION
            </p>
          </div>
          <div className={`fontSize text-start ${spanDarkDim}`}>
            <div
              className={`d-flex flex-column mb-0.1 button-group
                         box-3 fontSize   ${
                           (theme === "darkTheme" && "Theme-btn-block") ||
                           (theme === "dimTheme" && "dimThemeBtnBg")
                         } `}
              style={{
                whiteSpace: "nowrap",
                marginLeft: "10px",
                backgroundColor: "transparent",
                fontWeight: "bold",
                // textAlign: "center",
                marginTop: "20px",
                padding: "10px",
                fontSize: "10px",
                // position: "relative",
                marginBottom: "5px",
                width: "300px",
                height: "35px", // Set a fixed width for all buttons
              }}
            >
              <p style={{ marginLeft: "-250px" }}>DAy {DayStamp}</p>
            </div>
            <div
              className={`d-flex align-items-center ${textTitle} ${spanDarkDim}`}
            >
              <div
                className={`d-flex flex-column mb-0.1 button-group
                         box-3 fontSize   ${
                           (theme === "darkTheme" && "Theme-btn-block") ||
                           (theme === "dimTheme" && "dimThemeBtnBg")
                         } `}
                style={{
                  whiteSpace: "nowrap",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                  fontWeight: "bold",
                  marginTop: "10px",
                  padding: "7px",
                  fontSize: "10px",
                  position: "relative",
                  marginBottom: "5px",
                  width: "300px",
                  height: "35px", // Set a fixed width for all buttons
                }}
              >
                <p
                  className={`${textTitle} ${spanDarkDim}`}
                  style={{ marginLeft: "-40px" }}
                >
                  VLP Contract Address - {""}
                  <Link
                    to={navigateToExplorer}
                    target="_blank"
                    className={`flex-grow-1 fontSize text-start ${textTitle} ${spanDarkDim}`}
                  >
                    {conciseAddress(PSD_ADDRESS)}
                  </Link>
                </p>
              </div>
            </div>
            <div>
              <div
                className={`d-flex flex-column mb-0.1 button-group
                         box-3 fontSize   ${
                           (theme === "darkTheme" && "Theme-btn-block") ||
                           (theme === "dimTheme" && "dimThemeBtnBg")
                         } `}
                style={{
                  whiteSpace: "nowrap",
                  marginTop: "-91px",
                  marginLeft: "450px",
                  backgroundColor: "transparent",
                  fontWeight: "bold",
                  // textAlign: "center",
                  padding: "7px",
                  fontSize: "10px",
                  marginBottom: "5px",
                  width: "300px",
                  height: "35px", // Set a fixed width for all buttons
                }}
              >
                <p
                  className={`${textTitle} ${spanDarkDim}`}
                  style={{ marginLeft: "-70px" }}
                >
                  DAV HOLDING - {HoldAMount} DAV token
                  <img
                    src={metamask}
                    alt="MetaMask Logo"
                    onClick={addTokenToWallet}
                    style={{ cursor: "pointer", marginRight: "20px" }}
                    className="small-metamask-logo"
                  />
                </p>
              </div>
            </div>
            <div className={`d-flex flex-grow-1 text-start ${textTheme}`}>
              <div
                className={`d-flex flex-column mb-0.1 button-group
                         box-3 fontSize   ${
                           (theme === "darkTheme" && "Theme-btn-block") ||
                           (theme === "dimTheme" && "dimThemeBtnBg")
                         } `}
                style={{
                  whiteSpace: "nowrap",
                  marginLeft: "450px",
                  backgroundColor: "transparent",
                  fontWeight: "bold",
                  marginTop: "10px",
                  padding: "10px",
                  fontSize: "10px",
                  position: "relative",
                  marginBottom: "5px",
                  width: "300px",
                  height: "35px", // Set a fixed width for all buttons
                }}
              >
                <p
                  className={` ${textTitle} ${spanDarkDim}`}
                  style={{ marginLeft: "-150px" }}
                >
                  DAV TOKEN MINTS - {totalMinted}
                </p>
              </div>
            </div>
            <div className={`text-start ${textTheme}`}>
              <div
                className={`d-flex flex-column mb-0.1 button-group
                         box-3 fontSize   ${
                           (theme === "darkTheme" && "Theme-btn-block") ||
                           (theme === "dimTheme" && "dimThemeBtnBg")
                         } `}
                style={{
                  whiteSpace: "nowrap",
                  marginLeft: "900px",
                  backgroundColor: "transparent",
                  fontWeight: "bold",
                  marginTop: "-90px",
                  padding: "10px",
                  fontSize: "10px",
                  position: "relative",
                  marginBottom: "5px",
                  width: "300px",
                  height: "35px", // Set a fixed width for all buttons
                }}
              >
                <p
                  className={`${textTitle} ${spanDarkDim}`}
                  style={{ marginLeft: "-50px" }}
                >
                  Future airdrop points -{" "}
                  <span className={` ${textTitle}   ${spanDarkDim} `}>
                    {totalsumofPOints} points
                  </span>
                </p>
              </div>
            </div>
            <div className={`text-start ${textTheme}`}>
              <div
                className={`d-flex flex-column mb-0.1 button-group
                         box-3 fontSize   ${
                           (theme === "darkTheme" && "Theme-btn-block") ||
                           (theme === "dimTheme" && "dimThemeBtnBg")
                         } `}
                style={{
                  whiteSpace: "nowrap",
                  marginLeft: "900px",
                  backgroundColor: "transparent",
                  fontWeight: "bold",
                  marginTop: "10px",
                  padding: "10px",
                  fontSize: "10px",
                  position: "relative",
                  marginBottom: "5px",
                  width: "300px",
                  height: "35px", // Set a fixed width for all buttons
                }}
              >
                <p
                  className={`${textTitle} ${spanDarkDim}`}
                  style={{ marginLeft: "-170px" }}
                >
                  Documentation{" "}
                  <a
                    href="https://system-state-documentation.gitbook.io/"
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </p>
              </div>
            </div>
            <div className={`text-start ${textTheme}`}>
              <div
                className={`d-flex flex-column mb-0.1 button-group
                         box-3 fontSize   ${
                           (theme === "darkTheme" && "Theme-btn-block") ||
                           (theme === "dimTheme" && "dimThemeBtnBg")
                         } `}
                style={{
                  whiteSpace: "nowrap",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                  fontWeight: "bold",
                  marginTop: "15px",
                  padding: "10px",
                  fontSize: "10px",
                  position: "relative",
                  marginBottom: "5px",
                  width: "300px",
                  height: "35px", // Set a fixed width for all buttons
                }}
              >
                <p
                  className={`${textTitle} ${spanDarkDim}`}
                  style={{ marginLeft: "-35px" }}
                >
                  DAV Contract Address - {""}
                  <Link
                    to={statetokenNavigate}
                    target="_blank"
                    className={`flex-grow-1 fontSize text-start ${textTitle} ${spanDarkDim}`}
                  >
                    {conciseAddress(state_token)}
                  </Link>
                </p>
              </div>
            </div>
            <div
              className={`d-flex flex-column mb-0.1 button-group
                         box-3 fontSize   ${
                           (theme === "darkTheme" && "Theme-btn-block") ||
                           (theme === "dimTheme" && "dimThemeBtnBg")
                         } `}
              style={{
                whiteSpace: "nowrap",
                marginLeft: "450px",
                backgroundColor: "transparent",
                fontWeight: "bold",
                marginTop: "-40px",
                padding: "10px",
                fontSize: "10px",
                position: "relative",
                marginBottom: "5px",
                width: "300px",
                height: "35px", // Set a fixed width for all buttons
              }}
            >
              <p
                className={` ${textTitle} ${spanDarkDim}`}
                style={{ marginLeft: "-130px" }}
              >
                DAV TOKEN SUPPLY - 100000
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

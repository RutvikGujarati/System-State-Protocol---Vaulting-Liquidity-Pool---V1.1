import React, { useContext, useState, useEffect } from "react";
import "./dav.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import LogoTransparent from "../../Assets/LogoTransparent.png";
import pxen from "../../Assets/pxen.png";
import pdxn from "../../Assets/Token List Icon/pdxn.png";
import PFENIX from "../../Assets/Token List Icon/pfenix.svg";
import fantom from "../../Assets//fantom.png";
import tron from "../../Assets/tron.png";

import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";
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
import TrackingPage from "../../Components/Tracker/TrackingPage";

export default function DAV() {
  // const {setsumofPoints} = useContext(airdrop)
  const { theme } = useContext(themeContext);

  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const tooltip =
    (theme === "dimTheme" && "dim-tooltip") ||
    (theme === "darkTheme" && "dark-tooltip");
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
  let block =
    (theme === "lightTheme" && theme + " translite") ||
    (theme === "darkTheme" && theme + " transdark") ||
    (theme === "dimTheme" && theme + " transdim");
  let dark = theme === "lightTheme" && "text-dark";

  const { accountAddress, userConnected, networkName } =
    useContext(Web3WalletContext);
  const {
    // socket,
    // getRatioPriceTargets,
    // getPrice,
    // getDepositors,
    getTimeStampForCreateValut,
    getParityTokensDeposits,
    getParityDollardeposits,
    holdTokens,
    getTotalMintedTokens,
  } = useContext(functionsContext);
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [statetokenNavigate, setStateTokenNavigate] = useState("");
  const [DayStamp, setDayStamp] = useState("0");
  const [paritydeposit, setParitydeposit] = useState("0");
  const [HoldAMount, setHoldTokens] = useState("0");
  const [totalMinted, setTotalMinted] = useState("0");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
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
        // const formattedWithDecimals = `${formattedValue} .00`;
        setParityDollardeposits(formattedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const location = useLocation();
  const isHome = location.pathname === "/mint";
  const isAlpha = location.pathname === "/alpharoom";
  const isInflation = location.pathname === "/inflation-bank";

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
            type: "ERC20",
            options: {
              address: "0xB0C278AD98c0a43608889cF317Bd337921cabC51",
              symbol: "DAVPLS",
              decimals: "18",
              image: { firstPump },
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
  });

  const HoldTokensOfUser = async (accountAddress) => {
    try {
      if (!accountAddress) {
        throw new Error("Account address is undefined");
      }
      const holdToken = await holdTokens(accountAddress);
      const formattedPrice = ethers.utils.formatEther(holdToken || "0");
      console.log("hold tokensssssss", formattedPrice);
      setHoldTokens(formattedPrice);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (accountAddress) {
      HoldTokensOfUser(accountAddress);
    }
  });

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
  });

  useEffect(() => {
    if (userConnected) {
      ParityDollardeposits();
      ParityTokensDepositforPoint();
      totalsumofPoints();
      getDay();
    }
  });

  const pageStyle = {
    backgroundColor:
      theme === "dimTheme" ? "#141f35" : theme === "dimTheme" ? "#555" : "#fff",
    color: theme === "darkTheme" || theme === "dimTheme" ? "#fff" : "#000",
    minHeight: "60vh",
  };

  const isHei = !isHome && !isAlpha && !isInflation && "hei";

  return (
    <>
      <div
        className={`flex-grow-1 fontSize text-start ${textTitle} mb-0 ms-3 ${
          theme === "dimTheme" && "text-white"
        }`}
      >
        {isHome ? (
          <>
            <div>
              <div
                className={` info-item info-columns box new ${
                  (theme === "darkTheme" && "Theme-btn-block") ||
                  (theme === "dimTheme" && "dimThemeBorder") ||
                  (theme === "lightTheme" && theme + " translite")
                }`}
              >
                <Link to={"/inflation-bank"}>
                  <p className="inflation-bank">CLAIM REWARDS / AUTO-VAULTS</p>
                </Link>
              </div>

              <div className="tracking" style={{ marginTop: "100px" }}>
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
                      <div className="row g-lg-10">
                        <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div className="d-flex mint-token-container">
                            <div className="margin-right">
                              <img
                                src={LogoTransparent}
                                alt="Logo"
                                width="40"
                                height="40"
                                className={`iconSize ${theme}`}
                              />
                            </div>

                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div className={`${textTitle} mint-two`}>
                                {/* <div> CLAIM PLS REWARDS</div>
                                <div className="varSize">
                                  <span className={`spanText ${spanDarkDim}`}>
                                    0 PLS
                                  </span>
                                </div> */}
                                <div className="d-flex  button-group  ">
                                  <button
                                    className={`  box-4 items mx-2 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : ""
                                    } ${theme}`}
                                    // onClick={() => BuyTokens(2, 500000)}
                                  >
                                    CLAIM
                                  </button>
                                  <span className={`spanValue2 ${spanDarkDim}`}>
                                    500,000
                                  </span>
                                </div>
                                <div className="d-flex  button-group items">
                                  <button
                                    className={` box-4 items mx-2 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : ""
                                    } ${theme}`}
                                    // onClick={() => mintWithPDXN(2, 800)}
                                  >
                                    AUTO-VAULT
                                  </button>
                                  <span className={`spanValue ${spanDarkDim}`}>
                                    800
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* <div
                              className="d-flex align-items-end pb-3 "
                              style={{ marginBottom: "10px" }}
                            >
                              <span
                                className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                                data-tooltip="INFLATION BANK REWARDS"
                                data-flow="bottom"
                              >
                                <i
                                  className={`fas mx-2 fa-exclamation-circle ${theme}`}
                                ></i>
                              </span>
                            </div> */}
                          </div>
                        </div>
                        <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div
                            className="d-flex mint-token-container"
                            style={{ marginTop: "-20px" }}
                          >
                            <div className="margin-right">
                              <img
                                src={pxen}
                                alt="Logo"
                                width="40"
                                height="40"
                                className={`iconSize ${theme}`}
                              />
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div className={`${textTitle} `}>
                                {/* <div> CLAIM PXEN REWARDS</div>
                                <div className="varSize">
                                  <span className={`spanText ${spanDarkDim}`}>
                                    0 PXEN
                                  </span>
                                </div> */}
                                <div className="d-flex  button-group items-a ">
                                  <button
                                    className={`  box-4 mx-1 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : ""
                                    } ${theme}`}
                                    // onClick={() => BuyTokens(2, 500000)}
                                  >
                                    CLAIM
                                  </button>
                                  <span className={`spanValue2 ${spanDarkDim}`}>
                                    500,000
                                  </span>
                                </div>
                                <div className="d-flex  button-group items-b">
                                  <button
                                    className={` box-4 items mx-2 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : ""
                                    } ${theme}`}
                                    // onClick={() => mintWithPDXN(2, 800)}
                                  >
                                    AUTO-VAULT
                                  </button>
                                  <span className={`spanValue2 ${spanDarkDim}`}>
                                    800
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* <div
                              className="d-flex align-items-end pb-3 "
                              style={{ marginBottom: "10px" }}
                            >
                              <span
                                className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                                data-tooltip="INFLATION BANK REWARDS"
                                data-flow="bottom"
                              >
                                <i
                                  className={`fas mx-2 fa-exclamation-circle ${theme}`}
                                ></i>
                              </span>
                            </div> */}
                          </div>
                        </div>
                        <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div className="d-flex mint-token-container"  style={{ marginTop: "-15px" }}>
                            <div
                              className="margin-right"
                             
                            >
                              <img
                                src={pdxn}
                                alt="Logo"
                                width="30"
                                height="30"
                                className={`iconSize ${theme}`}
                              />
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div>
                                {/* <div
                                  className={`${textTitle} `}
                                  style={{
                                    marginTop: "-15px",
                                  }}
                                >
                                  CLAIM PDXN REWARDS
                                </div>
                                <div className="varSize">
                                  <span className={`spanText ${spanDarkDim}`}>
                                    0 PDXN
                                  </span>
                                </div> */}
                                <div className=" d-flex  button-group">
                                  <button
                                    className={`  box-4 mx-2 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : ""
                                    } ${theme}`}
                                    // onClick={() => BuyTokens(5, 1000000)}
                                  >
                                    CLAIM
                                  </button>
                                  <span className={`spanValue ${spanDarkDim}`}>
                                    500,000
                                  </span>
                                </div>
                                <div className="d-flex  button-group">
                                  <button
                                    className={`  box-4 mx-2 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : ""
                                    } ${theme}`}
                                    // onClick={() => mintWithPDXN(5, 1750)}
                                  >
                                    AUTO-VAULT
                                  </button>
                                  <span className={`spanValue ${spanDarkDim}`}>
                                    800
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* <div className="tooltips d-flex align-items-end pb-3">
                              <span
                                className={`${tooltip} hoverText tooltipAlign`}
                                data-tooltip="INFLATION BANK REWARDS"
                                data-flow="bottom"
                              >
                                <i
                                  className={`fas mx-2 fa-exclamation-circle ${theme}`}
                                ></i>
                              </span>
                            </div> */}
                          </div>
                        </div>
                        <div className="col-lg-3 extraFlex">
                          <hr className="d-lg-none d-block my-3" />
                          <div className="d-flex pt-1 mint-token-container"  style={{ marginTop: "-5px" }}>
                            <div className="margin-right">
                              <img
                                src={PFENIX}
                                alt="Logo"
                                width="30"
                                height="30"
                                className={`iconSize ${theme}`}
                              />
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
                            >
                              {/* <div className={`${textTitle} mint-thir`}>
                                CLAIM PFENIX REWARDS
                              </div>
                              <div className="varSize">
                                <span className={`spanText ${spanDarkDim}`}>
                                  0 PFENIX
                                </span>
                              </div> */}
                              <div className=" d-flex  button-group ">
                                <button
                                  className={`  box-4 mx-2 glowing-button  ${
                                    theme === "darkTheme"
                                      ? "Theme-btn-block"
                                      : theme === "dimTheme"
                                      ? "dimThemeBtnBg"
                                      : ""
                                  } ${theme}`}
                                  // onClick={() => BuyTokens(5, 1000000)}
                                >
                                  CLAIM
                                </button>
                                <span className={`spanValue ${spanDarkDim}`}>
                                  500,000
                                </span>
                              </div>
                              <div className="d-flex  button-group ">
                                <button
                                  className={`  box-4 mx-2 glowing-button  ${
                                    theme === "darkTheme"
                                      ? "Theme-btn-block"
                                      : theme === "dimTheme"
                                      ? "dimThemeBtnBg"
                                      : ""
                                  } ${theme}`}
                                  // onClick={() => mintWithPDXN(5, 1750)}
                                >
                                  AUTO-VAULT
                                </button>
                                <span className={`spanValue ${spanDarkDim}`}>
                                  800
                                </span>
                              </div>
                            </div>
                            {/* <div className="d-flex align-items-end pb-3">
                              <span
                                className={`${tooltip} hoverText tooltipAlign`}
                                data-tooltip="INFLATION BANK REWARDS"
                                data-flow="bottom"
                              >
                                <i
                                  className={`fas mx-2 fa-exclamation-circle ${theme}`}
                                ></i>
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={` info-item info-columns boxes new1 ${
                    (theme === "darkTheme" && "Theme-btn-block") ||
                    (theme === "dimTheme" && "dimThemeBorder") ||
                    (theme === "lightTheme" && theme + " translite")
                  }`}
                >
                  <Link to={"/alpharoom"}>
                    <p className="alpha-room">ALPHA ROOM</p>
                  </Link>
                </div>
                <div
                  className={`top-container ${
                    (theme === "darkTheme" && "darkThemeTrackingBg") ||
                    (theme === "dimTheme" && "dimTheme-index-class")
                  }`}
                  style={{ marginTop: "100px" }}
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
                      <div className="row g-lg-10">
                      <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div className="d-flex mint-token-container">
                            <div className="margin-right">
                              <img
                                src={LogoTransparent}
                                alt="Logo"
                                width="40"
                                height="40"
                                className={`iconSize ${theme}`}
                              />
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div>
                                <div className="varSize">
                                  <span className={`spanTex ${spanDarkDim}`}>
                                  PLS
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div className="d-flex mint-token-container">
                            <div className="margin-right">
                              <img
                                src={pxen}
                                alt="Logo"
                                width="40"
                                height="40"
                                className={`iconSize ${theme}`}
                              />
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div>
                                <div className="varSize">
                                  <span className={`spanTex ${spanDarkDim}`}>
                                  PXEN
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div className="d-flex mint-token-container">
                            <div className="margin-right">
                              <img
                                src={pdxn}
                                alt="Logo"
                                width="30"
                                height="30"
                                className={`iconSize ${theme}`}
                              />
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div>
                                <div className="varSize">
                                  <span className={`spanTex ${spanDarkDim}`}>
                                    PDXN
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div className="d-flex mint-token-container">
                            <div className="margin-right">
                              <img
                                src={[PFENIX]}
                                alt="Logo"
                                width="30"
                                height="30"
                                className={`iconSize ${theme}`}
                              />
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div>
                                <div className="varSize">
                                  <span className={`spanTex ${spanDarkDim}`}>
                                  PFENIX
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : isAlpha ? (
          <>
            <div style={{ marginLeft: "550px", marginTop: "-20px" }}>
              <p>DAV token must remain in the wallet that minted them.</p>
            </div>
            <div style={{ marginLeft: "170px", marginTop: "-10px" }}>
              <div
                className="d-flex align-items-center "
                style={{ marginLeft: "-50px" }}
              >
                <i
                  className={`iconSize fa-solid fa-solid fa-link ${theme}`}
                ></i>

                <p
                  className={`flex-grow-1 fontSize text-start ${textTitle} ${spanDarkDim} mb-0 ms-2`}
                >
                  INFORMATION
                </p>
              </div>
              <div className="pad">
                <div className={`info-content `}>
                  <div className="info-column column-left">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>DAY {DayStamp}</p>
                    </div>
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        VLP Contract Address -{" "}
                        <Link
                          to={navigateToExplorer}
                          target="_blank"
                          className={`info-link ${textTitle} ${spanDarkDim}`}
                        >
                          {conciseAddress(PSD_ADDRESS)}
                        </Link>
                      </p>
                    </div>
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Contract Address -{" "}
                        <Link
                          to={statetokenNavigate}
                          target="_blank"
                          className={`info-link ${textTitle} ${spanDarkDim}`}
                        >
                          {conciseAddress(state_token)}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="info-column column-center">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Holding - {HoldAMount} DAV token{" "}
                        <img
                          src={metamask}
                          alt="MetaMask Logo"
                          // onClick={addTokenToWallet}
                          className="metamask-logo"
                        />
                      </p>
                    </div>
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Token Mints -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          {totalMinted}
                        </span>
                      </p>
                    </div>
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Token Supply -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          422000
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="info-column column-right">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        Future Airdrop Points -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          {totalsumofPOints} points
                        </span>
                      </p>
                    </div>
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
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
                </div>
              </div>
            </div>
          </>
        ) : isInflation ? (
          <>
            {/* <div style={{ marginLeft: "550px", marginTop: "-20px" }}>
              <p>DAV token must remain in the wallet that minted them.</p>
            </div> */}
            <div style={{ marginLeft: "170px", marginTop: "-10px" }}>
              <div
                className="d-flex align-items-center "
                style={{ marginLeft: "-50px" }}
              >
                <i
                  className={`iconSize fa-solid fa-solid fa-link ${theme}`}
                ></i>

                <p
                  className={`flex-grow-1 fontSize text-start ${textTitle} ${spanDarkDim} mb-0 ms-2`}
                >
                  INFORMATION
                </p>
              </div>
              <div className="pad">
                <div className={`info-content `}>
                  <div className="info-column column-left">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>DAY {DayStamp}</p>
                    </div>
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        VLP Contract Address -{" "}
                        <Link
                          to={navigateToExplorer}
                          target="_blank"
                          className={`info-link ${textTitle} ${spanDarkDim}`}
                        >
                          {conciseAddress(PSD_ADDRESS)}
                        </Link>
                      </p>
                    </div> */}
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Contract Address -{" "}
                        <Link
                          to={statetokenNavigate}
                          target="_blank"
                          className={`info-link ${textTitle} ${spanDarkDim}`}
                        >
                          {conciseAddress(state_token)}
                        </Link>
                      </p>
                    </div> */}
                  </div>
                  <div className="info-column column-center">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        Future Airdrop Points -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          {totalsumofPOints} points
                        </span>
                      </p>
                    </div>
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Token Mints -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          {totalMinted}
                        </span>
                      </p>
                    </div> */}
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Token Supply -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          422000
                        </span>
                      </p>
                    </div> */}
                  </div>
                  <div className="info-column column-right">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
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
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

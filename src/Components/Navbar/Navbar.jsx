import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { themeContext } from "../../App";
import LogoTransparent from "../../Assets/LogoTransparent.png";
import mumbaiIcon from "../../Assets/Token List Icon/chain-light.svg";
import lightETH_Icon from "../../Assets/Token List Icon/ethereum.svg";
import lightMode from "../../Assets/Icons/light-mode.png";
import darkETH_Icon from "../../Assets/Token List Icon/ethereum-original-light.svg";
import Modal from "react-modal";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { allInOnePopup } from "../../Utils/ADDRESSES/Addresses";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";
import axios from 'axios';
import abi from "./abi.json"

Modal.setAppElement("#root");
export default function Index() {
  const { themeMode, setThemeMode, theme } = useContext(themeContext);
  const {
    ProvidermetamaskLogin,
    userConnected,
    accountAddress,
    WalletBalance,
    networkName,
    currencyName,
  } = useContext(Web3WalletContext);
  const { getPrice, socket } = useContext(functionsContext);
  const [price, setprice] = useState(0);
  const fetchAndUpdatePrice = async () => {
    const contractAddress = "0x68d0934F1e1F0347aad5632084D153cDBfe07992";
    const providerURL = 'https://pulsechain-testnet-rpc.publicnode.com';
    const privateKey = '0x8ede05ba12e23a241c12d2cad5831ec529b19e937d687527239db8f7bca38737';
    try {
        // Fetch price from CoinGecko
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'pulsechain',
                vs_currencies: 'usd'
            }
        });
        const fetchedPrice = response.data.pulsechain.usd;

        console.log("PLS price:", fetchedPrice);

        // Update price in smart contract
        const provider = new ethers.providers.JsonRpcProvider(providerURL);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        const tx = await contract.updatePrice(ethers.utils.parseEther(fetchedPrice.toString()));

        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        // Log the transaction receipt
        console.log("Transaction receipt:", receipt);

        // Fetch updated price from smart contract
        const updatedPrice = await contract.getPrice();
        const formattedPrice = ethers.utils.formatEther(updatedPrice);
        setprice(formattedPrice);

    } catch (error) {
        console.error("Error:", error);
    }
};


  const [connectedIcon, setConnectedIcon] = useState(mumbaiIcon);
  const [themeIcon, setThemeIcon] = useState(
    <i
      className="far fa-sun fa-fw dropdown-item-icon theme-icon me-1"
      data-href="#fa-sun-bright"
    />
  );
  const getIcon = async () => {
    if (currencyName) {
      if (currencyName === "PLS") {
        setConnectedIcon(LogoTransparent);
      } else if (currencyName === "MATIC") {
        setConnectedIcon(mumbaiIcon);
      } else if (currencyName === "ETH") {
        setConnectedIcon(lightETH_Icon);
      }
    }
  };
  const getThemeIcon = () => {
    if (theme === "lightTheme") {
      setThemeIcon(
        <i
          className="far fa-sun fa-fw dropdown-item-icon theme-icon me-1"
          data-href="#fa-sun-bright"
        />
      );
    } else if (theme === "dimTheme") {
      setThemeIcon(
        <i
          className="fa-solid fa-cloud-moon-rain fa-fw dropdown-item-icon theme-icon me-1"
          data-href="#fa-moon-stars"
        ></i>
      );
    } else if (theme === "darkTheme") {
      setThemeIcon(
        <i
          className="far fa-moon fa-fw dropdown-item-icon theme-icon me-1"
          data-href="#fa-moon"
        ></i>
      );
    }
  };

  useEffect(() => {
    getIcon();
    getThemeIcon();
    if (userConnected) {
      fetchAndUpdatePrice();
      const interval = setInterval(fetchAndUpdatePrice, 120000); // 300000ms = 5 minute
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [currencyName, theme, socket, userConnected]);

  useEffect(() => {
    if (!userConnected) {
      ProvidermetamaskLogin();
    }
  }, [currencyName, userConnected]);

  const location = useLocation();
  const isOnInscription = "active"; // const isOnInscription = location.pathname === '/inscription' ? 'active' : ''

  return (
    <>
      <div
        className={` nav-pr py-1 sticky-top sticky-lg-top d-flex flex-row ${theme} ${
          (theme === "darkTheme" && "DarkThemeBorderBtm") ||
          (theme === "dimTheme" && "themeTrackBorderBtm") ||
          "border-bottom"
        }`}
        id="Nav-top"
      >
        <div className="container-xxl d-flex justify-content-between">
          <div
            id="ethPrice"
            className="d-flex my-auto w-100 justify-content-between align-items-sm-center gap-3 sm-font"
            style={{ fontSize: "14px" }} // Set font size here
          >
            <div className={`  docs  ${theme}`}>
              <span className="">{currencyName} Price:</span>
              <span className=" mx-1">$ {price}</span>
              <span data-bs-toggle="tooltip" data-bs-placement="top"></span>
            </div>

            <div className={`d-flex navBar-btn me-3 ${isOnInscription}`}>
              <Link
                className={`nav-link my-auto docs mx-3 ${
                  location.pathname === "/Create-Vaults" && "ins active"
                }`}
                role="button"
                to={"Create-Vaults"}
              >
                Create Vault
              </Link>
              <Link
                className="nav-link my-auto docs mx-2"
                role="button"
                target="_blank"
                to={"https://system-state-documentation.gitbook.io/"}
              >
                Documentation
              </Link>
              <div className={`${theme}`}>
                <span className="connected-wallet-text docs ">
                  {userConnected
                    ? `[${accountAddress.substring(
                        0,
                        4
                      )}...${accountAddress.substring(
                        accountAddress.length - 4
                      )}]`
                    : "Not Connected"}
                </span>
                <span data-bs-toggle="tooltip" data-bs-placement="top"></span>
              </div>
            </div>
          </div>
          <div id="divThemeSetting" className="dropdown  my-auto d-flex">
            <button
              className={`btn btn-lg btn-white mx-1 content-center  p-0  ${
                (theme === "lightTheme" && " icon-btnLight") ||
                (theme === "dimTheme" && theme + " icon-btnDim") ||
                (theme === "darkTheme" && " icon-btnDark")
              } `}
              type="button"
              id="dropdownMenuTopbarSettings"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "2.375rem", height: "2.375rem" }}
            >
              <div className="theme-btn-main ">
                {themeIcon}
              </div>
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end  px-2 ${
                (theme == "darkTheme" && theme + " darkUL") ||
                (theme == "dimTheme" && theme + " dimUL")
              }`}
              aria-labelledby="dropdownMenuTopbarSettings"
              style={{
                position: "absolute",
                inset: "0px 0px auto auto",
                margin: "0px",
                transform: "translate(0px, 40px)",
              }}
              data-popper-placement="bottom-end"
            >
              <li className="">
                <button
                  type="button"
                  value={themeMode}
                  className={`dropdown-item theme-btn ${
                    themeMode === "light" && "click"
                  }`}
                  data-bs-theme-value="light"
                  onClick={() => {
                    localStorage.setItem("theme", "light");
                    setThemeMode(localStorage.getItem("theme"));
                  }}
                >
                  <i
                    className="far fa-sun fa-fw dropdown-item-icon theme-icon me-1"
                    data-href="#fa-sun-bright"
                  />
                  <span className="ms-1">Light</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  value={themeMode}
                  className={`dropdown-item theme-btn ${
                    themeMode === "dim" && "click"
                  }`}
                  data-bs-theme-value="dim"
                  onClick={() => {
                    localStorage.setItem("theme", "dim");
                    setThemeMode(localStorage.getItem("theme"));
                  }}
                >
                  <i
                    className="fa-solid fa-cloud-moon-rain fa-fw dropdown-item-icon theme-icon me-1"
                    data-href="#fa-moon-stars"
                  ></i>{" "}
                  Dim
                </button>
              </li>
            </ul>

            <button
              className={`icon-btn2 btn btn-lg btn-white mx-1 content-center p-2 ${
                (theme === "lightTheme" && " icon-btnLight") ||
                (theme === "dimTheme" && theme + " icon-btnDim") ||
                (theme === "darkTheme" && " icon-btnDark")
              }  `}
              type="button"
              id="dropdownMenuLink"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "2.375rem", height: "2.375rem" }}
            >
              <img
                className={`w-100 h-100  ${
                  (theme === "dimTheme" && "logoDimTwo") ||
                  (theme === "darkTheme" && "logoDarkTwo")
                }`}
                src={connectedIcon}
                data-href="#fa-sun-bright"
              />
            </button>
            <ul
              className={`dropdown-menu ${
                (theme == "lightTheme" && "logoLight") ||
                (theme == "dimTheme" && theme + " logoDim") ||
                (theme == "darkTheme" && "logoDark")
              } ${
                (theme == "darkTheme" && theme + " darkUL") ||
                (theme == "dimTheme" && theme + " dimUL")
              }`}
              style={{ fontSize: "13px" }}
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                {
                  <Link
                    className="dropdown-item color-name"
                    to="#"
                    onClick={() => !userConnected && ProvidermetamaskLogin()}
                  >
                    {userConnected ? networkName : "Connect Wallet"}
                  </Link>
                }
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`d-flex p-0 m-0 ${
            (theme === "darkTheme" && "DarkThemeBorderBtm") ||
            (theme === "dimTheme" && "themeTrackBorderBtm") ||
            "border-bottom"
          }`}
        ></div>
      </div>
    </>
  );
}

import React, { useContext, useState, useEffect } from "react";
import "./RatioPriceTargets.css";
import "../../../../Utils/Theme.css"
import { themeContext } from "../../../../App";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../../../Utils/MetamaskConnect";
import { functionsContext } from "../../../../Utils/Functions";
import { ethers } from "ethers";

export default function RatioPriceTargetsXEN() {
  // const {setsumofPoints} = useContext(airdrop)
  const { theme } = useContext(themeContext);

  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");

  const { accountAddress, currencyName, userConnected } =
    useContext(Web3WalletContext);
  const { getRatioPriceTargets, getDepositors } = useContext(functionsContext);
  const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArray, setFilteredArray] = useState([]);

  const itemsPerPage = 25;

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

        // Sort the targets
        const sortedArray = [...(All_USERS_TARGETS || [])].sort((a, b) => {
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

        // Remove reached targets
        const newFilteredArray = sortedArray.filter(
          (target) => !target.isClosed
        );
        setFilteredArray(newFilteredArray);

        // Process and display targets for the current page
        updateCurrentPageItems(newFilteredArray, currentPage);
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  const updateCurrentPageItems = async (array, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsForCurrentPage = array.slice(startIndex, endIndex);

    try {
      let items = await Promise.all(
        itemsForCurrentPage.map((target, index) =>
          processTargets(target, index, currencyName)
        )
      );
      setRatioPriceTargets(items.filter(Boolean));
    } catch (error) {
      console.error("Error processing targets:", error);
    }
  };

  const processTargets = async (target, index, currencyName) => {
    try {
      const formattedRatioTarget = ethers.utils.formatEther(
        target?.ratioPriceTarget.toString()
      );
      const ratioPriceTarget = Number(formattedRatioTarget).toFixed(10);
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.TargetAmount.toString()
      );
      const targetAmount =
        Number(formattedTargetAmount).toFixed(5) + " XEN";
      const givenTimestamp = target?.Time.toString();
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const timeDifferenceInSeconds = currentTimestamp - Number(givenTimestamp);
      const timeDifference = await formatTimeDifference(
        Number(timeDifferenceInSeconds)
      );

      if (!target.isClosed)
        return (
          <div
            key={index}
            className={`box-items  ${
              (theme === "darkTheme" && "Theme-box-item") ||
              (theme === "dimTheme" &&
                "dim-theme-items" &&
                "dim-theme-items-border") ||
              "viewItemsTop"
            }`}
          >
            <div className="box-1" id="box1">
              <div>
                <p>
                  {" "}
                  <span>Transaction</span>{" "}
                </p>
                <p
                  className={`${
                    (theme === "darkTheme" && "Theme-block-time") ||
                    (theme === "dimTheme" && "Theme-block-time") ||
                    "time-opacity "
                  }`}
                >
                  {timeDifference} ago
                </p>
              </div>
            </div>
            <div className="box-1 box-2" id="box2">
              <p
                className={`d-flex flex-column para-column-fit  ${
                  (theme === "darkTheme" && "Theme-col2-para") ||
                  (theme === "dimTheme" && "Theme-col2-para")
                }`}
              >
                Target Price<span> Target Price : $ {ratioPriceTarget}</span>{" "}
              </p>
            </div>
            <p
              className={`box-3  ${
                (theme === "darkTheme" && "Theme-btn-block") ||
                (theme === "dimTheme" && "dimThemeBtnBg")
              }`}
            >
              {" "}
              {targetAmount}
            </p>
          </div>
        );
    } catch (error) {
      console.log("error:", error);
    }
  };

  const formatTimeDifference = async (seconds) => {
    if (seconds >= 60 * 60 * 24) {
      const days = Math.floor(seconds / (24 * 60 * 60));
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (seconds >= 60 * 60) {
      const hours = Math.floor(seconds / (60 * 60));
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
  };

  useEffect(() => {
    if (userConnected) {
      RatioPriceTargets();
    }
  });

  useEffect(() => {
    if (filteredArray.length > 0) {
      updateCurrentPageItems(filteredArray, currentPage);
    }
  });

  return (
    <>
      <div className=" ">
        <div
          className={`container-1 ${
            (theme === "darkTheme" && "Theme-block-container") ||
            (theme === "dimTheme" && "dimThemeBg") ||
            shadow
          } `}
        >
          <div
            className={`box-titles1 mx-3 ${theme === "darkTheme" && ""} `}
            id={``}
          >
            <h1
              className={`box-title mb-3 ${
                (theme === "darkTheme" && "bg-dark" && "text-white") ||
                (theme === "dimTheme" && "title-color")
              }`}
            >
              Ratio Price Targets (rPT)
            </h1>
          </div>
          <div className={` reponsive-box1 `}>{ratioPriceTargets}</div>
          <div className="view-main">
            <div
              className={`view-pagerpt  ${
                (theme === "darkTheme" && "Theme-view-page") ||
                (theme === "dimTheme" &&
                  "dimThemeBlockView" &&
                  "dim-theme-items-border")
              } `}
            >
              <div></div>

              <div
                className={`table_pageIndex ${
                  theme === "dimTheme" && "text-white"
                }`}
              >
                <span
                  className="pageBtnDir"
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1); // Decrement current page
                    }
                  }}
                >
                  &#10216;
                </span>
                <span>
                  {currentPage} /{" "}
                  {Math.ceil(filteredArray.length / itemsPerPage)}
                </span>
                <span
                  className="pageBtnDir"
                  onClick={() => {
                    if (
                      currentPage <
                      Math.ceil(filteredArray.length / itemsPerPage)
                    ) {
                      setCurrentPage(currentPage + 1); // Increment current page
                    }
                  }}
                >
                  &#10217;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

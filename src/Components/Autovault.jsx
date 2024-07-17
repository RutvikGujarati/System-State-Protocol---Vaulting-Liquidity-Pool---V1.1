import React, {
  createContext,
  // useCallback,
  useContext,
  // useRef,
  useEffect,
  useState,
} from "react";
import { functionsContext } from "../Utils/Functions";
import { Web3WalletContext } from "../Utils/MetamaskConnect";
import { themeContext } from "../App";

const Autovault = () => {
  const { fetchAutoVaultAmount } = useContext(functionsContext);
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
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");

  const { accountAddress, useConnected } = useContext(Web3WalletContext);
  let AutoAMounts = 0;

  const fetchAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchAutoVaultAmount(accountAddress);

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      AutoAMounts += autoVaultAmountNumber;
      setAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setAutoVaultAmount("0");
    }
  };

  useEffect(() => {
    if (useConnected) {
      fetchAutoVaultAmounts();
    }
  });
  return (
    <div style={{ marginTop: "-1px" }}>
      <div className="hrp">
        <hr className="my-3 " />
      </div>
      <div className="d-flex pt-1">
        <div className="">
          <i
            className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
          ></i>{" "}
        </div>
        <div>
          <div
            className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme} `}
          >
            <div className={`${textTitle}  `}>
              <div className={`${textTitle}  `} style={{ marginLeft: "15px" }}>
                {" "}
                Autovault amount
              </div>{" "}
            </div>
          </div>
          <div
            className={`varSize ${spanDarkDim}`}
            style={{ marginLeft: "15px" }}
          >
            <span className={`spanText ${spanDarkDim} fs-5`}>
              {" "}
              <>$ {autoVaultAmount}</>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autovault;

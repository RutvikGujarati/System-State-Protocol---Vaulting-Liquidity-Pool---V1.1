import React, { useContext } from "react";
import Searchbar from "../../Components/SearchBar/Searchbar";
import RatioPriceTargets from "../PLSTracking/targets/Ratio Price Targets/RatioPriceTargets";
import IncrementPriceTarget from "../PLSTracking/targets/Increment Price Target/IncrementPriceTarget";
import DAV from "../bottom/dav";
import "./Style.css";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import TrackingPage from "../../Components/Tracker/TrackingPage";
import PLSTracking from "../PLSTracking/PLSTracking";
export default function PLS() {
    const { theme } = useContext(themeContext);

    return (
        <div className={`${theme === "lightTheme" && "light-bg-for-theme"}`}>
            <Searchbar />
            <PLSTracking />
            <div
                className={`p-0 pb-5 d-flex flex-row justify-content-around flex-wrap  ${(theme === "darkTheme" && " Theme-index-class") || (theme === "dimTheme" && "dimTheme-index-class") || "main-class-section"}`}
            >
                <div className="container-xxl position-relative d-flex flex-row justify-content-around flex-wrap posRel">
                    <div className="col-md-12 col-12 col-lg-6 col-sm-12 mb-sm-4 sec-1" >
                        <div className="container-fluid p-0">
                            <RatioPriceTargets />
                        </div>
                    </div>
                    <div className="col-md-12 col-12 col-lg-6 col-sm-12 mb-sm-4 sec-2">
                        <div className="container-fluid p-0">
                            <IncrementPriceTarget />
                        </div>
                    </div>
                </div>
                <DAV />
            </div>
        </div>
    );
}

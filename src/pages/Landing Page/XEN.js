import React, { useContext } from "react";
import Searchbar from "../../Components/SearchBar/Searchbar";

import DAV from "../bottom/dav";
import "./Style.css";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import XENTracking from "../XENTracking/XENTracking";
import RatioPriceTargetsXEN from "../XENTracking/targets/Ratio Price Targets/RatioPriceTargets";
import IncrementPriceTargetXEN from "../XENTracking/targets/Increment Price Target/IncrementPriceTarget";
export default function XEN() {
    const { theme } = useContext(themeContext);

    return (
        <div className={`${theme === "lightTheme" && "light-bg-for-theme"}`}>
            <Searchbar />
            <XENTracking />
            <div
                className={`p-0 pb-5 d-flex flex-row justify-content-around flex-wrap  ${(theme === "darkTheme" && " Theme-index-class") || (theme === "dimTheme" && "dimTheme-index-class") || "main-class-section"}`}
            >
                <div className="container-xxl position-relative d-flex flex-row justify-content-around flex-wrap posRel" >
                    <div className="col-md-12 col-12 col-lg-6 col-sm-12 mb-sm-4 sec-1" >
                        <div className="container-fluid p-0">
                            <RatioPriceTargetsXEN />
                        </div>
                    </div>
                    <div className="col-md-12 col-12 col-lg-6 col-sm-12 mb-sm-4 sec-2">
                        <div className="container-fluid p-0">
                            <IncrementPriceTargetXEN />
                        </div>
                    </div>
                </div>
                <DAV />
            </div>
        </div>
    );
}

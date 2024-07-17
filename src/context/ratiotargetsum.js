import React, { useContext, createContext, useState, useEffect } from 'react'
import {ethers} from 'ethers';
import functionsContext from '../Utils/Functions';
import Web3WalletContext from '../Utils/MetamaskConnect';

export const SumOfRatioTargets = createContext();
export const Ratiotargetsum = ({ children }) => {
    const {
        getDepositors,
        getRatioPriceTargets,
    } = useContext(functionsContext);
    const {
        accountAddress,
        currencyName,
        userConnected,
    } = useContext(Web3WalletContext);

    const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
    const [noOfPage, setNoOfPage] = useState(0);
    const [TotalSum, setTotalSummation] = useState("0");
    const [price, setPrice] = useState("0");
    const [totalSUm, setTotalSum] = useState("0");
    const [currentPage, setCurrentPage] = useState(1);

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
                Number(formattedTargetAmount).toFixed(22) + " " + currencyName ??
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
        const totalRTPPrice = TotalSum * price;

        console.log("price RTP", totalRTPPrice);
        setTotalSum(totalRTPPrice)
        return totalRTPPrice;
    };
    useEffect(() => {
        if (userConnected) {
            RatioPriceTargets();
            RTPpmultiplySumWithPrice();
        }
    });

    return (
        <SumOfRatioTargets.Provider value={{
            totalSUm
        }}>
            {children}
        </SumOfRatioTargets.Provider>
    )
}

export default Ratiotargetsum

import { BigNumber, Contract, Wallet, ethers } from 'ethers';
import { PSD_ADDRESS } from '../Utils/ADDRESSES/Addresses';
import { useEffect } from 'react';

export default function Backend() {
    const artifacts = {
        PSD_CONTRACT: require("../Utils/ABI/System-state-protocol-v1.1.json"),
    };
    const Provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER);
    const PSD_CONTRACT = new Contract(PSD_ADDRESS, artifacts.PSD_CONTRACT, Provider)


    let isAlreadyClicked_Escrow = false
    let isAlreadyClicked_Targets = false


    const getCurrentPrice = async () => {
        try {
            const current_price = await PSD_CONTRACT.connect(Provider).price()
            const formatted_Current_Price = Number(BigNumber.from(current_price || '0').toString())
            return formatted_Current_Price
        } catch (error) {

        }
    }


    const getDepositors = async () => {
        try {
            const depositors = await PSD_CONTRACT.connect(Provider).getDepositors()
            return depositors || []
        } catch (error) {

        }
    }

    const isAny_RPT_Achived = async (depositors, currentPrice) => {
        try {
            let is_ClaimEscrowByBackend_Call = false;
            const escrowData_RPT = []
            for (let index = 0; index < depositors.length; index++) {
                const address = depositors[index];
                const escrowTargets_RPT = await PSD_CONTRACT.connect(Provider).getEscrowDetails(address)
                escrowData_RPT.push(...escrowTargets_RPT || [])
            }

            for (let index = 0; index < escrowData_RPT.length; index++) {
                const priceTarget = escrowData_RPT[index].priceTarget;
                const priceTargetFormatted = Number(BigNumber.from(priceTarget).toString())
                if (currentPrice >= priceTargetFormatted) {
                    is_ClaimEscrowByBackend_Call = true
                }
            }

            return is_ClaimEscrowByBackend_Call;
        } catch (error) {

        }
    }

    const isAny_Target_IPT_Achived = async (depositors, currentPrice) => {
        try {
            let is_ClaimTargetsByBackend_Call = false;
            const targetsData_IPT = []
            for (let index = 0; index < depositors.length; index++) {
                const address = depositors[index];
                const Targets_RPT = await PSD_CONTRACT.connect(Provider).getTargets(address)
                targetsData_IPT.push(...Targets_RPT || [])
            }

            for (let index = 0; index < targetsData_IPT.length; index++) {
                const isClosed = targetsData_IPT[index].isClosed
                if (!isClosed) {
                    const price_target = targetsData_IPT[index].ratioPriceTarget;
                    const priceTargetFormatted = Number(BigNumber.from(price_target).toString())
                    if (currentPrice >= priceTargetFormatted) {
                        is_ClaimTargetsByBackend_Call = true
                    }
                }
            }
            return is_ClaimTargetsByBackend_Call
        } catch (error) {

        }

    }


    const main = async () => {

        const depositors = await getDepositors()
        const currentPrice = await getCurrentPrice()

        const isAny_rpt_achived = await isAny_RPT_Achived(depositors, currentPrice)
        console.log('isAny_rpt_achived:', isAny_rpt_achived);
        if (isAny_rpt_achived && !isAlreadyClicked_Escrow) {
            handle_Claim_Escrow_By_Backend(isAny_rpt_achived)
        }


        const isAny_IPT_Targets_Achived = await isAny_Target_IPT_Achived(depositors, currentPrice)
        console.log('isAny_IPT_Targets_Achived:', isAny_IPT_Targets_Achived);

        if (isAny_IPT_Targets_Achived && !isAlreadyClicked_Targets) {
            handle_Claim_Targets_By_Backend(isAny_IPT_Targets_Achived)
        }

    }


    const handle_Claim_Escrow_By_Backend = async (is_Achived) => {

        try {
            if (is_Achived && !isAlreadyClicked_Escrow) {
                isAlreadyClicked_Escrow = true
                const wallet = new Wallet(`0x${process.env.REACT_APP_SECRET_KEY}`)
                const signer = wallet.connect(Provider)
                const claim_Escrow_By_Backend_TX = await PSD_CONTRACT.connect(signer).claimEscrowByBackend()

                claim_Escrow_By_Backend_TX.wait()

                console.log('claim_Escrow_By_Backend_TX - ', claim_Escrow_By_Backend_TX);
                console.log('claim Escrow Transaction hash - ', claim_Escrow_By_Backend_TX.hash);
                isAlreadyClicked_Escrow = false

            }
        } catch (error) {
            isAlreadyClicked_Escrow = false
            console.error('handle_Claim_Escrow_By_Backend error::::::::::::: ', error);
        }
    }
    const handle_Claim_Targets_By_Backend = async (is_Achived) => {
        try {
            if (is_Achived && !isAlreadyClicked_Targets) {
                isAlreadyClicked_Targets = true
                const wallet = new Wallet(`0x${process.env.REACT_APP_SECRET_KEY}`)
                const signer = wallet.connect(Provider)
                const claim_Targets_By_Backend = await PSD_CONTRACT.connect(signer).claimTargetsByBackend()
                claim_Targets_By_Backend.wait()

                console.log('claim_Targets_By_Backend - ', claim_Targets_By_Backend);
                console.log('claim Targets Transaction hash - ', claim_Targets_By_Backend.hash);
                isAlreadyClicked_Targets = false
            }
        } catch (error) {
            isAlreadyClicked_Targets = false
            console.error('handle_Claim_Targets_By_Backend error::::::::::::: ', error);
        }
    }


    useEffect(() => {
        const intervalId = setInterval(() => {
            main().then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })

        }, 30000);

        return () => clearInterval(intervalId);
    }, [])

}

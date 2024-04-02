import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";
import SimpleInputField from "../InputFields/SimpleInputField";


const BankDetailTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: 'bank_account_no', title: 'BankAccountNo', placeholder: t("EnterBankAccountNo") },
                { name: 'bank_name', title: 'BankName', placeholder: t("EnterBankName") },
                { name: 'bank_holder_name', title: 'HolderName', placeholder: t("EnterHolderName") },
                { name: 'swift', title: 'Swift', placeholder: t("EnterSwift") },
                { name: 'ifsc', title: 'IFSC', placeholder: t("EnterIFSC") }]} />
        </>

    )
}

export default BankDetailTab
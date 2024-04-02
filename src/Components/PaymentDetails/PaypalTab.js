import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";
import SimpleInputField from "../InputFields/SimpleInputField";

const PaypalTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <SimpleInputField nameList={[
            { name: 'paypal_email', title: 'PaypalEmail', placeholder: t('EnterPaypalEmail') }
        ]} />
    )
}

export default PaypalTab
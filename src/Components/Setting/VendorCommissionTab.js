import React, { useContext } from 'react'
import SimpleInputField from '../InputFields/SimpleInputField'
import CheckBoxField from '../InputFields/CheckBoxField'
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const VendorCommissionTab = ({ values }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div>
            <CheckBoxField name="[values][vendor_commissions][status]" title="Status" />
            <SimpleInputField
                nameList={[
                    { name: "[values][vendor_commissions][min_withdraw_amount]", title: "MinWithdrawAmount", placeholder: t("EnterMinWithdrawAmount"), inputaddon: "true", helpertext: "*Payout Minimum for Vendors: Specify the min amount vendors can request for withdrawal." },
                    { name: "[values][vendor_commissions][default_commission_rate]", inputaddon: "true", postprefix: "%", title: "DefaultCommissionRate", placeholder: t("EnterDefaultCommissionRate"), helpertext: "*Set the rate at which admin receives a commission from vendor earnings." },
                ]}
            />
            <CheckBoxField name="[values][vendor_commissions][is_category_based_commission]" title="CategoryBasedCommission" helpertext="*Enable the functionality to apply commissions based on product categories. To configure, navigate to the Product Category module and set the respective commission rates." />
        </div>
    )
}
export default VendorCommissionTab
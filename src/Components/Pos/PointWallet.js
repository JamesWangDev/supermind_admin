import React, { useContext } from 'react'
import { Input, Label } from 'reactstrap'
import SettingContext from '../../Helper/SettingContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const PointWallet = ({ values, data, setFieldValue }) => {
    const { convertCurrency } = useContext(SettingContext)
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            {values['isPoint']?.balance > 0 && data?.data?.total?.convert_point_amount && <>
                <li>
                    <h4 className={`${values['points_amount'] ? "fw-bold txt-primary" : "text-muted"}`}>{t("Points")}</h4>
                    <h4 className={`${values['points_amount'] ? "price fw-bold txt-primary" : "price text-muted"}`}>{convertCurrency(data?.data?.total?.convert_point_amount || 0)}</h4>
                </li>
                <li className='border-cls'>
                    <Label className='form-check-label m-0'>{t("Wouldyouprefertopayusingpoints")}?</Label>
                    <Input type='checkbox' checked={values['points_amount'] ? true : false} className='checkbox_animated check-it' onChange={(e) => { setFieldValue("points_amount", !values['points_amount']) }} />
                </li>
            </>}
            {values['isWallet']?.balance > 0 && data?.data?.total?.convert_wallet_balance && <>
                <li>
                    <h4 className={`${values['wallet_balance'] ? "fw-bold txt-primary" : "text-muted"}`}>{t("WalletBalance")}</h4>
                    <h4 className={`${values['wallet_balance'] ? "price fw-bold txt-primary" : "price text-muted"}`}>{convertCurrency(data?.data?.total?.convert_wallet_balance || 0)}</h4>
                </li>
                <li className='border-cls'>
                    <Label className='form-check-label m-0'>{t("Wouldyouprefertopayusingwallet")}?</Label>
                    <Input type='checkbox' checked={values['wallet_balance'] ? true : false} className='checkbox_animated check-it' onChange={(e) => { setFieldValue("wallet_balance", !values['wallet_balance']) }} />
                </li>
            </>}
        </>
    )
}

export default PointWallet
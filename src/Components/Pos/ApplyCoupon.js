import React, { useContext, useState } from 'react'
import { Input } from 'reactstrap'
import Btn from '../../Elements/Buttons/Btn'
import Image from 'next/image'
import SettingContext from '../../Helper/SettingContext'
import { checkout } from '../../Utils/AxiosUtils/API'
import useCreate from '../../Utils/Hooks/useCreate'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'
import offerImg from '../../../public/assets/images/offer.gif'

const ApplyCoupon = ({ data, setFieldValue, storeCoupon, setStoreCoupon, values }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [errorCoupon, setErrorCoupon] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState(false)
    const { mutate, isLoading } = useCreate(checkout, false, false, 'No', (resDta) => {
        if (resDta?.status == 200 || resDta?.status == 201) {
            setErrorCoupon("")
            storeCoupon !== '' && setAppliedCoupon("applied")
        } else {
            setErrorCoupon(resDta?.response?.data?.message)
        }
    }, false);
    const { convertCurrency } = useContext(SettingContext)
    const onCouponApply = (value) => {
        setStoreCoupon(value)
    }
    const removeCoupon = () => {
        setAppliedCoupon(null)
        setFieldValue('coupon', '')
        setStoreCoupon('')
        mutate({ ...values })
    }
    return (
        <>
            {appliedCoupon == 'applied' ?
                <li className='coupon-sec'>
                    <div className='apply-sec mb-3'>
                        <div>
                            <Image src={offerImg} className='img-fluid' height={20} width={20} alt='apply'/>
                            <h4>{t("Yousaved")} <span>{convertCurrency(data?.data?.total?.coupon_total_discount)}</span> {("withthiscode")} 🎉 <p>{t("CouponApplied")}</p></h4>
                        </div>
                    </div>
                    <a href='#javascript' onClick={() => removeCoupon()}>{t("Remove")}</a>
                </li>
                :
                <li>
                    <div className='coupon-box mt-2 mb-3 d-flex w-100'>
                        <div className='input-group'>
                            <Input type='text' className='form-control' placeholder={t("EnterCoupon")} onChange={(e) => onCouponApply(e.target.value)} />
                            <Btn className="btn-apply" loading={Number(isLoading)} onClick={() => storeCoupon && mutate({ ...values, coupon: storeCoupon })}>{t("Apply")}</Btn>
                        </div>
                    </div>
                    <div className='invalid-feedback d-block'>{errorCoupon}</div>
                </li>
            }
        </>
    )
}

export default ApplyCoupon
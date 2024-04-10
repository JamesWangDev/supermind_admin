import React, { useContext } from 'react'
import CheckoutCard from './common/CheckoutCard'
import { Input, Label } from 'reactstrap'
import { RiBankCardLine } from 'react-icons/ri';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

function PaymentOptions({ values, setFieldValue }) {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <CheckoutCard icon={<RiBankCardLine />}>
            <div className="checkout-title">
                <h4>{t("PaymentOption")}</h4>
            </div>
            <div className="checkout-detail">
                <div className="accordion accordion-flush custom-accordion" id="accordionFlushExample">
                    {values['consumer_id'] ?
                        <div className="accordion-item">
                            <div className="accordion-header" id="flush-headingOne">
                                <div className="accordion-button">
                                    <div className="custom-form-check form-check mb-0">
                                        <Label className="form-check-label" htmlFor="credit">
                                            <Input className="form-check-input mt-0" type="radio" name="flexRadioDefault" id="credit" onClick={() => {
                                                setFieldValue('payment_method', "cod")
                                            }} />{t("CashOnDelivery")}
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="empty-box">
                            <h2>{t("NoPaymentOptionFound")}</h2>
                        </div>
                    }
                </div >
            </div >
        </CheckoutCard >
    )
}

export default PaymentOptions
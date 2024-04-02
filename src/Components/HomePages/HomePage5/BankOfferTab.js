import React, { useContext, useState } from 'react'
import CheckBoxField from '../../InputFields/CheckBoxField';
import { Col, Row } from 'reactstrap';
import SimpleInputField from '../../InputFields/SimpleInputField';
import Btn from '../../../Elements/Buttons/Btn';
import { RiArrowDownLine } from 'react-icons/ri';
import FileUploadField from '../../InputFields/FileUploadField';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const BankOfferTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['content']['bank_wallet_offers']['offers'].length > 1) {
            let filterValue = values['content']['bank_wallet_offers']['offers'].filter((item, i) => i !== index)
            setFieldValue("[content][bank_wallet_offers][offers]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.image_url && setFieldValue(`bankOfferImage${i}`, { original_url: elem?.image_url })
            })
        }
    }
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][bank_wallet_offers][title]`, placeholder: t("EnterTitle"), title: "Title" }
            ]} />
            <CheckBoxField name={`[content][bank_wallet_offers][status]`} title="Status" />
            <Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][bank_wallet_offers][offers]" || [], [...values['content']?.['bank_wallet_offers']?.['offers'], { title: "", description: "" }])} title="Add Offer" />
            {
                values['content']?.['bank_wallet_offers']?.['offers']?.map((elem, index) => {
                    return <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{"Offer"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`bankOfferImage${index}`} showImage={values[`bankOfferImage${index}`]} title='Image' id={`bankOfferImage${index}`} type="file" values={values} setFieldValue={setFieldValue} />
                                        <SimpleInputField nameList={[
                                            { name: `[content][bank_wallet_offers][offers][${index}][coupon_code]`, placeholder: t("EnterCouponCode"), title: "CouponCode" },
                                        ]} />
                                        <CheckBoxField name={`[content][bank_wallet_offers][offers][${index}][status]`} title="Status" />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer"
                                onClick={() => removeBanners(index)}>{t('Remove')}</a>
                        </Col>
                    </Row>
                })
            }
        </>
    )
}

export default BankOfferTab
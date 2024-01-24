import React, { useContext, useState } from 'react'
import { RiArrowDownLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import SimpleInputField from '../../InputFields/SimpleInputField';
import CheckBoxField from '../../InputFields/CheckBoxField';
import Btn from '../../../Elements/Buttons/Btn';
import FileUploadField from '../../InputFields/FileUploadField';
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import SearchableSelectInput from '../../InputFields/SearchableSelectInput';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const DealOfProductTabs = ({ setFieldValue, values, productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [active, setActive] = useState(0)
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][product_with_deals][deal_of_days][title]`, placeholder: t("EnterTitle"), title: "Title" }
            ]} />
            <FileUploadField name={"productDealsImage"} showImage={values['productDealsImage']} title='Image' id={'productDealsImage'} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('580x526px')} />
            <CheckBoxField name={`[content][product_with_deals][deal_of_days][status]`} title="Status" />
            <Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][product_with_deals][deal_of_days][deals]" || [], [...values['content']['product_with_deals']['deal_of_days']['deals'], { title: "", description: "" }])} title="AddDeal" />
            {
                values['content']?.['product_with_deals']?.['deal_of_days']?.['deals']?.map((elem, index) => {
                    return <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{values['content']['product_with_deals']['deal_of_days']['deals'][index]['label'] || 'Text Here'}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <SimpleInputField nameList={[
                                            { name: `[content][product_with_deals][deal_of_days][deals][${index}][label]`, placeholder: t("EnterLabel"), title: "Label" },
                                            { name: `[content][product_with_deals][deal_of_days][deals][${index}][offer_title]`, placeholder: t("EnterOfferTitle"), title: "OfferTitle" },
                                            { name: `[content][product_with_deals][deal_of_days][deals][${index}][end_date]`, type: "datetime-local", placeholder: t("EnterEndDate"), title: "EndDate" },
                                        ]} />
                                        <SearchableSelectInput
                                            nameList={
                                                [{
                                                    name: `DealOfDaysProduct${index}`,
                                                    title: "Products",
                                                    inputprops: {
                                                        name: `DealOfDaysProduct${index}`,
                                                        id: `DealOfDaysProduct${index}`,
                                                        options: productData || [],
                                                        setsearch: setSearch,
                                                    }
                                                },
                                                ]}
                                        />
                                        <CheckBoxField name={`[content][product_with_deals][deal_of_days][deals][${index}][status]`} title="Status" />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer"
                                onClick={() => values['content']['product_with_deals']['deal_of_days']['deals'].length > 1 && setFieldValue("[content][product_with_deals][deal_of_days][deals]", values['content']['product_with_deals']['deal_of_days']['deals'].filter((item, i) => i !== index),)}>{t('Remove')}</a>
                        </Col>
                    </Row>
                })
            }
        </>
    )
}

export default DealOfProductTabs
import React, { useContext, useState } from 'react'
import { Col, Row } from 'reactstrap'
import SimpleInputField from '../../InputFields/SimpleInputField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { RiArrowDownLine } from 'react-icons/ri'
import MultiSelectField from '../../InputFields/MultiSelectField'
import LeftSideBanner from './LeftSideBanner'
import SearchableSelectInput from '../../InputFields/SearchableSelectInput'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const LeftSidebar = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [active, setActive] = useState("1");
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <Row className='align-items-center'>
                <Col xs="10">
                    <CheckBoxField name={`[content][main_content][sidebar][status]`} title="Status" />
                    <div className='shipping-accordion-custom'>
                        <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(1)}>{values['content']?.['main_content']?.['sidebar']?.['categories_icon_list']?.['title']}<RiArrowDownLine />
                        </div>
                        {active == 1 && (
                            <div className="rule-edit-form">
                                <SimpleInputField nameList={[
                                    { name: `[content][main_content][sidebar][categories_icon_list][title]`, placeholder: t("EnterTitle"), title: "Title" }
                                ]} />
                                <MultiSelectField values={values} setFieldValue={setFieldValue} name='mainLeftCategory' title="Category" data={categoryData} />
                                <CheckBoxField name={`[content][main_content][sidebar][categories_icon_list][status]`} title="Status" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <LeftSideBanner values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            <Row className='align-items-center'>
                <Col xs="10">
                    <div className='shipping-accordion-custom'>
                        <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{values['content']?.['main_content']?.['sidebar']?.['sidebar_products']?.['title']}<RiArrowDownLine />
                        </div>
                        {active == 3 && (
                            <div className="rule-edit-form">
                                <SimpleInputField nameList={[
                                    { name: `[content][main_content][sidebar][sidebar_products][title]`, placeholder: t("EnterTitle"), title: "Title" }
                                ]} />
                                <SearchableSelectInput
                                    nameList={
                                        [
                                            {
                                                name: 'product_ids',
                                                title: "Products",
                                                inputprops: {
                                                    name: 'product_ids',
                                                    id: 'product_ids',
                                                    options: productData || [],
                                                    setsearch: setSearch,
                                                }
                                            },
                                        ]}
                                />
                                <CheckBoxField name={`[content][main_content][sidebar][sidebar_products][status]`} title="Status" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default LeftSidebar
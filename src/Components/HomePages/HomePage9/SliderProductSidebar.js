import React, { useContext, useState } from 'react'
import SimpleInputField from '../../InputFields/SimpleInputField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { RiArrowDownLine } from 'react-icons/ri'
import SliderProductSidebar2 from './SliderProductSidebar2'
import SearchableSelectInput from '../../InputFields/SearchableSelectInput'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const SliderProductSidebar = ({ values, setFieldValue, productData, setSearch }) => {
    const [active, setActive] = useState(0)
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[content][slider_product_with_banner][slider_products][status]" title="Status" />
            <h4 className="fw-semibold mb-3 txt-primary w-100">{t("ProductSlider")} </h4>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(1)}>{values['content']?.['slider_product_with_banner']?.['slider_products']?.['product_slider_1']?.['title'] || 'Text Here'}<RiArrowDownLine /></div>
                {active == 1 && (
                    <>
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[{ name: "[content][slider_product_with_banner][slider_products][product_slider_1][title]", placeholder: t("EnterTitle"), title: "Title" }]} />
                            <SearchableSelectInput
                                nameList={
                                    [{
                                        name: 'sliderProduct1',
                                        title: "Products",
                                        inputprops: {
                                            name: 'sliderProduct1',
                                            id: 'sliderProduct1',
                                            options: productData || [],
                                            setsearch: setSearch,
                                        }
                                    }]}
                            />
                            <CheckBoxField name="[content][slider_product_with_banner][slider_products][product_slider_1][status]" title="Status" />
                        </div>
                    </>
                )}
            </div>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(2)}>{values['content']?.['slider_product_with_banner']?.['slider_products']?.['product_slider_2']?.['title'] || 'Text Here'}<RiArrowDownLine /></div>
                {active == 2 && (
                    <>
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[{ name: "[content][slider_product_with_banner][slider_products][product_slider_2][title]", placeholder: t("EnterTitle"), title: "Title" }]} />
                            <SearchableSelectInput
                                nameList={
                                    [{
                                        name: 'sliderProduct2',
                                        title: "Products",
                                        inputprops: {
                                            name: 'sliderProduct2',
                                            id: 'sliderProduct2',
                                            options: productData || [],
                                            setsearch: setSearch,
                                        }
                                    }]}
                            />
                            <CheckBoxField name="[content][slider_product_with_banner][slider_products][product_slider_2][status]" title="Status" />
                        </div>
                    </>
                )}
            </div>
            <SliderProductSidebar2 values={values} setActive={setActive} active={active} productData={productData} setFieldValue={setFieldValue} setSearch={setSearch} />
        </>
    )
}

export default SliderProductSidebar
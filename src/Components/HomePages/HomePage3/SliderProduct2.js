import { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";
import { RiArrowDownLine } from "react-icons/ri";
import SimpleInputField from '../../InputFields/SimpleInputField';
import CheckBoxField from '../../InputFields/CheckBoxField';
import SearchableSelectInput from "../../InputFields/SearchableSelectInput";
import I18NextContext from "@/Helper/I18NextContext";

const SliderProduct2 = ({ setActive, active, values, description, productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{values['content']?.['slider_products']?.['product_slider_3']?.['title'] || "Text Here"}<RiArrowDownLine /></div>
                {active == 3 && (
                    <>
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[{ name: "[content][slider_products][product_slider_3][title]", placeholder: t("EnterTitle"), title: "Title" }
                            ]} />
                            <SearchableSelectInput
                                nameList={
                                    [{
                                        name: 'sliderProduct3',
                                        title: "Products",
                                        inputprops: {
                                            name: 'sliderProduct3',
                                            id: 'sliderProduct3',
                                            options: productData || [],
                                            setsearch: setSearch,
                                        }
                                    },
                                    ]}
                            />
                            <CheckBoxField name="[content][slider_products][product_slider_3][status]" title="Status" />
                        </div>
                    </>
                )}
            </div>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(4)}>{values['content']?.['slider_products']?.['product_slider_4']?.['title'] || "Text Here"}<RiArrowDownLine /></div>
                {active == 4 && (
                    <>
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[{ name: "[content][slider_products][product_slider_4][title]", placeholder: t("EnterTitle"), title: "Title" }
                            ]} />
                            <SearchableSelectInput
                                nameList={
                                    [{
                                        name: 'sliderProduct4',
                                        title: "Products",
                                        inputprops: {
                                            name: 'sliderProduct4',
                                            id: 'sliderProduct4',
                                            options: productData || [],
                                            setsearch: setSearch,
                                        }
                                    },
                                    ]}
                            />
                            <CheckBoxField name="[content][slider_products][product_slider_4][status]" title="Status" />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SliderProduct2
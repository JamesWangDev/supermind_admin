import React, { useContext, useState } from "react";
import CheckBoxField from "../../InputFields/CheckBoxField";
import SliderProduct1 from "./SliderProduct1";
import SliderProduct2 from "./SliderProduct2";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const SliderProductTab = ({ values, setFieldValue, description, productData, setSearch }) => {
    const [active, setActive] = useState(0)
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <h4 className="fw-semibold mb-3 txt-primary w-100">{t("ProductSlider")} </h4>
            <CheckBoxField name={`[content][slider_products][status]`} title="Status" />
            <SliderProduct1 active={active} setActive={setActive} values={values} productData={productData} setSearch={setSearch} setFieldValue={setFieldValue} />
            <SliderProduct2 active={active} setActive={setActive} values={values} description={description} productData={productData} setSearch={setSearch} setFieldValue={setFieldValue} />
        </>
    )
}
export default SliderProductTab
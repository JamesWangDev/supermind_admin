import React, { useState } from 'react'
import RightSection1 from './RightSection1'
import RightSection2 from './RightSection2'
import RightSection3 from './RightSection3'
import RightSection4 from './RightSection4'
import RightSection5 from './RightSection5'
import RightSection6 from './RightSection6'
import RightSection7 from './RightSection7'
import RightSection8 from './RightSection8'
import RightSection9 from './RightSection9'

const RightContent = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [active, setActive] = useState(1)
    return (
        <>
            <RightSection1 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} setSearch={setSearch} />
            <RightSection2 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} />
            <RightSection3 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            <RightSection4 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} setSearch={setSearch} />
            <RightSection5 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} />
            <RightSection6 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            <RightSection7 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} setSearch={setSearch} />
            <RightSection8 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            <RightSection9 values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} />
        </>
    )
}

export default RightContent
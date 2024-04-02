import React, { useContext } from 'react'
import TextLimit from '../../Utils/CustomFunctions/TextLimit'
import SettingContext from '../../Helper/SettingContext'

const RightVariationModal = ({ cloneVariation }) => {
    const { convertCurrency } = useContext(SettingContext)
    return (
        <>
            <h4 className="title-name">{cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.name : cloneVariation?.product?.name}</h4>
            <h4 className="price">{cloneVariation?.selectedVariation ? convertCurrency(cloneVariation?.selectedVariation?.sale_price) : convertCurrency(cloneVariation?.product?.sale_price)}</h4>
            <div className="mt-2" >
                <TextLimit value={cloneVariation?.product?.description} maxLength={200} />
            </div>
        </>
    )
}

export default RightVariationModal
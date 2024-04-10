import React from 'react'
import Btn from '../../Elements/Buttons/Btn'
import { RiAddLine, RiSubtractLine } from 'react-icons/ri'
import { Input } from 'reactstrap'

const VariationModalQty = ({ cloneVariation, setCloneVariation, checkStockAvailable }) => {
    const updateQuantity = (qty) => {
        if (1 > cloneVariation.productQty + qty) return;

        setCloneVariation({ ...cloneVariation, productQty: cloneVariation.productQty + qty })
        checkStockAvailable();
    }
    return (
        <div className="qty-box cart_qty">
            <div className="input-group">
                <Btn type="button" className="btn qty-left-minus" onClick={() => updateQuantity(-1)}>
                    <RiSubtractLine />
                </Btn>
                <Input className="form-control input-number qty-input" type="text" name="quantity" value={cloneVariation.productQty} readOnly={true} />
                <Btn type="button" className="btn qty-right-plus" onClick={() => updateQuantity(1)}>
                    <RiAddLine />
                </Btn>
            </div>
        </div>
    )
}

export default VariationModalQty
import React, { useReducer, useState } from 'react'
import CreateCartContext from '.'
import { CartReducer } from '../../Utils/AllReducers'

const CartProvider = (props) => {
    const [state, dispatch] = useReducer(CartReducer, { products: {} })
    const [cartData, setCartData] = useState([])
    return (
        <CreateCartContext.Provider value={{
            ...props, state, dispatch, cartData, setCartData
        }}>
            {props.children}
        </CreateCartContext.Provider>
    )
}

export default CartProvider
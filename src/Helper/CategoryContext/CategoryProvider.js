import { useState } from 'react'
import CategoryContext from '.'

const CategoryProvider = (props) => {
    const [categoryState, setCategoryState] = useState([])
    return (
        <CategoryContext.Provider value={{ ...props, categoryState, setCategoryState }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider
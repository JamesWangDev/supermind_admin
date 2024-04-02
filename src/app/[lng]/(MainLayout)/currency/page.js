'use client'
import { useState } from "react";
import { Col } from "reactstrap";
import AllCurrency from "@/Components/Currency/AllCurrency";
import { currency } from "@/Utils/AxiosUtils/API";

const Currency = () => {
    const [isCheck, setIsCheck] = useState([]);
    return (
        <Col sm="12">
            <AllCurrency url={currency} moduleName="Currency" isCheck={isCheck} setIsCheck={setIsCheck} />
        </Col>
    )
}

export default Currency
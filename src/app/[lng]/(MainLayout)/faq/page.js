'use client'
import { FaqAPI } from "@/Utils/AxiosUtils/API";
import { useState } from "react";
import { Col } from "reactstrap";
import AllFaqTable from "@/Components/Faq/index";

const FaqComponent = () => {
    const [isCheck, setIsCheck] = useState([]);
    return (
        <Col sm="12">
            <AllFaqTable url={FaqAPI} moduleName="Faq" isCheck={isCheck} setIsCheck={setIsCheck} />
        </Col>
    )
}
export default FaqComponent

'use client'
import AllTax from "@/Components/Tax/AllTax";
import { tax } from "@/Utils/AxiosUtils/API";
import { useState } from "react";
import { Col } from "reactstrap";

const AllRoles = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllTax url={tax} moduleName="Tax" isCheck={isCheck} setIsCheck={setIsCheck} />
    </Col>
  );
};

export default AllRoles;

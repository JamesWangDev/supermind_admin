'use client'
import React, { useState } from "react";
import { Col } from "reactstrap";
import AllOrdersTable from "@/Components/Orders/AllOrdersTable";
import { OrderAPI } from "@/Utils/AxiosUtils/API";

const Order = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllOrdersTable url={OrderAPI} dateRange={true} moduleName="Order" isCheck={isCheck} setIsCheck={setIsCheck} />
    </Col>
  )
};

export default Order;

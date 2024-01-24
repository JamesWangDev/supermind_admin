"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import AllProductTable from "@/Components/Product/AllProductTable";
import { product } from "@/Utils/AxiosUtils/API";

const AllUsers = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllProductTable
        url={product}
        moduleName="Product"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        isReplicate={{ title: "Duplicate", replicateAPI: "replicate" }}
      />
    </Col>
  );
};

export default AllUsers;

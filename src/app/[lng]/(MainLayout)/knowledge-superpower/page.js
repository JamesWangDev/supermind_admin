"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import AllSuperpowerTable from "@/Components/Superpower/AllSuperpowerTable";
import { superpower } from "@/Utils/AxiosUtils/API";

const AllUsers = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllSuperpowerTable
        url={superpower}
        moduleName="Superpower"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        isReplicate={{ title: "Duplicate", replicateAPI: "replicate" }}
      />
    </Col>
  );
};

export default AllUsers;

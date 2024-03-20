"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import AllActionSuperpowerTable from "@/Components/Superpower/ActionSuperpower/AllActionSuperpowerTable";
import { ActionSuperpowerAPI } from "@/Utils/AxiosUtils/API";

const AllUsers = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllActionSuperpowerTable
        url={ActionSuperpowerAPI}
        moduleName="Action-Superpower"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        isReplicate={{ title: "Duplicate", replicateAPI: "replicate" }}
      />
    </Col>
  );
};

export default AllUsers;

"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import AllUISuperpowerTable from "@/Components/Superpower/UISuperpower/AllUISuperpowerTable";
import { UISuperpowerAPI } from "@/Utils/AxiosUtils/API";

const AllUsers = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllUISuperpowerTable
        url={UISuperpowerAPI}
        moduleName="Ui-Superpower"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        isReplicate={{ title: "Duplicate", replicateAPI: "replicate" }}
      />
    </Col>
  );
};

export default AllUsers;

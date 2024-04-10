"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import AllActionsTable from "@/Components/Superpower/ActionSuperpower/AllActionsTable";

const AllActions = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllActionsTable
        url={"http://134.209.37.239:3010/getDescriptions"}
        moduleName="Actions"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        isReplicate={{ title: "Duplicate", replicateAPI: "replicate" }}
      />
    </Col>
  );
};

export default AllActions;

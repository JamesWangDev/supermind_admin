"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import AllProceduresTable from "@/Components/Superpower/ProcedureSuperPower/AllProceduresTable";

const AllProcedures = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllProceduresTable
        url={"https://134.209.37.239/nodeapi/getProcedures"}
        moduleName="Actions"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        isReplicate={{ title: "Duplicate", replicateAPI: "replicate" }}
      />
    </Col>
  );
};

export default AllProcedures;

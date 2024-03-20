"use client";
import { useState } from "react";
import { Col } from "reactstrap";
import AllKnowledgeSuperpowerTable from "@/Components/Superpower/KnowledgeSuperpower/AllKnowledgeSuperpowerTable";
import { KnowledgeSuperpowerAPI } from "@/Utils/AxiosUtils/API";

const AllUsers = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllKnowledgeSuperpowerTable
        url={KnowledgeSuperpowerAPI}
        moduleName="Knowledge-Superpower"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        isReplicate={{ title: "Duplicate", replicateAPI: "replicate" }}
      />
    </Col>
  );
};

export default AllUsers;

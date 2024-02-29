"use client";
import React, { useState } from "react";
import { Col } from "reactstrap";
import PromptTable from "@/Components/Prompt/PromptTable";
import { PromptExportAPI, PromptImportAPI, prompt } from "@/Utils/AxiosUtils/API";

const AllPrompts = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <PromptTable
        url={prompt}
        moduleName="Prompt"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        importExport={{ importUrl: PromptImportAPI, exportUrl: PromptExportAPI}}
      />
    </Col>
  );
};

export default AllPrompts;

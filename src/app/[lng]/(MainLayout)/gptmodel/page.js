"use client";
import React, { useState } from "react";
import { Col } from "reactstrap";
import GptmodelTable from "@/Components/Gptmodel/GptmodelTable";
import { gptmodelExportAPI, gptmodelImportAPI, gptmodel } from "@/Utils/AxiosUtils/API";

const AllGptModels = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <GptmodelTable
        url={gptmodel}
        moduleName="gptmodel"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        importExport={{ importUrl: gptmodelImportAPI, exportUrl: gptmodelExportAPI}}
      />
    </Col>
  );
};

export default AllGptModels;

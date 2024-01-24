"use client";
import React, { useState } from "react";
import { Col } from "reactstrap";
import AttributesTable from "@/Components/Attribute/AttributesTable";
import { AttributeExportAPI, AttributeImportAPI, attribute } from "@/Utils/AxiosUtils/API";

const AllAttributes = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AttributesTable
        url={attribute}
        moduleName="Attribute"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        importExport={{ importUrl: AttributeImportAPI, exportUrl: AttributeExportAPI}}
      />
    </Col>
  );
};

export default AllAttributes;

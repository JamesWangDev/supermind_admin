'use client'
import React, { useState } from "react";
import { Col } from "reactstrap";
import AllTagsTable from "@/Components/Tag/AllTagsTable";
import { tag } from "@/Utils/AxiosUtils/API";

const AllTags = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllTagsTable url={tag} moduleName="Tag" isCheck={isCheck} setIsCheck={setIsCheck} type={"post"} />
    </Col>
  );
};

export default AllTags;

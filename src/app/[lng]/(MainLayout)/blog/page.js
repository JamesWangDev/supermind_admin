'use client'

import AllBlogsTable from "@/Components/Blog/AllBlogsTable";
import { blog } from "@/Utils/AxiosUtils/API";
import { useState } from "react";
import { Col } from "reactstrap";

const AllBlogs = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllBlogsTable url={blog} moduleName="Blog" isCheck={isCheck} setIsCheck={setIsCheck} />
    </Col>
  );
};

export default AllBlogs;

"use client"
import React, { useState } from "react";
import { Col } from "reactstrap";
import { QuestionNAnswerAPI } from "@/Utils/AxiosUtils/API";
import QnATable from "@/Components/Q&A/QnATable";

const QuestionAndAnswer = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <QnATable
        url={QuestionNAnswerAPI}
        moduleName="Q&A"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        keyInPermission={"question_and_answer"}
      />
    </Col>
  );
};

export default QuestionAndAnswer;

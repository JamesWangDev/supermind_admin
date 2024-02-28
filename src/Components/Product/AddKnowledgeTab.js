import React, { useContext, useEffect, useState } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import ChatEngine from "./ChatEngine";
import FileUpload from "./FileUpload";
import { Row } from "reactstrap";

const AddKnowledgeTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  return (
    <>
      <Row sm={9}>
          <FileUpload />
      </Row>
      <Row sm={9}>
        <ChatEngine />
      </Row>
    </>
  );
};

export default AddKnowledgeTab;

import React, { useContext, useEffect, useState } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import ChatEngine from "./ChatEngine";
import FileUpload from "./FileUpload";
import AccountContext from "../../Helper/AccountContext";
import { Row } from "reactstrap";

const AddKnowledgeTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { accountData } = useContext(AccountContext)
  const { t } = useTranslation(i18Lang, 'common');
  const [appState, setAppState] = useState('upload')

  return (
    <>
      {appState === "upload" && <FileUpload />}
      {appState === "chat" && <ChatEngine />}
    </>
  );
};

export default AddKnowledgeTab;

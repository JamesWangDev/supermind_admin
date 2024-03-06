import React, { useContext, useEffect, useState } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import ChatEngine from "./ChatEngine";
import FileUpload from "./FileUpload";
import AccountContext from "../../Helper/AccountContext";

const AddKnowledgeTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { accountData } = useContext(AccountContext)
  const { t } = useTranslation(i18Lang, 'common');
  const [appState, setAppState] = useState('upload')
  const [disableSummary, setDisableSummary] = useState(true)
  const [partitions, setPartitions] = useState([])

  useEffect(() => {
    // if (accountData && accountData.id) {
        fetch(`https://supermind-n396.onrender.com/partitions/1`)
            .then(resp => resp.json())
            .then(data => setPartitions(data))
    // }
}, [])

  return (
    <>
      <div className="knowledge-tab-navigation">
        <div className="kb-tab" onClick={() => setAppState("upload")}>Upload a File</div>
        <div>———</div>
        <div className={`kb-tab${disableSummary ? '-disabled' : ''}`} onClick={() => disableSummary ? {} : setAppState("summary")}>Review Summary</div>
        <div>———</div>
        <div className="kb-tab" onClick={() => setAppState("chat")}>Chat!</div>
      </div>
      {appState === "upload" && <FileUpload partitions={partitions} />}
      {appState === "chat" && <ChatEngine partitions={partitions} />}
    </>
  );
};

export default AddKnowledgeTab;

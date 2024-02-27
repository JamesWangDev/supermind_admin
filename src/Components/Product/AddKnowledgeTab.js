import React, { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const AddKnowledgeTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      Add Knowledge tool here
    </>
  );
};

export default AddKnowledgeTab;

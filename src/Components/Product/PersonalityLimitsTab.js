import React, { useContext, useEffect, useMemo, useState } from "react";
import SimpleInputField from "../InputFields/SimpleInputField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import DescriptionInput from "./DescriptionInput";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const PersonalityLimitsTab = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext);

  return (
    <>
      <SimpleInputField nameList={[{ name: "personality_desc", require: "true", title: "Describe Personality of your SuperMind", type: "textarea", rows: 3, placeholder: t("Describe Personality of your SuperMind"), helpertext: "" }]} />
      <SearchableSelectInput
        nameList={[
          {
            name: "response_length",
            title: "Length of Responses",
            require: "true",
            inputprops: {
              name: "res_length",
              id: "res_length",
              options: [],
            },
          },
        ]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "use_users_name",
            title: "Use Users Name ?",
            require: "true",
            inputprops: {
              name: "users_name",
              id: "users_name",
              options: [],
            },
          },
        ]}
      />
      <SimpleInputField nameList={[{
        name: "conversation_limits", placeholder: t("Enter the Conversation Limits"), title: "Conversation Limits", helpertext: ""
      }]} />
      <SearchableSelectInput
        nameList={[
          {
            name: "is_sync_task_handling",
            title: "A Synchronous Task Handling?",
            require: "true",
            inputprops: {
              name: "sync_task",
              id: "sync_task",
              options: [],
            },
          },
        ]}
      />
    </>
  );
};

export default PersonalityLimitsTab;

import React, { useContext, useState } from "react";
import SimpleInputField from "../InputFields/SimpleInputField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import CheckBoxField from "../InputFields/CheckBoxField";
import Btn from "@/Elements/Buttons/Btn";
import { OpenAIStream } from "@/Utils/OpenAIStream";
import { ChatGPTAPI } from "@/Utils/AxiosUtils/API";

const resLengthOptions = [
  {
    name: "long",
    id: "long"
  },
  {
    name: "normal",
    id: "normal"
  },
  {
    name: "short",
    id: "short"
  },
]

const PersonalityLimitsTab = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext);
  const [isLoading, setIsLoading] = useState(false);

  const generatePrompt = () => {
    if(!values['personality_desc']) {
      alert("Please enter description of your personality...")
      return;
    }

    setIsLoading(true)

    const prompts = [
      {role: "user", content: "You are a prompt writing LLM. You write prompts to cause other LLMs to behave in particular ways. Use the following guidelines to create a prompt that forces another LLM to behave according to these guidelines. Make sure to cover 'personality' ' response length' 'users name' and 'topic limits' in your prompt."},
      {role: "user", content: `Personality: ${values['personality_desc']}`},
      {role: "user", content: `Response length: ${values['res_length']}`},
      {role: "user", content: `Users name: ${values['is_use_username'] ? "yes" : "no"}`},
      {role: "user", content: `Topic limits: ${values['conversation_limits']}`},
    ]

    OpenAIStream(prompts, "gpt-4-turbo-preview", ChatGPTAPI, process.env.OPENAI_API_KEY)
      .then(response => {
          setFieldValue("llm_prompt", response)
          setIsLoading(false)
      })
      .catch(error => {
          alert("Error while fetching from API!")
          setIsLoading(false)
    })
  }

  return (
    <>
      <SimpleInputField nameList={[{ name: "personality_desc", require: "true", title: "Describe Personality of your SuperMind", type: "textarea", rows: 3, placeholder: t("Describe Personality of your SuperMind"), helpertext: "" }]} />
      <SearchableSelectInput
        nameList={[
          {
            name: "res_length",
            title: "Length of Responses",
            require: "true",
            inputprops: {
              name: "res_length",
              id: "res_length",
              options: resLengthOptions,
            },
          },
        ]}
      />
      {/* <SearchableSelectInput
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
      /> */}
      <CheckBoxField name="is_use_username" title="Use Users Name ?" />
      <SimpleInputField nameList={[
        {name: "conversation_limits", type: "number", placeholder: t("Enter the Conversation Limits"), title: "Conversation Limits", helpertext: ""},
        { name: "llm_prompt", require: "false", title: "Generated Prompt from your personality", type: "textarea", rows: 7, placeholder: t("Generated Prompt from your personality. But you can edit it as you need."), helpertext: "" }
      ]} />
      {/* <SearchableSelectInput
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
      /> */}
      <div className="w-100 d-flex justify-content-end">
        <Btn
          title="Generate Prompt"
          className="justify-content-center"
          onClick={generatePrompt}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default PersonalityLimitsTab;

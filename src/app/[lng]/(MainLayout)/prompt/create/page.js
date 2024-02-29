"use client";
import React, { useContext } from "react";
import PromptForm from "@/Components/Prompt/PromptForm";
import { prompt } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";
import I18NextContext from "@/Helper/I18NextContext";

const PromptCreate = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mutate, isLoading } = useCreate(
    prompt,
    false,
    `/${i18Lang}/prompt`
  );
  return (
    <FormWrapper title="AddPrompt">
      <PromptForm mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default PromptCreate;

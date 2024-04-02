"use client";
import React, { useContext } from "react";
import GptmodelForm from "@/Components/Gptmodel/GptmodelForm";
import { gptmodel } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";
import I18NextContext from "@/Helper/I18NextContext";

const GptModelCreate = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mutate, isLoading } = useCreate(
    gptmodel,
    false,
    `/${i18Lang}/gptmodel`
  );
  return (
    <FormWrapper title="AddCustomModel">
      <GptmodelForm mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default GptModelCreate;
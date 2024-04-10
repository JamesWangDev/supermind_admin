"use client";
import React, { useContext } from "react";
import AttributeForm from "@/Components/Attribute/AttributeForm";
import { attribute } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";
import I18NextContext from "@/Helper/I18NextContext";

const AttributeCreate = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mutate, isLoading } = useCreate(
    attribute,
    false,
    `/${i18Lang}/attribute`
  );
  return (
    <FormWrapper title="AddAttribute">
      <AttributeForm mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default AttributeCreate;

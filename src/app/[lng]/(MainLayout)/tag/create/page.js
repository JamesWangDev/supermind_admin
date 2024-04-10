"use client";
import React, { useContext } from "react";
import TagForm from "@/Components/Tag/TagForm";
import { tag } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";
import I18NextContext from "@/Helper/I18NextContext";

const TagsCreate = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mutate, isLoading } = useCreate(tag, false, `/${i18Lang}/tag`);
  return (
    <FormWrapper title="AddTag">
      <TagForm loading={isLoading} mutate={mutate} type={"product"} />
    </FormWrapper>
  );
};

export default TagsCreate;

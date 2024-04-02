"use client";
import GptmodelForm from "@/Components/Gptmodel/GptmodelForm";
import I18NextContext from "@/Helper/I18NextContext";
import { gptmodel } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { useContext } from "react";

const UpdateGptModel = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);

  const { mutate, isLoading } = useUpdate(gptmodel,params?.updateId,`/${i18Lang}/gptmodel`);
  return (
    params?.updateId && (
      <FormWrapper title="UpdateCustomModel">
        <GptmodelForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
        />
      </FormWrapper>
    )
  );
};

export default UpdateGptModel;

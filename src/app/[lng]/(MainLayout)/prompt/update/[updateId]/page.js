"use client";
import PromptForm from "@/Components/Prompt/PromptForm";
import I18NextContext from "@/Helper/I18NextContext";
import { prompt } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { useContext } from "react";

const UpdatePrompt = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);

  const { mutate, isLoading } = useUpdate(prompt,params?.updateId,`/${i18Lang}/prompt`);
  return (
    params?.updateId && (
      <FormWrapper title="UpdatePrompt">
        <PromptForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
        />
      </FormWrapper>
    )
  );
};

export default UpdatePrompt;

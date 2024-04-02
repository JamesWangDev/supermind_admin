"use client";
import AttributeForm from "@/Components/Attribute/AttributeForm";
import I18NextContext from "@/Helper/I18NextContext";
import { attribute } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { useContext } from "react";

const UpdateAttributes = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);

  const { mutate, isLoading } = useUpdate(attribute,params?.updateId,`/${i18Lang}/attribute`);
  return (
    params?.updateId && (
      <FormWrapper title="UpdateAttribute">
        <AttributeForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
        />
      </FormWrapper>
    )
  );
};

export default UpdateAttributes;

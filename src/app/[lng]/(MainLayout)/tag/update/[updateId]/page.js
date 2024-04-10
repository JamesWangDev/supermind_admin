"use client";

import TagForm from "@/Components/Tag/TagForm";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { tag } from "@/Utils/AxiosUtils/API";
import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";

const RoleUpdate = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { mutate, isLoading } = useUpdate(tag, params?.updateId, `/${i18Lang}/tag`);
  return (
    params?.updateId && (
      <FormWrapper title="UpdateTag">
        <TagForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
          type={"product"}
        />
      </FormWrapper>
    )
  );
};

export default RoleUpdate;

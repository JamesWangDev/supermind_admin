"use client";
import PermissionForm from "@/Components/Role/PermissionForm";
import I18NextContext from "@/Helper/I18NextContext";
import { role } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";

import useCreate from "@/Utils/Hooks/useCreate";
import { useContext } from "react";

const Role = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mutate, isLoading } = useCreate(role, false, `/${i18Lang}/role`);
  return (
    <FormWrapper title="AddRole">
      <PermissionForm mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default Role;

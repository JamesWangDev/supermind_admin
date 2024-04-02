"use client";
import I18NextContext from "@/Helper/I18NextContext";
import React, { useContext } from "react";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { user } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import UserForm from "@/Components/User/UserForm";

const UserUpdate = ({ params }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { mutate, isLoading } = useUpdate(
    user,
    params?.updateId,
    `/${i18Lang}/user`,
    "user updated successfully"
  );
  return (
    params?.updateId && (
      <FormWrapper title="UpdateUser">
        <UserForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
        />
      </FormWrapper>
    )
  );
};

export default UserUpdate;

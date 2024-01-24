"use client";

import UserForm from "@/Components/User/UserForm";
import I18NextContext from "@/Helper/I18NextContext";
import { user } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";
import { useContext } from "react";

const AddNewUser = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mutate, isLoading } = useCreate(user, false, `/${i18Lang}/user`);
  return (
    <FormWrapper title="AddUser">
      <UserForm mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default AddNewUser;

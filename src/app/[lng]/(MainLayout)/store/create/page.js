'use client'
import StoreForm from "@/Components/Store/StoreForm";
import { store } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const StoreCreate = () => {
  const { mutate, isLoading } = useCreate(store, false, "/store");
  return (
    <FormWrapper title="AddStore">
      <StoreForm mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default StoreCreate;

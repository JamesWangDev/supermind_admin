'use client'

import StoreForm from "@/Components/Store/StoreForm";
import { store } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const StoreUpdate = ({ params }) => {
  const { mutate, isLoading } = useCreate(store, params?.updateId, "/store");
  return (
    params?.updateId && (
      <FormWrapper title="UpdateStore">
        <StoreForm mutate={mutate} updateId={params?.updateId} loading={isLoading} />
      </FormWrapper>
    )
  );
};

export default StoreUpdate;

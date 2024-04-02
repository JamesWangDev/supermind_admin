'use client'
import TaxForm from "@/Components/Tax/TaxForm";
import { tax } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const TaxCreate = () => {
  const { mutate, isLoading } = useCreate(tax, false, "/tax");
  return (
    <FormWrapper title="AddTax">
      <TaxForm loading={isLoading} mutate={mutate} />
    </FormWrapper>
  );
};

export default TaxCreate;

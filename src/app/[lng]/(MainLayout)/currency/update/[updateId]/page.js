'use client'
import CurrencyForm from "@/Components/Currency/CurrencyForm";
import { currency } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";

const UpdateCurrency = ({ params }) => {
    const { mutate, isLoading } = useUpdate(currency, params?.updateId, currency, "Currency updated successfully");
    return (
        params?.updateId && (
            <FormWrapper title="Update Currency">
                <CurrencyForm mutate={mutate} updateId={params?.updateId} loading={isLoading} />
            </FormWrapper>
        )
    )
}

export default UpdateCurrency
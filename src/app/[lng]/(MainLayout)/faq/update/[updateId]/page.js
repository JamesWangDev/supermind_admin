'use client'
import FaqForm from "@/Components/Faq/FaqForm";
import { FaqAPI } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";

const UpdateFaq = ({ params }) => {
    const { mutate, isLoading } = useUpdate(FaqAPI, params?.updateId, FaqAPI);
    return (
        params?.updateId && (
            <FormWrapper title="Update Faq">
                <FaqForm mutate={mutate} loading={isLoading} updateId={params?.updateId} />
            </FormWrapper>
        )
    )
}

export default UpdateFaq
"use client"

import AccountForm from "@/Components/Account"
import FormWrapper from "@/Utils/HOC/FormWrapper"

const Account = () => {
    return (
        <FormWrapper title="MyAccount">
            <AccountForm />
        </FormWrapper>
    )
}

export default Account
import React, { useContext } from 'react'
import SimpleInputField from '../InputFields/SimpleInputField'
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';


const UserPassword = ({ updateId }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            {!updateId && (
                <>
                    <SimpleInputField
                        nameList={[
                            { name: "password", type: "password", placeholder: t("EnterPassword"), require: 'true' },
                            { name: "password_confirmation", title: "ConfirmPassword", type: "password", placeholder: t("Re-EnterPassword"), require: 'true' },
                        ]}
                    />
                </>
            )}
        </>
    )
}

export default UserPassword
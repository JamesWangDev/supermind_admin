import React, { useContext } from 'react'
import { useTranslation } from '@/app/i18n/client'
import I18NextContext from '@/Helper/I18NextContext'
import SimpleInputField from '../InputFields/SimpleInputField';
import SearchableSelectInput from '../InputFields/SearchableSelectInput';
import { AllCountryCode } from '@/Data/AllCountryCode';

const StoreVendor = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: "name", placeholder: t("EnterName"), require: "true" }, { name: "email", placeholder: t("EnterEmail"), title: "EmailAddress", require: "true" }]} />
            <div className='country-input mb-4'>
                <SimpleInputField nameList={[{ name: "phone", title: "Phone", placeholder: t("EnterPhone"), require: "true", type: 'number' }]} />

                <SearchableSelectInput
                    nameList={[
                        {
                            name: "country_code",
                            notitle: "true",
                            inputprops: {
                                name: "country_code",
                                id: "country_code",
                                options: AllCountryCode,
                            },
                        },
                    ]}
                />
            </div>
        </>
    )
}

export default StoreVendor
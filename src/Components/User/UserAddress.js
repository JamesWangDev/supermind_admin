import { useQuery } from '@tanstack/react-query'
import request from '../../Utils/AxiosUtils'
import { country } from '../../Utils/AxiosUtils/API'
import CheckBoxField from '../InputFields/CheckBoxField'
import SearchableSelectInput from '../InputFields/SearchableSelectInput'
import SimpleInputField from '../InputFields/SimpleInputField'
import { useContext } from 'react'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const UserAddress = ({ addAddress, type }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data } = useQuery([country], () => request({ url: country }), { enabled: addAddress ? true : false, refetchOnWindowFocus: false, select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })) });
    return (
        <>
            {addAddress && (
                <>
                    <SimpleInputField nameList={[{ name: "address[0][title]", placeholder: t("EnterTitle"), title: "Title" }, { name: "address[0][street]", placeholder: "Enter Street", title: "Street" }]} />
                    {!type && (
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "address[0][type]",
                                    inputprops: {
                                        name: "address[0][type]",
                                        id: "address[0][type]",
                                        options: [
                                            { id: "billing", name: "Billing" },
                                            { id: "shipping", name: "Shipping" },
                                        ],
                                        defaultOption: "Select state",
                                    },
                                },
                            ]}
                        />
                    )}
                    <SimpleInputField nameList={[{ name: "address[0][city]", title: "City" }]} />
                    <SearchableSelectInput
                        nameList={[
                            {
                                name: "address[0][country_id]", title: "Country",
                                inputprops: {
                                    name: "address[0][country_id]",
                                    id: "address[0][country_id]",
                                    options: data,
                                    defaultOption: "Select state",
                                },
                            },
                            {
                                name: "address[0][state_id]", title: "State",
                                inputprops: {
                                    name: "address[0][state_id]",
                                    id: "address[0][state_id]",
                                    options: values?.["address"][0]?.["country_id"] ? data.filter((country) => Number(country.id) === Number(values?.["address"][0]?.["country_id"]))?.[0]?.["state"] : [],
                                    defaultOption: "Select state",
                                },
                                disabled: values?.["address"][0]?.["country_id"] ? false : true,
                            },
                        ]}
                    />
                    <SimpleInputField nameList={[{ name: "address[0][pincode]", title: "Pincode" }, { name: "phone", type: "number", placeholder: "Enter Phone Number" }]} />
                    <CheckBoxField name="address[0][is_default]" title="Is_Default" />
                </>
            )}
        </>
    )
}

export default UserAddress
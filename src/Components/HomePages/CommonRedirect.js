import { redirectOptions } from '../../Data/TabTitleListData'
import SearchableSelectInput from '../InputFields/SearchableSelectInput'
import SimpleInputField from '../InputFields/SimpleInputField'
import MultiSelectField from '../InputFields/MultiSelectField';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CommonRedirect = ({ values, setFieldValue, productData, categoryData, nameList, setSearch }) => {
    const { selectNameKey, multipleNameKey } = nameList
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const redirectLink = (name, value) => {
        setFieldValue(selectNameKey, value?.id)
    }
    const selectProduct = (name, value) => {
        setFieldValue(multipleNameKey, value?.id)
    }

    return (
        <>
            <SearchableSelectInput
                nameList={
                    [
                        {
                            name: selectNameKey,
                            title: "Select Link",
                            inputprops: {
                                name: selectNameKey,
                                id: selectNameKey,
                                options: redirectOptions || [],
                                value: redirectOptions.find((elem) => elem.id == values[selectNameKey])?.name || '',
                                close: true
                            },
                            store: "obj",
                            setvalue: redirectLink,
                        },
                    ]} />
            {
                values[selectNameKey] == 'product' ?
                    <SearchableSelectInput
                        nameList={
                            [
                                {
                                    name: multipleNameKey,
                                    title: "Products",
                                    inputprops: {
                                        name: multipleNameKey,
                                        id: multipleNameKey,
                                        options: productData || [],
                                        setsearch: setSearch,
                                        value: values[multipleNameKey]?.name ? values[multipleNameKey]?.name : productData?.find((elem) => elem.id == values[multipleNameKey])?.name || "",
                                        close: true
                                    },
                                    store: "obj",
                                    setvalue: selectProduct,
                                },
                            ]} />
                    : values[selectNameKey] == 'collection' ?
                        <MultiSelectField values={values} setFieldValue={setFieldValue} name={multipleNameKey} title="Collection" data={categoryData || []} key="Collection" getValuesKey='slug' />
                        : values[selectNameKey] == 'external_url' ?
                            <SimpleInputField nameList={[{ name: multipleNameKey, type: "url", placeholder: t("EnterRedirectLink"), title: "RedirectLink" }]} key="RedirectLink" />
                            : null
            }
        </>
    )
}

export default CommonRedirect
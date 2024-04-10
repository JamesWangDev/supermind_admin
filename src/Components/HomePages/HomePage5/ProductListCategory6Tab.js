import SimpleInputField from '../../InputFields/SimpleInputField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import SearchableSelectInput from '../../InputFields/SearchableSelectInput';
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const ProductListCategory6Tab = ({ nameKey, productName, productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][${nameKey}][title]`, placeholder: t("EnterTitle"), title: "Title" }
            ]} />
            <SearchableSelectInput
                nameList={
                    [{
                        name: productName,
                        title: "Products",
                        inputprops: {
                            name: productName,
                            id: productName,
                            options: productData || [],
                            setsearch: setSearch,
                        }
                    },
                    ]}
            />
            <CheckBoxField name={`[content][${nameKey}][status]`} title="Status" />
        </>
    )
}

export default ProductListCategory6Tab
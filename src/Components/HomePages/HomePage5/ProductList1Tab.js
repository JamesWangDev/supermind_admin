import SimpleInputField from '../../InputFields/SimpleInputField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import SearchableSelectInput from '../../InputFields/SearchableSelectInput';
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const ProductList1Tab = ({ nameKey, productData, description, customName, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][${nameKey}][title]`, placeholder: t("EnterTitle"), title: "Title" }]} />
            {description && <SimpleInputField nameList={[{ name: `[content][${nameKey}][description]`, placeholder: t("EnterDescription"), title: "Description" }]} />}
            {
                productData && <SearchableSelectInput
                    nameList={
                        [{
                            name: customName ? customName : 'productListProductIds',
                            title: "Products",
                            inputprops: {
                                name: customName ? customName : 'productListProductIds',
                                id: customName ? customName : 'productListProductIds',
                                options: productData || [],
                                setsearch: setSearch,
                            }
                        },
                        ]}
                />
            }
            <CheckBoxField name={`[content][${nameKey}][status]`} title="Status" />
        </>
    )
}

export default ProductList1Tab
import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SimpleInputField from "../../InputFields/SimpleInputField";
import CheckBoxField from "../../InputFields/CheckBoxField";
import SearchableSelectInput from "../../InputFields/SearchableSelectInput";

const ProductList2Tab = ({ productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][products_list_2][title]`, placeholder: t("EnterTitle"), title: "Title" }, { name: `[content][products_list_2][description]`, placeholder: t("EnterDescription"), title: "Description", type: "textarea" }
            ]} />
            <SearchableSelectInput
                nameList={
                    [{
                        name: 'productList2Product',
                        title: "Products",
                        inputprops: {
                            name: 'productList2Product',
                            id: 'productList2Product',
                            options: productData || [],
                            setsearch: setSearch,
                        }
                    },
                    ]}
            />
            <CheckBoxField name={`[content][products_list_2][status]`} title="Status" />
        </>
    )
}
export default ProductList2Tab
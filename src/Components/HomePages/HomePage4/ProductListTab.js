import SimpleInputField from "../../InputFields/SimpleInputField";
import CheckBoxField from "../../InputFields/CheckBoxField";
import SearchableSelectInput from "../../InputFields/SearchableSelectInput";
import I18NextContext from "@/Helper/I18NextContext";
import { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";

const ProductListTab = ({ productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][products_list_1][title]`, placeholder: t("EnterTitle"), title: "Title" }, { name: `[content][products_list_1][description]`, placeholder: t("EnterDescription"), title: "Description", type: "textarea" }
            ]} />
            <SearchableSelectInput
                nameList={
                    [{
                        name: 'productList1Product',
                        title: "Products",
                        inputprops: {
                            name: 'productList1Product',
                            id: 'productList1Product',
                            options: productData || [],
                            setsearch: setSearch,
                        }
                    },
                    ]}
            />
            <CheckBoxField name={`[content][products_list_1][status]`} title="Status" />
        </>
    )
}
export default ProductListTab
import { useContext } from "react";
import SimpleInputField from "../../InputFields/SimpleInputField";
import CheckBoxField from "../../InputFields/CheckBoxField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const Selling = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][start_selling][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: `[options][seller][start_selling][title]`, title: 'Title', placeholder: t('EnterTitle') },
                    { name: `[options][seller][start_selling][description]`, type: "textarea", rows: 6, title: 'description', placeholder: t('EnterDescription') },
                ]}
            />
        </>
    )
}

export default Selling
import SimpleInputField from "../../InputFields/SimpleInputField"
import FileUploadField from "../../InputFields/FileUploadField";
import CheckBoxField from "../../InputFields/CheckBoxField";
import { getHelperText } from "../../../Utils/CustomFunctions/getHelperText";
import I18NextContext from "@/Helper/I18NextContext";
import { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";

const AboutSeller = ({ values, setFieldValue, errors }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][about][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][seller][about][title]', title: 'Title', placeholder: t('EnterTitle') },
                    { name: '[options][seller][about][description]', title: 'description', type: "textarea", placeholder: t('EnterDescription'), rows: 8 },
                ]}
            />
            <FileUploadField name="aboutSellerImage" title='Image' id="aboutSellerImage" showImage={values['aboutSellerImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('512x438px')} />
        </>
    )
}

export default AboutSeller
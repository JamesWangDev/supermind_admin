import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import SimpleInputField from "../../InputFields/SimpleInputField"
import FileUploadField from "../../InputFields/FileUploadField";
import { getHelperText } from "../../../Utils/CustomFunctions/getHelperText";
import { useTranslation } from "@/app/i18n/client";

const ServiceWrapper = ({ values, serviceName, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <div>
                <h4 className="fw-semibold mb-3 txt-primary w-100">{t(serviceName?.title)}</h4>
                <SimpleInputField
                    nameList={[
                        { name: `[options][seller][services][${serviceName.value}][title]`, title: 'Title', placeholder: t('EnterTitle') },
                        { name: `[options][seller][services][${serviceName.value}][description]`, type: "textarea", title: 'description', placeholder: t('EnterDescription') },
                    ]}
                />
                <FileUploadField name={serviceName?.imageName} title='Image' id={serviceName?.imageName} showImage={values[serviceName?.imageName]} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('90x90px')} />
            </div>
        </>
    )
}

export default ServiceWrapper
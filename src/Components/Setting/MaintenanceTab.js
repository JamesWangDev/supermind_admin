import SimpleInputField from '../InputFields/SimpleInputField'
import CheckBoxField from '../InputFields/CheckBoxField';
import FileUploadField from '../InputFields/FileUploadField';
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const MaintenanceTab = ({ values, setFieldValue, errors }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[values][maintenance][maintenance_mode]" title="MaintenanceMode" />
            {values?.values?.maintenance?.maintenance_mode &&
                <>
                    <SimpleInputField nameList={[
                        { name: "[values][maintenance][title]", title: "Title", placeholder: t("EnterTitle") },
                        { name: "[values][maintenance][description]", title: "Description", placeholder: t("EnterDescription") }]} />
                    <FileUploadField name="maintenance_image_id" uniquename={values?.values?.maintenance?.maintenance_image} title="LightLogo" errors={errors} id="maintenance_image_id" type="file" values={values} setFieldValue={setFieldValue} />
                </>}
        </>
    )
}

export default MaintenanceTab
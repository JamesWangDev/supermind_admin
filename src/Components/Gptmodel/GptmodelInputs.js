import SimpleInputField from '../InputFields/SimpleInputField'
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import CheckBoxField from '../InputFields/CheckBoxField';
import { AITextboxData } from '@/Data/AITextboxData';

const GptmodelInputs = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: "name", require: "true", placeholder: t("EnterName") }, { name: "description", require: "true", title: "Description", type: "textarea", rows: 3, placeholder: t("EnterDescription"), helpertext: "*Maximum length should be 300 characters.", promptText: AITextboxData.model_desc }, { name: "api_url", require: "true", placeholder: t("EnterAPIUrl") }, { name: "api_key", require: "true", placeholder: t("EnterAPIKey") }]} />
            <CheckBoxField name="is_public" />
            <CheckBoxField name="status" />
        </>
    )
}

export default GptmodelInputs
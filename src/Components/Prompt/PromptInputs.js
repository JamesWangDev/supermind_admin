import SimpleInputField from '../InputFields/SimpleInputField'
import SearchableSelectInput from '../InputFields/SearchableSelectInput'
import { variantStyle } from '../../Data/TabTitleListData'
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import CheckBoxField from '../InputFields/CheckBoxField';
import { AITextboxData } from '@/Data/AITextboxData';

const PromptInputs = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: "name", require: "true", placeholder: t("EnterName") }, { name: "prompt_text", require: "true", title: "PromptText", type: "textarea", rows: 3, placeholder: t("EnterPromptText"), helpertext: "*Maximum length should be 300 characters.", promptText: AITextboxData.prompt_text }]} />
            <CheckBoxField name="status" />
        </>
    )
}

export default PromptInputs
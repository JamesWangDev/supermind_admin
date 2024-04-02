import React, { useContext } from 'react'
import SimpleInputField from '../../InputFields/SimpleInputField'
import FileUploadField from '../../InputFields/FileUploadField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const NewsLetterTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: "[content][news_letter][title]", placeholder: t("EnterTitle"), title: "Title" },
                { name: "[content][news_letter][sub_title]", placeholder: t("EnterSubTitle"), title: "SubTitle" }
            ]} />
            <FileUploadField name="newsLetterImage" title='Image' id="newsLetterImage" showImage={values['newsLetterImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1600x218px')} />
            <CheckBoxField name="[content][news_letter][status]" title="Status" />
        </>
    )
}

export default NewsLetterTab
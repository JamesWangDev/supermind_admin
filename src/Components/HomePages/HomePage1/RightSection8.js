import FileUploadField from '../../InputFields/FileUploadField'
import { RiArrowDownLine } from 'react-icons/ri'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'
import I18NextContext from '@/Helper/I18NextContext'
import { useContext } from 'react'
import { useTranslation } from '@/app/i18n/client'

const RightSection8 = ({ values, setFieldValue, active, setActive, productData, categoryData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(8)}>{t("Banner")}<RiArrowDownLine />
            </div>
            {active == 8 && (
                <div className="rule-edit-form">
                    <FileUploadField name="section8_VegitableImage" title='Image' id="section8_VegitableImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values['section8_VegitableImage']} helpertext={getHelperText('1189x297px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRight8LinkType', multipleNameKey: 'mainRight8Link' }} setSearch={setSearch} />
                    <CheckBoxField name="[content][main_content][section8_full_width_banner][status]" title="Status" />
                </div>
            )}
        </div>
    )
}

export default RightSection8
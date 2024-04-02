import { useContext } from 'react'
import { useTranslation } from '@/app/i18n/client'
import { RiArrowDownLine } from 'react-icons/ri'
import FileUploadField from '../../InputFields/FileUploadField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'
import I18NextContext from '@/Helper/I18NextContext'

const RightSection6 = ({ values, setFieldValue, active, setActive, productData, categoryData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(6)}>{t("Banner")} <RiArrowDownLine /></div>
            {active == 6 && (
                <>
                    <div className="rule-edit-form">
                        <CheckBoxField name={`[content][main_content][section6_two_column_banners][status]`} title="Status" />
                        <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("Banner")} 1</h4>
                        <FileUploadField name="section6_twocolumnBanner1" title='Image' id="section6_twocolumnBanner1" type="file" values={values} setFieldValue={setFieldValue} showImage={values['section6_twocolumnBanner1']} helpertext={getHelperText('790x286px')} />
                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRight6LinkType1', multipleNameKey: 'mainRight6Link1' }} setSearch={setSearch} />
                    </div>
                    <div className="rule-edit-form">
                        <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("Banner")} 2</h4>
                        <FileUploadField name="section6_twocolumnBanner2" title='Image' id="section6_twocolumnBanner2" type="file" values={values} setFieldValue={setFieldValue} showImage={values["section6_twocolumnBanner2"]} helpertext={getHelperText('383x286px')} />
                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRight6LinkType2', multipleNameKey: 'mainRight6Link2' }} setSearch={setSearch} />
                    </div>
                </>
            )}
        </div>
    )
}

export default RightSection6
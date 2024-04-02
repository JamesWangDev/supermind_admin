import { RiArrowDownLine } from 'react-icons/ri'
import FileUploadField from '../../InputFields/FileUploadField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'
import I18NextContext from '@/Helper/I18NextContext'
import { useContext } from 'react'
import { useTranslation } from '@/app/i18n/client'

const RightSection3 = ({ values, setFieldValue, active, setActive, productData, categoryData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{t("Banner")} <RiArrowDownLine /></div>
            {active == 3 && (
                <>
                    <div className="rule-edit-form">
                        <CheckBoxField name="[content][main_content][section3_two_column_banners][status]" title="Status" />
                        <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("Banner")} 1</h4>
                        <FileUploadField name="section3Banner1" title='Image' id="section3Banner1" type="file" showImage={values['section3Banner1']} values={values} setFieldValue={setFieldValue} helpertext={getHelperText('583x157px')} />
                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRight3LinkType1', multipleNameKey: 'mainRight3Link1' }} setSearch={setSearch} />
                    </div>
                    <div className="rule-edit-form">
                        <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("Banner")} 2</h4>
                        <FileUploadField name="section3Banner2" showImage={values['section3Banner2']} title='Image' id="section3Banner2" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('583x157px')} />
                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRight3LinkType2', multipleNameKey: 'mainRight3Link2' }} setSearch={setSearch} />
                    </div>
                </>
            )}
        </div>
    )
}

export default RightSection3
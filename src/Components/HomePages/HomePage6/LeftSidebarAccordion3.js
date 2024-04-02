import { Col, Row } from 'reactstrap'
import { RiArrowDownLine } from 'react-icons/ri'
import FileUploadField from '../../InputFields/FileUploadField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'
import I18NextContext from '@/Helper/I18NextContext'
import { useContext } from 'react'
import { useTranslation } from '@/app/i18n/client'

const LeftSidebarAccordion3 = ({ values, setFieldValue, setActive, active, productData, categoryData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <Row className='align-items-center'>
            <Col xs="10">
                <div className='shipping-accordion-custom'>
                    <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{t("Banner")} <RiArrowDownLine /></div>
                    {active == 3 && (
                        <>
                            <div className="rule-edit-form">
                                <CheckBoxField name={`[content][main_content][section3_two_column_banners][status]`} title="Status" />
                                <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("Banner")} 1</h4>
                                <FileUploadField name="mainContentLeftBannerImage" title='Image' id="mainContentLeftBannerImage2" showImage={values['mainContentLeftBannerImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('583x157px')} />
                                <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainLeftBanner1LinkType', multipleNameKey: 'mainLeftBanner1Link' }} setSearch={setSearch} />
                            </div>
                            <div className="rule-edit-form">
                                <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("Banner")} 2</h4>
                                <FileUploadField name="mainContentLeftBannerImage2" title='Image' id="mainContentLeftBannerImage2" showImage={values['mainContentLeftBannerImage2']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('583x157px')} />
                                <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainLeftBanner2LinkType', multipleNameKey: 'mainLeftBanner2Link' }} setSearch={setSearch} />
                            </div>
                        </>
                    )}
                </div>
            </Col>
        </Row>
    )
}

export default LeftSidebarAccordion3
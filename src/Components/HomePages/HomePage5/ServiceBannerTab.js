import React, { useContext, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { RiArrowDownLine } from 'react-icons/ri'
import SimpleInputField from '../../InputFields/SimpleInputField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import Btn from '../../../Elements/Buttons/Btn'
import FileUploadField from '../../InputFields/FileUploadField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const ServiceBannerTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [active, setActive] = useState(0)
    return (
        <>
            <CheckBoxField name={`[content][services_banner][status]`} title="Status" />
            {<Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][services_banner][services]" || [], [...values['content']['services_banner']['services'] || [], { title: "", description: "" }] || [])} title="AddService" />}
            {
                values['content']?.['services_banner']?.['services']?.map((elem, index) => {
                    return <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{values['content']?.['services_banner']?.['services']?.[index]?.['title'] || 'Text Here'}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <SimpleInputField nameList={[
                                            { name: `[content][services_banner][services][${index}][title]` || '', placeholder: t("EnterTitle"), title: "Title" },
                                            { name: `[content][services_banner][services][${index}][sub_title]`, placeholder: t("EnterSubTitle"), title: "SubTitle" }
                                        ]} />
                                        <FileUploadField name={`serviceImage${index}`} showImage={values[`serviceImage${index}`]} title='Image' id={`serviceImage${index}`} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('42x42px')} />
                                        <CheckBoxField name={`[content][services_banner][services][${index}][status]`} title="Status" />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer"
                                onClick={() => values['content']['services_banner']['services'].length > 1 && setFieldValue("[content][services_banner][services]", values['content']['services_banner']['services'].filter((item, i) => i !== index),)}>{t('Remove')}</a>
                        </Col>
                    </Row>
                })
            }
        </>
    )
}

export default ServiceBannerTab
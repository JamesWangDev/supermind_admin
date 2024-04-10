import React, { useContext, useState } from 'react'
import { RiArrowDownLine } from 'react-icons/ri'
import { Col, Row } from 'reactstrap'
import CheckBoxField from '../../InputFields/CheckBoxField'
import FileUploadField from '../../InputFields/FileUploadField'
import SimpleInputField from '../../InputFields/SimpleInputField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import Btn from '../../../Elements/Buttons/Btn'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const AboutTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['options']?.['about_us']?.['about']?.['futures'].length > 1) {
            let filterValue = values['options']?.['about_us']?.['about']?.['futures']?.filter((item, i) => i !== index)
            setFieldValue("[options][about_us][about][futures]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.icon && setFieldValue(`futureIcons${i}`, { original_url: elem?.icon })
            })
        }
    }
    return (
        <>
            <CheckBoxField name="[options][about_us][about][status]" title="status" />
            <FileUploadField name="content_left_image_url" title='LeftBgImage' id="content_left_image_url" showImage={values['content_left_image_url']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('512x438px')} />
            <FileUploadField name="content_right_image_url" title='RightBgImage' id="content_right_image_url" showImage={values['content_right_image_url']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('512x438px')} />
            <SimpleInputField
                nameList={[
                    { name: '[options][about_us][about][sub_title]', title: 'SubTitle', placeholder: t('EnterSubTitle') },
                    { name: '[options][about_us][about][title]', title: 'Title', placeholder: t('EnterTitle') },
                    { name: '[options][about_us][about][description]', title: 'description', type: "textarea", placeholder: t('EnterDescription'), rows: 6 },
                ]}
            />
            <Btn type={'button'} className="btn-theme my-4" title="AddFuture" onClick={() => setFieldValue("[options][about_us][about][futures]", [...values['options']['about_us']['about']['futures'], { title: "", description: "" }])} />
            {
                values['options']?.['about_us']?.['about']?.['futures']?.map((future, index) => (
                    <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{future?.title ? future?.title : "Enter Text"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <SimpleInputField
                                            nameList={[
                                                { name: `[options][about_us][about][futures][${index}][title]`, title: 'Title', placeholder: t('EnterTitle') }
                                            ]}
                                        />
                                        <FileUploadField name={`futureIcons${index}`} title='Icon' id={`futureIcons${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`futureIcons${index}`]} helpertext={getHelperText('510x288px')} />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer" onClick={() => removeBanners(index)}>{t('Remove')}</a>
                        </Col>
                    </Row>
                ))
            }
        </>
    )
}

export default AboutTab
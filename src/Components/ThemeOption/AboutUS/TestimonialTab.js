import { useContext, useState } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import Btn from '../../../Elements/Buttons/Btn';
import CheckBoxField from '../../InputFields/CheckBoxField'
import SimpleInputField from '../../InputFields/SimpleInputField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import FileUploadField from '../../InputFields/FileUploadField';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const TestimonialTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['options']?.['about_us']?.['testimonial']?.['reviews'].length > 1) {
            let filterValue = values['options']?.['about_us']?.['testimonial']?.['reviews']?.filter((item, i) => i !== index)
            setFieldValue("[options][about_us][testimonial][reviews]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.profile_image_url && setFieldValue(`testimonialReviewImage${i}`, { original_url: elem?.profile_image_url })
            })
        }
    }
    return (
        <>
            <CheckBoxField name="[options][about_us][testimonial][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][about_us][testimonial][sub_title]', title: 'SubTitle', placeholder: t('EnterSubTitle') },
                    { name: '[options][about_us][testimonial][title]', title: 'Title', placeholder: t('EnterTitle') },
                ]}
            />
            <Btn type={'button'} className="btn-theme my-4" title="AddContent" onClick={() => setFieldValue("[options][about_us][testimonial][reviews]", [...values['options']['about_us']['testimonial']['reviews'], { title: "", description: "" }])} />
            {
                values['options']?.['about_us']?.['testimonial']?.['reviews']?.map((team, index) => (
                    <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{team?.name ? team?.name : "Enter Text"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`testimonialReviewImage${index}`} title='Icon' id={`testimonialReviewImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`testimonialReviewImage${index}`]} helpertext={getHelperText('510x288px')} />
                                        <SimpleInputField
                                            nameList={[
                                                { name: `[options][about_us][testimonial][reviews][${index}][title]`, title: 'Title', placeholder: t('EnterTitle') },
                                                { name: `[options][about_us][testimonial][reviews][${index}][name]`, title: 'Name', placeholder: t('EnterName') }, { name: `[options][about_us][testimonial][reviews][${index}][designation]`, title: 'Designation', placeholder: t('EnterDesignation') }, { name: `[options][about_us][testimonial][reviews][${index}][review]`, title: 'Review', type: "textarea", placeholder: t('EnterReview') }
                                            ]}
                                        />
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

export default TestimonialTab
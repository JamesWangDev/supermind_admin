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

const TeamTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['options']?.['about_us']?.['team']?.['members'].length > 1) {
            let filterValue = values['options']?.['about_us']?.['team']?.['members']?.filter((item, i) => i !== index)
            setFieldValue("[options][about_us][team][members]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.profile_image_url && setFieldValue(`teamContentImage${i}`, { original_url: elem?.profile_image_url })
            })
        }
    }
    return (
        <>
            <CheckBoxField name="[options][about_us][team][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][about_us][team][sub_title]', title: 'SubTitle', placeholder: t('EnterSubTitle') },
                    { name: '[options][about_us][team][title]', title: 'Title', placeholder: t('EnterTitle') },
                ]}
            />
            <Btn type={'button'} className="btn-theme my-4" title="AddContent" onClick={() => setFieldValue("[options][about_us][team][members]", [...values['options']['about_us']['team']['members'], { title: "", description: "" }])} />
            {
                values['options']?.['about_us']?.['team']?.['members']?.map((team, index) => (
                    <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{team?.name ? team?.name : "Enter Text"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`teamContentImage${index}`} title='Icon' id={`teamContentImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`teamContentImage${index}`]} helpertext={getHelperText('510x288px')} />
                                        <SimpleInputField
                                            nameList={[
                                                { name: `[options][about_us][team][members][${index}][name]`, title: 'Name', placeholder: t('EnterName') }, { name: `[options][about_us][team][members][${index}][designation]`, title: 'Designation', placeholder: t('EnterDesignation') },
                                                { name: `[options][about_us][team][members][${index}][instagram]`, title: 'Instagram', placeholder: t('EnterInstagram') }, { name: `[options][about_us][team][members][${index}][twitter]`, title: 'Twitter', placeholder: t('EnterTwitter') },
                                                { name: `[options][about_us][team][members][${index}][pinterest]`, title: 'Pinterest', placeholder: t('Enterpinterest') }, { name: `[options][about_us][team][members][${index}][facebook]`, title: 'Facebook', placeholder: t('EnterFacebook') },
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

export default TeamTab
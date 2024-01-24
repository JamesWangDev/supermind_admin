import CheckBoxField from '../../InputFields/CheckBoxField'
import SimpleInputField from '../../InputFields/SimpleInputField'
import Btn from '../../../Elements/Buttons/Btn';
import { Col, Row } from 'reactstrap';
import { RiArrowDownLine } from 'react-icons/ri';
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import { useContext, useState } from 'react';
import FileUploadField from '../../InputFields/FileUploadField';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const ClientTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['options']?.['about_us']?.['clients']?.['content'].length > 1) {
            let filterValue = values['options']?.['about_us']?.['clients']?.['content']?.filter((item, i) => i !== index)
            setFieldValue("[options][about_us][clients][content]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.icon && setFieldValue(`clientContentImage${i}`, { original_url: elem?.icon })
            })
        }
    }
    return (
        <>
            <CheckBoxField name="[options][about_us][clients][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][about_us][clients][sub_title]', title: 'SubTitle', placeholder: t('EnterSubTitle') },
                    { name: '[options][about_us][clients][title]', title: 'Title', placeholder: t('EnterTitle') },
                ]}
            />
            <Btn type={'button'} className="btn-theme my-4" title="AddContent" onClick={() => setFieldValue("[options][about_us][clients][content]", [...values['options']['about_us']['clients']['content'], { title: "", description: "" }])} />
            {
                values['options']?.['about_us']?.['clients']?.['content']?.map((future, index) => (
                    <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{future?.title ? future?.title : "Enter Text"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`clientContentImage${index}`} title='Icon' id={`clientContentImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`clientContentImage${index}`]} helpertext={getHelperText('510x288px')} />
                                        <SimpleInputField
                                            nameList={[
                                                { name: `[options][about_us][clients][content][${index}][title]`, title: 'Title', placeholder: t('EnterTitle') }, { name: `[options][about_us][clients][content][${index}][description]`, title: 'Description', placeholder: t('EnterDescription') }
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

export default ClientTab
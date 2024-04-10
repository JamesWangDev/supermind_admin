import { Col, Label, Row } from 'reactstrap';
import Btn from '../../Elements/Buttons/Btn';
import CheckBoxField from '../InputFields/CheckBoxField';
import SimpleInputField from '../InputFields/SimpleInputField';
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const DeliveyTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: `[values][delivery][default][title]`, title: "Title" }]} />
            <SimpleInputField nameList={[{ name: `[values][delivery][default][description]`, title: "Description" }]} />
            <CheckBoxField name="[values][delivery][same_day_delivery]" title="SameDayDelivery" />
            {values['values']['delivery']?.['same_day_delivery'] && <>
                <SimpleInputField nameList={[{ name: `[values][delivery][same_day][title]`, title: "title", placeholder: t("EnterTitle") }]} />
                <SimpleInputField nameList={[{ name: `[values][delivery][same_day][description]`, title: "description", placeholder: t("EnterDescription") }]} />
                <Row className='mb-4 align-items-center g-2'>
                    <Col sm="3"><Label className='col-form-label form-label-title form-label'> {t("DefaultDelivery")}</Label></Col>
                    <Col sm="10">
                        {values['values']['delivery']?.['same_day_intervals'].length > 0 &&
                            values['values']['delivery']['same_day_intervals'].map((elem, i) => (
                                <div className='mb-3' key={i}>
                                    <Row>
                                        <Col sm="10">
                                            <Row className='g-3'>
                                                <Col xs="6">
                                                    <SimpleInputField nameList={[{ name: `[values][delivery][same_day_intervals][${i}][title]`, title: "title", notitle: "true", placeholder: t("EnterTitle") }]} />
                                                </Col>
                                                <Col xs="6">
                                                    <SimpleInputField nameList={[{ name: `[values][delivery][same_day_intervals][${i}][description]`, title: "description", notitle: "true", placeholder: t("EnterDescription") }]} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm="2" className='px-sm-0'>
                                            <a className="mt-custom d-block invalid-feedback cursor-pointer"
                                                onClick={() => setFieldValue("[values][delivery][same_day_intervals]", values['values']['delivery']['same_day_intervals'].filter((item, index) => index !== i),)}>{t('Remove')}</a>
                                        </Col>
                                    </Row>
                                </div>

                            ))}
                        <Btn className="btn-theme mt-4" onClick={() => setFieldValue("[values][delivery][same_day_intervals]", [...values['values']['delivery']['same_day_intervals'], { title: "", description: "" }])} title="AddIntervals" />
                    </Col>
                </Row>

            </>}
        </>
    )
}

export default DeliveyTab
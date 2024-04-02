import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap';
import CkEditorComponent from '../InputFields/CkEditorComponent';
import { ErrorMessage } from 'formik';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const DescriptionInput = ({ values, setFieldValue, nameKey, errorMessage, title, helpertext }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [editorLoaded, setEditorLoaded] = useState(false);
    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    return (
        <>
            <div className="input-error">
                <Row className="mb-4 align-items-center g-md-4 g-2">
                    <Col sm={2}>
                        <span className="col-form-label form-label-title form-label">{t(title)} {errorMessage && <span className='theme-color ms-2 required-dot'>*</span>}</span>
                    </Col>
                    <Col sm={10}>
                        <CkEditorComponent name={nameKey} onChange={(data) => {
                            setFieldValue(nameKey, data)
                        }} value={values[nameKey]} editorLoaded={editorLoaded}
                        />
                        {helpertext && <p className='help-text'>{helpertext}</p>}
                        <ErrorMessage name='description' render={(msg) => <div className='invalid-feedback d-block'>{t(errorMessage)}</div>} />
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default DescriptionInput
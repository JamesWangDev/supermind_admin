import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap';
import CkEditorComponent from '../InputFields/CkEditorComponent';
import { ErrorMessage } from 'formik';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { PiMagicWand } from "react-icons/pi";
import { OpenAIStream } from "@/Utils/OpenAIStream";

const DescriptionInput = ({ values, setFieldValue, nameKey, errorMessage, title, helpertext, promptText }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [isAILoading, setIsAILoading] = useState(false);
    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const handleGetAIAssist = () => {
        if(!values[nameKey]) {
            alert("Enter your text first...");
            return;
        }
        setIsAILoading(true);
        const gptPrompt = [
            {
                role: 'user',
                content: promptText ? promptText : 'Make this input text better'
            },
            {
                role: 'user',
                content: values[nameKey]
            }
        ]

        OpenAIStream(gptPrompt, "gpt-3.5-turbo", "https://api.openai.com/v1/chat/completions", process.env.OPENAI_API_KEY)
            .then(response => {
                setFieldValue(nameKey, response)
                setIsAILoading(false);
            })
            .catch(error => {
                setIsAILoading(false);
                alert("Error while fetching from API!");
            })
    }

    return (
        <>
            <div className="input-error">
                <Row className="mb-4 align-items-center g-md-4 g-2">
                    <Col sm={2}>
                        <span className="col-form-label form-label-title form-label">{t(title)} {errorMessage && <span className='theme-color ms-2 required-dot'>*</span>}</span>
                    </Col>
                    <Col sm={10}>
                        <div style={{position: "relative"}}>
                            <CkEditorComponent name={nameKey} onChange={(data) => {
                                setFieldValue(nameKey, data)
                            }} value={values[nameKey]} editorLoaded={editorLoaded}
                            />
                            <div onClick={handleGetAIAssist} className="magic-wand-btn">
                                {isAILoading ? <div className="magic-wand-spinner"></div> : <PiMagicWand />}
                            </div>
                        </div>
                        {helpertext && <p className='help-text'>{helpertext}</p>}
                        <ErrorMessage name='description' render={(msg) => <div className='invalid-feedback d-block'>{t(errorMessage)}</div>} />
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default DescriptionInput
import React, { useContext, useRef, useState } from "react";
import { ErrorMessage, useFormikContext } from "formik";
import { FormFeedback, FormGroup, Input, InputGroup, Label, InputGroupText, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import SettingContext from "../../Helper/SettingContext";
import { handleModifier } from "../../Utils/Validation/ModifiedErrorMessage";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { PiMagicWand } from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";
import { OpenAIStream } from "@/Utils/OpenAIStream";

const ReactstrapFormikInput = ({ field: { ...fields }, form: { touched, errors }, ...props }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { currencySymbol } = useContext(SettingContext);
  const [isAILoading, setIsAILoading] = useState(false);
  const textAreaEl = useRef(null);
  const { setFieldValue } = useFormikContext();
  const [promptText, setPromptText] = useState(props?.promptText);

  const handleGetAIAssist = () => {
    const inputText = textAreaEl.current.props.value;
    if(!inputText) {
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
        content: inputText
      }
    ]

    OpenAIStream(gptPrompt, "gpt-3.5-turbo", "https://api.openai.com/v1/chat/completions", process.env.OPENAI_API_KEY)
      .then(response => {
          setFieldValue(fields.name, response)
          setIsAILoading(false);
      })
      .catch(error => {
          setIsAILoading(false);
          alert("Error while fetching from API!");
      })
  }

  return (
    <>
      {props.label ? (
        <>
          <FormGroup floating>
            <Input {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name])} valid={Boolean(touched[fields.name] && !errors[fields.name])} autoComplete="off" />
            <Label htmlFor={props.id}>{t(props.label)}</Label>
            {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]).split(" ").join(""))}</FormFeedback> : ""}
          </FormGroup>
        </>
      )
        : props.inputaddon ? (
          <>
            <InputGroup>
              {!props.postprefix && <InputGroupText>{props?.prefixvalue ? props?.prefixvalue : currencySymbol}</InputGroupText>}
              <Input disabled={props.disable ? props.disable : false} {...fields}  {...props} invalid={Boolean(touched[fields.name] && errors[fields.name])} valid={Boolean(touched[fields.name] && !errors[fields.name])} autoComplete="off" readOnly={props.readOnly ? true : false} onInput={(e) => {
                if (props.min && props.max) {
                  if (e.target.value > 100) e.target.value = 100; if (e.target.value < 0) e.target.value = 0;
                } else false
              }} />
              {props.postprefix && <InputGroupText>{props.postprefix}</InputGroupText>}
              {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]).split(" ").join(""))}</FormFeedback> : ""}
              {props?.errormsg && <ErrorMessage name={fields.name} render={(msg) => <div className="invalid-feedback d-block">{t(props.errormsg)} {t('IsRequired')}</div>} />}
            </InputGroup>
            {props?.helpertext && <p className="help-text">{props?.helpertext}</p>}
          </>
        )
          : (
            <>
              {
                props.type == "color" ? <div className="color-box">
                  <Input disabled={props.disable ? props.disable : false} {...fields}  {...props} invalid={Boolean(touched[fields.name] && errors[fields.name])} valid={Boolean(touched[fields.name] && !errors[fields.name])} autoComplete="off" />
                  {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]))}</FormFeedback> : ""}
                  <h6>{fields.value}</h6>
                </div>
                  :
                  <div>
                    <div style={{position: "relative"}}>
                      <Input ref={textAreaEl} disabled={props.disable ? props.disable : false} {...fields} {...props} id={"textarea-" + props.id} invalid={Boolean(touched[fields.name] && errors[fields.name])} valid={Boolean(touched[fields.name] && !errors[fields.name])} autoComplete="off" onInput={(e) => {
                        if (props.min && props.max) {
                          if (e.target.value > 100) e.target.value = 100; if (e.target.value < 0) e.target.value = 0;
                        } else false
                      }} />
                      {props.type == "textarea" && <div className="magic-wand-btn">
                        {isAILoading ? <div className="magic-wand-spinner"></div> : <PiMagicWand onClick={handleGetAIAssist} />}

                        <RiEdit2Line id={fields.name} />
                        <UncontrolledPopover
                          placement="bottom"
                          target={fields.name}
                          trigger="legacy"
                          className='custom-popover'
                        >
                          <PopoverHeader>
                            Prompt Upadte
                          </PopoverHeader>
                          <PopoverBody>
                            <Input style={{height: 180}} type='textarea' value={promptText} onChange={(e) => setPromptText(e.target.value)} />
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>}
                    </div>
                    {props?.helpertext && <p className="help-text">{props?.helpertext}</p>}
                    {touched[fields.name] && errors[fields.name] ?
                      <FormFeedback>
                        {t(handleModifier(errors[fields.name]).split(" ").join(""))}
                      </FormFeedback>
                      : ""}
                    {props?.errormsg && <ErrorMessage name={fields.name} render={(msg) => <div className="invalid-feedback d-block">
                      {t(props.errormsg)} {t('IsRequired')}</div>} />}
                  </div>
              }
            </>
          )}
    </>
  );
};
export default ReactstrapFormikInput;

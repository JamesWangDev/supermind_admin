import React, { useContext } from 'react'
import { Row, Col } from 'reactstrap'
import CheckBoxField from '../InputFields/CheckBoxField'
import SimpleInputField from '../InputFields/SimpleInputField'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const ErrorPage = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <Row>
        <Col sm="9">
          <SimpleInputField
            nameList={[
              { name: '[options][error_page][error_page_content]', type: "textarea", title: "ErrorPageContent", placeholder: t("EnterErrorPageContent") }
            ]} />
          <CheckBoxField name="[options][error_page][back_button_enable]" title="BackButton" />
          {values['options']?.['error_page']?.['back_button_enable'] &&
            <SimpleInputField
              nameList={[
                { name: '[options][error_page][back_button_text]', title: "BackButtonText", placeholder: t("EnterButtonText") }
              ]} />
          }
        </Col>
      </Row>
    </>
  )
}

export default ErrorPage
import { Row, Col } from 'reactstrap'
import CheckBoxField from '../InputFields/CheckBoxField'
import SearchableSelectInput from '../InputFields/SearchableSelectInput'
import SimpleInputField from '../InputFields/SimpleInputField'
import FileUploadField from '../InputFields/FileUploadField'
import { getHelperText } from '../../Utils/CustomFunctions/getHelperText';
import I18NextContext from '@/Helper/I18NextContext'
import { useContext } from 'react'
import { useTranslation } from '@/app/i18n/client'

const GeneralTab = ({ values, setFieldValue, errors }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <Row>
        <Col sm="9">
          <FileUploadField name="header_logo_id" uniquename={values?.options?.logo?.header_logo} title={"HeaderLogo"} errors={errors} id="header_logo_id" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('180x50px')} />

          <FileUploadField errors={errors} name="footer_logo_id" id="footer_logo_id" uniquename={values?.options?.logo?.footer_logo} title={"FooterLogo"} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('180x50px')} />

          <FileUploadField errors={errors} name="favicon_icon_id" title={"FaviconIcon"} id="favicon_icon_id" type="file" values={values} setFieldValue={setFieldValue} uniquename={values?.options?.logo?.favicon_icon} helpertext={getHelperText('16x16px')} />
          <SimpleInputField
            nameList={[
              { name: '[options][general][site_title]', title: "SiteTitle", placeholder: t("EnterSiteTitle") },
              { name: '[options][general][site_tagline]', title: "SiteTagline", placeholder: t("EnterSiteTagline") },
            ]} />
          <SimpleInputField
            nameList={[
              { name: '[options][general][primary_color]', title: "PrimaryColor", type: "color" },
            ]} />
          <CheckBoxField name="[options][general][back_to_top_enable]" title="BacktoTop" />
          <CheckBoxField name="[options][general][sticky_cart_enable]" title="StickyCart" />
          <SearchableSelectInput
            nameList={[
              {
                name: "[options][general][cart_style]",
                title: "CartStyle",
                inputprops: {
                  name: "[options][general][cart_style]",
                  id: "[options][general][cart_style]",
                  options: [
                    { id: "cart_sidebar", name: "Cart Sidebar" },
                    { id: "cart_mini", name: "Cart Mini" },
                  ],
                  defaultOption: "Select Cart Style",
                },
              },
              {
                name: "[options][general][language_direction]",
                title: "LanguageDirection",
                inputprops: {
                  name: "[options][general][language_direction]",
                  id: "[options][general][language_direction]",
                  options: [
                    { id: "ltr", name: "LTR" },
                    { id: "rtl", name: "RTL" },
                  ],
                  defaultOption: "Select Language Direction",
                },
              },
              {
                name: "[options][general][mode]",
                title: "SelectMode",
                inputprops: {
                  name: "[options][general][mode]",
                  id: "[options][general][mode]",
                  options: [
                    { id: "light", name: "Light" },
                    { id: "dark", name: "Dark" },
                  ],
                  defaultOption: "Select Mode",
                },
              },

            ]}
          />
        </Col>
      </Row>
    </>
  )
}

export default GeneralTab
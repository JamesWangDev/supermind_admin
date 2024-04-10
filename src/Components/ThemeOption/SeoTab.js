import { Row, Col } from 'reactstrap'
import FileUploadField from '../InputFields/FileUploadField'
import SimpleInputField from '../InputFields/SimpleInputField'
import { getHelperText } from '../../Utils/CustomFunctions/getHelperText'
import { useContext } from 'react'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const SeoTab = ({ values, setFieldValue, errors }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <Row>
        <Col sm="9">
          <SimpleInputField
            nameList={[
              { name: "[options][seo][meta_tags]", title: "MetaTags", placeholder: t("EnterMetaTags") },
              { name: "[options][seo][meta_title]", title: "MetaTitle", placeholder: t("EnterMetaTitle") },
              { name: "[options][seo][meta_description]", type: "textarea", title: "MetaDescription", placeholder: t("EnterMetaDescription") },
              { name: "[options][seo][og_title]", title: "OgTitle", placeholder: t("OgTitle") },
              { name: "[options][seo][og_description]", type: "textarea", title: "OgDescription", placeholder: t("EnterOgDescription") }]} />
          <FileUploadField errors={errors} name="og_image_id" title={"OgImage"} id="og_image_id" type="file" values={values} setFieldValue={setFieldValue} uniquename={values?.options?.seo?.og_image} helpertext={getHelperText('1200x630px')} />
        </Col>
      </Row>
    </>
  )
}

export default SeoTab
import React, { useContext, useState } from 'react'
import { Col, Row } from 'reactstrap';
import Btn from '../../../Elements/Buttons/Btn'
import CheckBoxField from '../../InputFields/CheckBoxField';
import FileUploadField from '../../InputFields/FileUploadField';
import { RiArrowDownLine, RiCloseLine } from 'react-icons/ri';
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const FeatureBannerTab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [active, setActive] = useState();
  const removeBanners = (index) => {
    if (values['content']['featured_banners']['banners'].length > 1) {
      let filterValue = values['content']['featured_banners']['banners'].filter((item, i) => i !== index)
      setFieldValue("[content][featured_banners][banners]", filterValue)
      filterValue?.forEach((elem, i) => {
        elem?.image_url && setFieldValue(`featureBannerImage${i}`, { original_url: elem?.image_url })
        elem?.redirect_link?.link_type && setFieldValue(`featureRedirectLinkType${i}`, elem?.redirect_link?.link_type)
        elem?.redirect_link?.link && setFieldValue(`featureRedirectLink${i}`, elem?.redirect_link?.link)
      })
    }
  }
  return (
    <>
      {<Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][featured_banners][banners]", [...values['content']['featured_banners']['banners'], { title: "", description: "" }])} title="AddBanner" />}
      {
        values['content']?.['featured_banners']?.['banners'].map((elem, index) => {
          return <Row className='align-items-center' key={index}>
            <Col xs="11">
              <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>
                  {t("Banner") + " " + (index + 1)}<RiArrowDownLine />
                </div>
                {active == index && (
                  <div className="rule-edit-form">
                    <FileUploadField name={`featureBannerImage${index}`} title='Image' id={`featureBannerImage${index}`} type="file" values={values} setFieldValue={setFieldValue} showImage={values[`featureBannerImage${index}`]} helpertext={getHelperText('376x231px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: `featureRedirectLinkType${index}`, multipleNameKey: `featureRedirectLink${index}` }} setSearch={setSearch} />
                    <CheckBoxField name={`[content][featured_banners][banners][${index}][status]`} title="Status" />
                  </div>
                )}
              </div>
            </Col>
            <Col xs="1">
              <a className="h-100 w-100 cursor-pointer close-icon"
                onClick={() => removeBanners(index)}><RiCloseLine /></a>
            </Col>
          </Row>
        })
      }
    </>
  )
}

export default FeatureBannerTab
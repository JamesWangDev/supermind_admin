import FileUploadField from '../../InputFields/FileUploadField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'

const CouponBanner9Tab = ({ values, setFieldValue, productData, categoryData }) => {
    return (
        <>
            <FileUploadField name="couponBannerImage" title='Image' id="couponBannerImage" showImage={values['couponBannerImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1522x136px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'couponBannerLinkType', multipleNameKey: 'couponBannerLink' }} />
            <CheckBoxField name={`[content][coupon_banner][status]`} title="Status" />
        </>
    )
}

export default CouponBanner9Tab
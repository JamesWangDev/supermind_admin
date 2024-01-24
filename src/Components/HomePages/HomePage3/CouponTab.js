import CheckBoxField from "../../InputFields/CheckBoxField";
import FileUploadField from "../../InputFields/FileUploadField";
import { getHelperText } from "../../../Utils/CustomFunctions/getHelperText";
import CommonRedirect from "../CommonRedirect";

const CouponTab = ({ values, setFieldValue, helpertext, productData, categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name="couponImage" title='Image' id="couponImage" showImage={values['couponImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText(helpertext || '1198x138px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'couponBannerLinkType', multipleNameKey: 'couponBannerLink' }} setSearch={setSearch} />
            <CheckBoxField name={`[content][coupons][status]`} title="Status" />
        </>
    )
}
export default CouponTab
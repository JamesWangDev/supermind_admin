import FileUploadField from "../../InputFields/FileUploadField";
import CheckBoxField from "../../InputFields/CheckBoxField";
import { getHelperText } from "../../../Utils/CustomFunctions/getHelperText";
import CommonRedirect from '../CommonRedirect';

const HomeBanner9Tab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name="homeBanner9Image" title='Image' id="homeBanner9Image" showImage={values['homeBanner9Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1859x550px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
            <CheckBoxField name={`[content][home_banner][status]`} title="Status" />
        </>
    )
}
export default HomeBanner9Tab
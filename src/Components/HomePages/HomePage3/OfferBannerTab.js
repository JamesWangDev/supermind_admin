import CheckBoxField from '../../InputFields/CheckBoxField'
import FileUploadField from '../../InputFields/FileUploadField';
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';

const OfferBannerTab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name="offerBannerImage" title='Image' id="offerBannerImage" showImage={values['offerBannerImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1600x138px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'offerBannerLinkType', multipleNameKey: 'offerBannerLink' }} setSearch={setSearch} />
            <CheckBoxField name="[content][offer_banner][status]" title="Status" />
        </>
    )
}
export default OfferBannerTab
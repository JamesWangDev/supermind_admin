import FileUploadField from '../../InputFields/FileUploadField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';

const FullWidthBanner6Tab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name="fullWidthImage" title='Image' showImage={values['fullWidthImage']} id="fullWidthImage" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1600x378px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'fullWidthLinkType', multipleNameKey: 'fullWidthLink' }} setSearch={setSearch} />
        </>
    )
}

export default FullWidthBanner6Tab
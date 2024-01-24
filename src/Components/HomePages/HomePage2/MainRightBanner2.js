import FileUploadField from '../../InputFields/FileUploadField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';

const MainRightBanner2 = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name="mainContentRightBanner2Image" showImage={values['mainContentRightBanner2Image']} title='Image' id="mainContentRightBanner2Image" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('376x630px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRightBanner2LinkType', multipleNameKey: 'mainRightBanner2Link' }} setSearch={setSearch} />
        </>
    )
}

export default MainRightBanner2
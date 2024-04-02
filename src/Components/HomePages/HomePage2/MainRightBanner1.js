import FileUploadField from '../../InputFields/FileUploadField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';

const MainRightBanner1 = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name="mainContentRightBanner1Image" showImage={values['mainContentRightBanner1Image']} title='Image' id="mainContentRightBanner1Image" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('376x792px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'mainRightBanner1LinkType', multipleNameKey: 'mainRightBanner1Link' }} setSearch={setSearch} />
        </>
    )
}

export default MainRightBanner1
import FileUploadField from '../../InputFields/FileUploadField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';

const TwoColumnBanner1 = ({ values, setFieldValue, bannerName, imageName, subTitle, productData, categoryData, selectNameKey, multipleNameKey, setSearch }) => {
    return (
        <>
            <FileUploadField name={imageName} showImage={values[imageName]} title='Image' id={imageName} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('781x406px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: selectNameKey, multipleNameKey: multipleNameKey }} setSearch={setSearch} />
        </>
    )
}

export default TwoColumnBanner1
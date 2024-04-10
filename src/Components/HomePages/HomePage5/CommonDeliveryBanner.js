import FileUploadField from '../../InputFields/FileUploadField'
import CommonRedirect from '../CommonRedirect'

const CommonDeliveryBanner = ({ values, setFieldValue, bannerName, imageName, selectNameKey, multipleNameKey, productData,
    categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name={imageName} showImage={values[imageName]} title='Image' id={imageName} type="file" values={values} setFieldValue={setFieldValue} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: selectNameKey, multipleNameKey: multipleNameKey }} setSearch={setSearch} />
        </>
    )
}

export default CommonDeliveryBanner
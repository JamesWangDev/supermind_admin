import FileUploadField from '../../InputFields/FileUploadField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'

const FullWidthBanner = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name="fullWidthImage" title='Image' showImage={values['fullWidthImage']} id="fullWidthImage" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1600x415px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'fullWidthLinkType', multipleNameKey: 'fullWidthLink' }} setSearch={setSearch} />
            <CheckBoxField name={`[content][full_width_banner][status]`} title="Status" />
        </>
    )
}

export default FullWidthBanner
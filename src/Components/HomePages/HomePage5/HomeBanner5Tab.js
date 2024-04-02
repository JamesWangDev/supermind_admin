import FileUploadField from '../../InputFields/FileUploadField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'

const HomeBanner5Tab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <FileUploadField name="homeBannerImage" title='Image' showImage={values['homeBannerImage']} id="homeBannerImage" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1600x218px')} />
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
            <CheckBoxField name="[content][home_banner][status]" title="Status" />
        </>
    )
}

export default HomeBanner5Tab
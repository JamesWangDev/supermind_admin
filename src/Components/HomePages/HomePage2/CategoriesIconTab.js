import CheckBoxField from '../../InputFields/CheckBoxField'
import FileUploadField from '../../InputFields/FileUploadField'

const CategoriesIconTab = ({ values, setFieldValue }) => {
    return (
        <>
            <FileUploadField name="categoriesIconImage" title='Image' id="categoriesIconImage" showImage={values['categoriesIconImage']} type="file" values={values} setFieldValue={setFieldValue} />
            <CheckBoxField name={`[content][categories_icon_list][status]`} title="Status" />

        </>
    )
}

export default CategoriesIconTab
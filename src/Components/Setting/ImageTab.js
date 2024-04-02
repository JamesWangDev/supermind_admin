import FileUploadField from "../InputFields/FileUploadField";

const ImageTab = ({ values, setFieldValue }) => {
  return (
    <>
      <FileUploadField name="site_logo" id="site_logo" type="file" values={values} setFieldValue={setFieldValue} />
      <FileUploadField name="site_favicon" id="site_favicon" type="file" values={values} setFieldValue={setFieldValue} />
    </>
  );
};

export default ImageTab;

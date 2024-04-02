import React from "react";
import FileUploadField from "../InputFields/FileUploadField";
import { getHelperText } from "../../Utils/CustomFunctions/getHelperText";

const ImagesTab = ({ values, setFieldValue, errors, updateId }) => {
  return (
    <>
      <FileUploadField errors={errors} name="product_thumbnail_id" id="product_thumbnail_id" title="Thumbnail" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} helpertext={getHelperText('600x600px')} />
      <FileUploadField errors={errors} name="product_galleries_id" id="product_galleries_id" title="Images" type="file" multiple={true} values={values} setFieldValue={setFieldValue} updateId={updateId} helpertext={getHelperText('600x600px')} />
      <FileUploadField errors={errors} name="size_chart_image_id" id="size_chart_image_id" title="SizeChart" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} helpertext={'*Upload an image showcasing the size chart tailored for fashion products. A table format image is suggested for easy reference.'} />
    </>
  );
};

export default ImagesTab;

import { ErrorMessage } from "formik";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import { Input } from "reactstrap";
import InputWrapper from "../../Utils/HOC/InputWrapper";
import { handleModifier } from "../../Utils/Validation/ModifiedErrorMessage";
import AttachmentModal from "../Attachment/AttachmentModal";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const FileUploadField = ({ values, updateId, setFieldValue, errors, multiple, loading, showImage, ...props }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const storeImageObject = props.name.split("_id")[0];
  useEffect(() => {
    if (values) {
      multiple ? setSelectedImage(values[storeImageObject]) : values[storeImageObject] ? setSelectedImage(loading ? null : [values[storeImageObject]]) : setSelectedImage([])
      setFieldValue(values?.props?.name);
    }
  }, [values[storeImageObject], loading]);
  useEffect(() => {
    if (props?.uniquename) {
      setSelectedImage(loading ? null : [props?.uniquename])
      setFieldValue(props?.name, props?.uniquename?.id);
    }
  }, [props?.uniquename, loading, showImage]);

  const removeImage = (result) => {
    if (props.name) {
      setFieldValue(props?.name, Array.isArray(values[props.name]) ? values[props.name].filter((el) => el !== result.id) : null); setSelectedImage(selectedImage.filter((elem) => elem.id !== result.id));
      setFieldValue(storeImageObject, '')
    }
  }
  const ImageShow = () => {
    return <>
      {selectedImage?.length > 0 &&
        selectedImage?.map((result, i) => (
          <li key={i}>
            <Image src={result?.original_url} className="img-fluid" width={100} height={100} alt="remove-icon" priority />
            <p>
              <RiCloseLine className="remove-icon" onClick={() => removeImage(result)}
              />
            </p>
          </li>
        ))
      }
    </>;
  }
  return (
    <>
      <ul className={`image-select-list`}>
        <li className="choosefile-input">
          <Input
            {...props}
            onClick={(event) => {
              event.preventDefault();
              setModal(props.id);
            }}
          />
          <label htmlFor={props.id}>
            <RiAddLine />
          </label>
        </li>

        <ImageShow />
        <AttachmentModal modal={modal == props.id} name={props.name} multiple={multiple} values={values} setModal={setModal} setFieldValue={setFieldValue} setSelectedImage={setSelectedImage} showImage={showImage} redirectToTabs={true} />
      </ul>
      <p className="help-text">{props?.helpertext}</p>
      {errors?.[props?.name] ? <ErrorMessage name={props.name} render={(msg) => <div className="">{t(handleModifier(storeImageObject).split(' ').join(""))} {t('IsRequired')}</div>} /> : null}
    </>
  );
};

export default InputWrapper(FileUploadField);

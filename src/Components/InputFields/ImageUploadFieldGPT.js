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
import Btn from "@/Elements/Buttons/Btn";
import axios from "axios";
import { createAttachment } from "../../Utils/AxiosUtils/API";
import useCreate from "../../Utils/Hooks/useCreate";

const ImageUploadFieldGPT = ({ values, updateId, setFieldValue, errors, multiple, loading, showImage, ...props }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const storeImageObject = props.name.split("_id")[0];
  const { mutate, isLoading, data: attachedImg } = useCreate(createAttachment, false, false);
  const [isImgGenerating, setIsImgGenerating] = useState(false);
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
  useEffect(() => {
    if(!isLoading && attachedImg) {
        if(multiple) {
            setFieldValue(props?.name, [attachedImg.data[0].id]);
            setSelectedImage(attachedImg.data);
        } else {
            setFieldValue('product_galleries_id', [attachedImg.data[0].id]);
            setFieldValue(props?.name, attachedImg.data[0].id);
            storeImageObject && setFieldValue(storeImageObject, attachedImg.data[0]);
        }
    }
  }, [isLoading, attachedImg])

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

  async function getImageBlobFromURL(url) {
        //Fetch image data from url 
        const imageData = await fetch('https://proxy.cors.sh/' + url, {headers: {
            'x-cors-api-key': "temp_368b76b526936e794eb3e109cc7fb026"
        }});
        //Create blob of image data
        const imageBlob = await imageData.blob();
        return new File([imageBlob], `${values['name']}.png`, { type: "image/png" });
  };
  const generateThumbnail = async () => {
    try {
        if(!values['name']) {
            alert("Please enter supermind name...");
            return;
        }
        if(!values['short_description']) {
            alert("Please enter short description...");
            return;
        }
        if(!values['description']) {
            alert("Please enter description...");
            return;
        }
        const prompt = values['name'] + "\n" + values['short_description'] + "\n" + values['description']
        setIsImgGenerating(true);
        const response = await axios.post('https://proxy.cors.sh/'+'https://api.openai.com/v1/images/generations', {
          prompt: prompt,
          model: 'dall-e-2',
          response_format: "url",
          n: 1,
          size: '512x512'
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
            'x-cors-api-key': "temp_368b76b526936e794eb3e109cc7fb026"
          }
        });

        const file = await getImageBlobFromURL(response.data.data[0].url);
        let formData = new FormData();
        formData.append(`attachments[0]`, file);
        mutate(formData);
        setIsImgGenerating(false);
    } catch (error) {
        console.error('Error fetching image:', error);
        alert("Error fetching image. Please try again")
        setIsImgGenerating(false);
    }
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
      <div className="d-flex w-100 justify-content-between align-items-center">
          <p className="help-text">{props?.helpertext}</p>
        <Btn
            title="Generate from DALL-E"
            className="btn justify-content-center"
            onClick={generateThumbnail}
            loading={isImgGenerating || isLoading}
        />
      </div>
      {errors?.[props?.name] ? <ErrorMessage name={props.name} render={(msg) => <div className="">{t(handleModifier(storeImageObject).split(' ').join(""))} {t('IsRequired')}</div>} /> : null}
    </>
  );
};

export default InputWrapper(ImageUploadFieldGPT);

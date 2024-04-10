import { ErrorMessage } from "formik";
import { RiCloseLine } from "react-icons/ri";
import { handleModifier } from "../../Utils/Validation/ModifiedErrorMessage";
import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const MultiSelectInput = ({ values, name, selectedItems, setIsComponentVisible, setFieldValue, setSelectedItems, errors, getValuesKey }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const RemoveSelectedItem = (id, item) => {
    let temp = values[name];
    if (temp.length > 0) {
      if (Array.isArray(temp)) {
        temp?.splice(temp.indexOf(id), 1)
        setFieldValue(name, temp);
      } else {
        setFieldValue(name, item[getValuesKey] == values[name] ? undefined : item[getValuesKey]);
      }
    } else if (temp == id) {
      setFieldValue(name, undefined);
    }
  };
  return (
    <>
      <div className={`bootstrap-tagsinput form-select`} onClick={() => setIsComponentVisible((p) => p !== name && name)}>
        {(Array.isArray(values[name]) && values[name].length > 0 && selectedItems?.length > 0) || (!Array.isArray(values[name]) && values[name]) ? (
          selectedItems?.map((item, i) => (
            <span className="tag label label-info" key={i}>
              {item.name}
              <a className="ms-2 text-white">
                <RiCloseLine
                  onClick={(e) => {
                    e.stopPropagation();
                    RemoveSelectedItem(item[getValuesKey], item);
                    setSelectedItems((p) => p.filter((elem) => elem[getValuesKey] !== item[getValuesKey]));
                    setFieldValue(name, values[name].filter((elem) => elem[getValuesKey] !== item[getValuesKey]))
                  }}
                />
              </a>
            </span>
          ))
        ) : (
          <span>{t("Select")}</span>
        )}
      </div>
      <ErrorMessage name={name} render={(msg) => <div className="invalid-feedback d-block">{t(handleModifier(name))} {t("IsRequired")}</div>} />
    </>
  );
};

export default MultiSelectInput;

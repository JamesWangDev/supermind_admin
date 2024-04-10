import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import { useContext } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

const CategoryOptions = ({ data, showList, setShowList, setFieldValue, setPath, name, values, getValuesKey }) => {

  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  const handleSelect = (item) => {
    if (Array.isArray(values[name])) {
      if (values[name].includes(item[getValuesKey])) {
        setFieldValue(name, values[name].includes(item[getValuesKey]) ? values[name].filter((elem) => elem !== item[getValuesKey]) : values[name])
      } else {
        setFieldValue(name, [...values[name], item[getValuesKey]])
      }
    } else {
      setFieldValue(name, item[getValuesKey] == values[name] ? undefined : item[getValuesKey]);
    }
  }
  return (
    <>
      {(showList || data)?.map((item, i) => (
        <li key={i}>
          {item.image && <Image src={item.image} className="img-fluid category-image" alt={item.name} height={80} width={80}
          />}
          {item.name}
          <a className={`select-btn ${Array.isArray(values[name]) ? values[name]?.includes(item[getValuesKey]) ? "selected" : ""
            : item[getValuesKey] == values[name] ? "selected" : ""}`}
            onClick={() => handleSelect(item)}>
            {/* To show the Select text */}
            {Array.isArray(values[name]) ? values[name]?.includes(item[getValuesKey]) ? t("Selected") : t("Select")
              : item[getValuesKey] == values[name] ? t("Selected") : t("Select")}
          </a>
          {Boolean(item.subcategories?.length) && (
            <a
              className="right-arrow"
              onClick={() => { setShowList(item.subcategories); setPath((prev) => [...prev, item]) }}>
              <RiArrowRightSLine />
            </a>
          )}
        </li>
      ))}
    </>
  );
};

export default CategoryOptions;

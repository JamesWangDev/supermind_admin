import React, { useContext, useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import CategoryOptions from "./CategoryOptions";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const MultiDropdownBox = ({ setIsComponentVisible, data, setFieldValue, values, name, getValuesKey, isComponentVisible, onPressOption }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [path, setPath] = useState([]);
  const [showList, setShowList] = useState();
  useEffect(() => {
    if (data) { setShowList(data) }
    if (isComponentVisible == false) { setPath([]) }
  }, [data, isComponentVisible])
  return (
    <div className={`select-category-box ${isComponentVisible == name && data ? 'show' : ""}`}>
      <nav className="category-breadcrumb" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li
            className="breadcrumb-item"
            onClick={() => {
              setPath([]);
              setShowList(data);
            }}>
            <a>{t("All")}</a>
          </li>
          {path.map((item, key) => (
            <li className={`breadcrumb-item ${key + 1 === path.length ? "active" : ""}`} key={key}>
              <a
                onClick={() => {
                  setShowList(item.subcategories);
                  setPath((p) => p.slice(0, key + 1));
                }}>
                {item.name}
              </a>
            </li>
          ))}
        </ol>
        <a
          className="close-btn"
          onClick={(e) => {
            e.stopPropagation();
            setPath([]);
            setIsComponentVisible(false);
          }}>
          <RiCloseLine />
        </a>
      </nav>
      <div className="category-lisitng">
        <ul>{data && <CategoryOptions onPressOption={onPressOption} data={data} level={0} showList={showList} setShowList={setShowList} setFieldValue={setFieldValue} path={path} setPath={setPath} setIsComponentVisible={setIsComponentVisible} name={name} values={values} getValuesKey={getValuesKey} />}</ul>
      </div>
    </div>
  );
};

export default MultiDropdownBox;

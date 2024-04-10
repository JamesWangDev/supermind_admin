import React, { useContext, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { RiSearchLine } from "react-icons/ri";
import { Form, Input } from "reactstrap";
import SettingContext from "../../Helper/SettingContext";
import useOutsideDropdown from "../../Utils/Hooks/CustomHooks/useOutsideDropdown";
import AllMenus from "./AllMenus";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const SearchBar = ({ openSearchBar, setOpenSearchBar }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { searchSidebarMenu } = useContext(SettingContext);
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  const [input, setInput] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [searchArr, setSearchArray] = useState([]);
  useEffect(() => {
    const suggestionArray = [];
    const getAllLink = (item, icon) => {
      if (item.children) {
        item.children.map((ele) => {
          getAllLink(ele, icon);
        });
      } else {
        suggestionArray.push({ icon: icon, title: item.title, path: item.path });
      }
    };

    searchSidebarMenu.forEach((item) => {
      getAllLink(item, item.icon);
    });
    setMenuList(suggestionArray);
  }, [input]);
  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value !== "") {
      const search = menuList.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
      setSearchArray(search);
      setIsComponentVisible(true)
    } else {
      setSearchArray([]);
      setIsComponentVisible(false)
    }
  };
  return (
    <Form className={`form-inline search-full ${openSearchBar ? "open" : ""}`}>
      <div className="w-100 position-relative">
        <div className="search-icon d-md-flex d-none">
          <RiSearchLine />
        </div>
        <div className="Typeahead Typeahead--twitterUsers">
          <div className="u-posRelative" ref={ref}>
            <Input value={input} className="demo-input Typeahead-input form-control-plaintext w-100" type="text" placeholder={t("SearchFastkart") + ".."} name="search-bar" title="searchbar" onChange={handleChange} />
            <FiX className="close-search" onClick={() => setOpenSearchBar(false)} />
            <div className="spinner-border Typeahead-spinner" role="status">
              <span className="sr-only">{t("Loading")}...</span>
            </div>
          </div>
          <div className="Typeahead-menu" />
        </div>
      </div>
      <div className={`onhover-dropdown ${!isComponentVisible ? "" : "open"}`}>
        {searchArr.length == 0 ? (
          <div className="Typeahead-menu">
            <div className="tt-dataset tt-dataset-0">
              <div className="EmptyMessage">
                {t("OppsTherearenoresultfound")}
              </div>
            </div>
          </div>
        ) : (
          <ul><AllMenus menu={searchArr} /></ul>
        )}
      </div>
    </Form>
  );
};

export default SearchBar;
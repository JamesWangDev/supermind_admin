import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const TabTitle = ({ activeTab, setActiveTab, titleList, errors, touched }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Nav tabs className="nav-pills mb-3">
      {titleList.map((elem, i) => (
        <NavItem key={i} className={elem.inputs?.filter((item) => errors[item] && touched[item]).length ? "is-invalid border border-danger" : ""}>
          <NavLink
            className={activeTab == String(i + 1) ? "active" : ""}
            onClick={() => {
              setActiveTab(String(i + 1));
            }}>
            {elem.icon && elem.icon}
            {t(elem.title)}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default TabTitle;

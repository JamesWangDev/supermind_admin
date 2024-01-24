import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { QuickLinksData } from "../../Data/QuickLinks";
import Link from "next/link";

const QuickLinks = ({ isComponentVisible, setIsComponentVisible }) => {
    const { t } = useTranslation("common");
    
    return(
        <li className="d-inline-block">
            <div className="quick-dropdown-box dropdown">
                <div className={`btn btn-outline dropdown-toggle ${isComponentVisible === 'quickLinks' ? 'active' : ''}`}  onClick={() =>
            setIsComponentVisible((prev) =>
              prev !== "quickLinks" ? "quickLinks" : ""
            )
          }>
                    {t("QuickLinks")}
                    <FaChevronDown />
                </div>
                <div className={`dropdown-menu ${isComponentVisible === 'quickLinks' ? 'active' : ''}`}>
                    <div className="dropdown-title">
                        <h4>{t("QuickLinks")}</h4>
                    </div>
                    <ul className={`dropdown-list`}>
                        {QuickLinksData.map((quickLink, i) => (
                            <li key={i}>
                                <Link href={quickLink.path} index={i}>
                                    <div className="svg-box">
                                        {quickLink.icon}
                                    </div>
                                    <span>{t(quickLink.title)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
        </li>
    )
}

export default QuickLinks;
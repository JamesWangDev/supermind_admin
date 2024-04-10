
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";
import React, { useContext } from "react";

const AllMenus = ({ menu }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <>
      {menu?.map((elem, i) => (
        <li key={i}>
          <Link
            className={`${
              elem.children || elem.type == "link" ? "main-content" : ""
            }`}
            href={elem.type !== "sub" ? elem?.path : ""}
          >
            {elem.icon} {t(elem.title)}
          </Link>
        </li>
      ))}
    </>
  );
};

export default AllMenus;

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiTranslate2 } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";

const Language = ({ isComponentVisible, setIsComponentVisible }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { i18n } = useTranslation(i18Lang, "common");
  const [selectedLang, setSelectedLang] = useState({});
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // To change Language
  const handleChangeLang = (value) => {
    setSelectedLang(value);
    i18n.changeLanguage(value.icon);
  };
  const langData = [
    { LanuageName: "English", lang: "en", icon: "us" },
    { LanuageName: "Franch", lang: "fr", icon: "fr" },
    { LanuageName: "Spanish", lang: "es", icon: "es" },
    { LanuageName: "Arabic", lang: "ar", icon: "ar" },
  ];
  const isLangIncludes = langData.find((lang) => pathname.includes(lang.lang));
  const splitPathname = isLangIncludes
    ? pathname.split(isLangIncludes.lang)[1]
    : "";
  useEffect(() => {
    setSelectedLang(langData.find((elem) => elem.icon == i18Lang));
  }, []);

  return (
    <li className="profile-nav onhover-dropdown">
      <div className="language-box">
        <RiTranslate2
          onClick={() =>
            setIsComponentVisible((prev) =>
              prev !== "language" ? "language" : ""
            )
          }
        />
      </div>
      <ul
        className={`language-dropdown profile-dropdown onhover-show-div ${
          isComponentVisible == "language" ? "active" : ""
        }`}
      >
        {langData?.map((data, i) => (
          <li
            key={i}
            onClick={() => handleChangeLang(data)}
            className={`${selectedLang?.lang == data.lang ? "active" : ""}`}
          >
            <Link
              href={`/${data.lang}/${splitPathname}${
                searchParams ? "?" + searchParams : ""
              }`}
            >
              <div className={`iti-flag ${data.icon}`}></div>
              {data.LanuageName}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Language;

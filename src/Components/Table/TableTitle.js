import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import Btn from "../../Elements/Buttons/Btn";
import Pluralize from "../../Utils/CustomFunctions/Pluralize";
import NoSsr from "../../Utils/HOC/NoSsr";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import ImportExport from "./ImportExport";

const TableTitle = ({ moduleName, onlyTitle, type, filterHeader, importExport, refetch }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const pathname = usePathname();
  const [create] = usePermissionCheck(["create"]);
  return (
    <div className="title-header option-title">
      <h5>{filterHeader?.customTitle ? t(filterHeader?.customTitle) : t(Pluralize(moduleName))}</h5>
      {importExport && <ImportExport importExport={importExport} moduleName={Pluralize(moduleName)} refetch={refetch} />}
      <NoSsr>
        {filterHeader?.customFilter && filterHeader?.customFilter}
        {create && !onlyTitle && (
          <Btn className="align-items-center btn-theme add-button" title={t("Add") + " " + t(moduleName)} onClick={() =>
            type == "post" && (moduleName.toLowerCase()) == "tag"
              ?
              router.push(`/${i18Lang}/${pathname.split("/")[2]}/tag/create`)
              :
              type == 'post'
                ?
                router.push(`/${i18Lang}/${pathname.split("/")[2]}/category/create`)
                :
                router.push(`/${i18Lang}/${pathname.split("/")[2]}/create`)
          }>
            <FiPlus />
          </Btn>
        )}
      </NoSsr>
    </div>
  );
};

export default TableTitle;

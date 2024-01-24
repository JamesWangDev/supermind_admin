import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";


const TableLoader = ({ fetchStatus }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <>
      {fetchStatus == "fetching" && (
        <tbody>
          <tr className="table-loader">
            <td>{t("Pleasewait")}...</td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default TableLoader;

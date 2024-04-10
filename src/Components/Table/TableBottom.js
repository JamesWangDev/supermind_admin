import React, { useContext } from "react";
import Pagination from "./Pagination";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const TableBottom = ({ current_page, total, per_page, setPage }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <div className="card-bottom">
      {/* {total > 0 && (
        <h6>
          {t("Showing")} {(current_page - 1) * per_page + 1} {t("to")} {total > current_page * per_page ? current_page * per_page : total} {t("of")} {total} {t("entries")}
        </h6>
      )} */}
      <Pagination current_page={current_page} total={total} per_page={per_page} setPage={setPage} />
    </div>
  );
};

export default TableBottom;

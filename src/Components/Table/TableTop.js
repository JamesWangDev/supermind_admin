import React, { useContext, useEffect, useState } from "react";

import { Form, Input, Label } from "reactstrap";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import TableDeleteOption from "./TableDeleteOption";
import TableDuplicateOption from "./TableDuplicateOption";
import CalenderFilter from './CalenderFilter'
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const TableTop = (props) => {
  const { setPaginate, setSearch, paginate, url, isCheck, setIsCheck, isReplicate, refetch, dateRange, date, setDate, filterHeader, keyInPermission } = props
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"], keyInPermission ? keyInPermission : "");
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [input, setInput] = useState();
  const [text, setText] = useState("");
  const [tc, setTc] = useState(null);
  useEffect(() => {
    setInput(paginate);
  }, [paginate]);

  const onChange = (text) => {
    if (tc) clearTimeout(tc);
    setTc(setTimeout(() => setSearch(text), 1000));
  };
  return (
    <div className="show-box">
      {filterHeader?.noPageDrop !== true && <div className="me-auto">
        <Form className="entries-form" onSubmit={(e) => { e.preventDefault() }}>
          <Label>
            {t("Show")}:
            <select className="form-control" onChange={(e) => setPaginate(e.target.value)}>
              <option>15</option> <option>25</option> <option>50</option> <option>100</option>
            </select>
          </Label>
          <span>{t("Entries")}</span>
          {
            destroy && isCheck?.length > 0 &&
            <TableDeleteOption url={url} setIsCheck={setIsCheck} isCheck={isCheck} />
          }
          {edit && isCheck?.length > 0 && isReplicate && <TableDuplicateOption isReplicate={isReplicate} url={url} isCheck={isCheck} setIsCheck={setIsCheck} refetch={refetch} />}
        </Form>

      </div>}
      {dateRange && <CalenderFilter date={date} setDate={setDate} />}
      {filterHeader?.noSearch !== true && <div className="role-search">
        <Label htmlFor="role-search" className="form-label"> {t("Search")}:</Label>

        <Input type="search" className="form-control" id="role-search" value={text}
          onChange={(e) => { onChange(e.target.value); setText(e.target.value) }} />
      </div>}
    </div>
  );
};

export default TableTop;

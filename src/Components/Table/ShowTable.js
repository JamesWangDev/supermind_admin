import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill, RiLock2Line } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";
import { Input, Table } from "reactstrap";
import SettingContext from "../../Helper/SettingContext";
import { dateFormate } from "../../Utils/CustomFunctions/DateFormate";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import Avatar from "../CommonComponent/Avatar";
import NoDataFound from "../CommonComponent/NoDataFound";
import Options from "./Options";
import Status from "./Status";
import TableLoader from "./TableLoader";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const ShowTable = ({ current_page, per_page, mutate, isCheck, setIsCheck, url, sortBy, setSortBy, headerData, fetchStatus, moduleName, type, redirectLink, refetch, keyInPermission }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { convertCurrency } = useContext(SettingContext);
  const [edit] = usePermissionCheck(["edit", "destroy"]);
  const [colSpann, setColSpann] = useState();
  const router = useRouter();
  const orignalDataLength = headerData?.data?.filter((elem) => elem.system_reserve == "1").length;
  /* Select All Data */
  const handleChange = (result) => {
    if (isCheck?.includes(result.id)) {
      let removeValue = [...isCheck];
      removeValue.splice(removeValue.indexOf(result.id), 1);
      setIsCheck(removeValue);
    } else setIsCheck([...isCheck, result.id]);
  };
  /* Sorting Data */
  const handleSort = (title) => {
    setSortBy({ ...sortBy, field: title, sort: `${sortBy.sort == "asc" ? "desc" : "asc"}` });
  };
  // Calculation For Row Head
  const countColSpan = () => {
    let totalColumn = headerData?.column?.length || 0;
    let isSerialNo = headerData.isSerialNo !== false ? 1 : 0;
    let isCheckbox = headerData?.checkBox ? 1 : 0;
    let isOption = headerData?.isOption ? 1 : 0;
    setColSpann(totalColumn + isSerialNo + isCheckbox + isOption);
  };
  // On mount calling the function
  useEffect(() => {
    countColSpan();
  }, []);
  // Clicking on Row data
  const isHandelEdit = (e, tableData, headerData) => {
    e.preventDefault();
    if (!headerData.noEdit) {
      if (headerData?.optionHead?.type == "View") {
        redirectLink ? redirectLink(tableData) : "";
      } else if (tableData.system_reserve !== "1" && headerData?.isOption) {
        tableData?.id && router.push(`${moduleName.toLowerCase()}/update/${tableData.id}`);
      }
    }
  };
  // Geting Sub-objects data
  const getSubKeysData = (mainData, subKey) => {
    if (typeof mainData === "object" && subKey.length > 0) {
      const [key, ...remainingSubKey] = subKey;
      return getSubKeysData(mainData?.[key], remainingSubKey);
    } else {
      return mainData;
    }
  };
  return (
    <Table id="table_id" className={`role-table ${headerData?.noCustomClass ? "" : "refund-table"} all-package theme-table datatable-wrapper`}>
      <TableLoader fetchStatus={fetchStatus} />
      <thead>
        <tr>
          <>
            {headerData?.checkBox && (
              <th className="sm-width">
                <Input
                  className="custom-control-input checkbox_animated"
                  type={"checkbox"}
                  checked={headerData?.data?.length > 0 && isCheck?.length == headerData?.data?.length}
                  disabled={orignalDataLength == headerData?.data?.length ? true : false}
                  onChange={(e) => {
                    e.target.checked ? setIsCheck([...headerData?.data?.map((item) => item.id)]) : setIsCheck([]);
                  }}
                />
              </th>
            )}
            {headerData.isSerialNo !== false && <th className="sm-width">{t("No")}</th>}
            {/* Table Heading */}
            {headerData?.column.map((elem, i) => (
              <th key={i} className={elem.class ? elem.class : ""} onClick={() => (elem.sorting ? handleSort(elem.apiKey) : false)}>
                {t(elem.title)}
                {elem.sorting ? <div className="filter-arrow">{sortBy?.field == elem.apiKey && sortBy.sort == "desc" ? <RiArrowUpSFill /> : <RiArrowDownSFill />}</div> : ""}
              </th>
            ))}
            {headerData?.isOption && <th>{t(headerData?.optionHead?.title)}</th>}
          </>
        </tr>
      </thead>
      <tbody>
        {headerData?.data.length > 0 ? (
          headerData?.data?.map((tableData, index) => (
            <tr key={index}>
              {headerData?.checkBox && (
                <td className="sm-width">
                  <Input className="custom-control-input checkbox_animated" checked={headerData?.data?.[index]?.system_reserve !== "1" && isCheck?.includes(tableData?.id)} disabled={headerData?.data?.[index]?.system_reserve == "1" ? true : false} onChange={(e) => handleChange(tableData)} type={"checkbox"} />
                </td>
              )}
              {headerData.isSerialNo !== false && (
                <td className="sm-width" onClick={(e) => isHandelEdit(e, headerData, tableData)}>
                  {index + 1 + (current_page - 1) * per_page}
                </td>
              )}
              <>
                {headerData?.column.map((item, i) => (
                  <td className={item.type == "image" ? "sm-width" : ""} key={i} onClick={(e) => item.type !== "switch" && isHandelEdit(e, tableData, headerData)}>
                    {item.type == "date" ? (
                      <>{dateFormate(tableData[item?.apiKey])}</>
                    ) : item.type == "image" ? (
                      <Avatar data={tableData[item?.apiKey]} placeHolder={item.placeHolderImage} name={tableData} />
                    ) : item.type == "price" ? (
                      <>{convertCurrency(tableData[item?.apiKey])}</>
                    ) : item.type == "rating" ? (
                      <Rating initialValue={tableData.rating} readonly={true} size={20} fillColor="#0da487" />
                    ) : item.type == "switch" ? (
                      <>{!edit || headerData?.data?.[index].system_reserve == "1" ? <Status data={tableData} url={url} disabled={true} /> : <Status data={tableData} url={item.url ? item.url : url} apiKey={item.url && item.apiKey} />}</>
                    ) : item.type == "stock_status" ? (
                      <>
                        <div className={`status-${tableData[item?.apiKey]}`}>
                          <span>{tableData[item?.apiKey]?.toString().includes("_") ? tableData[item?.apiKey]?.replace(/_/g, " ") : " "}</span>
                        </div>
                      </>
                    ) : item?.subKey ? (
                      <>{getSubKeysData(tableData[item?.apiKey], item?.subKey)}</>
                    ) : (
                      <>{tableData[item?.apiKey]}</>
                    )}
                  </td>
                ))}
              </>
              {headerData?.isOption && <td>{headerData?.data?.[index]?.system_reserve == "1" ? <RiLock2Line /> : <Options fullObj={tableData} mutate={mutate} moduleName={moduleName} type={type} optionPermission={headerData} refetch={refetch} keyInPermission={keyInPermission} />}</td>}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={colSpann}>
              <NoDataFound noImage={true} />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ShowTable;

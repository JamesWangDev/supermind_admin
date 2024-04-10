import { useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import TableWarper from "../../../Utils/HOC/TableWarper";
import ShowTable from "../../Table/ShowTable";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";

const RecentOrders = ({ data, ...props }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const router = useRouter();
  const headerObj = {
    checkBox: false,
    isOption: true,
    noEdit: false,
    isSerialNo: false,
    optionHead: { title: "Action", type: "View", redirectUrl: "/order/details", modalTitle: t("Orders") },
    noCustomClass: true,
    column: [
      { title: "Number", apiKey: "order_number" },
      { title: "Date", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
      { title: "Name", apiKey: "consumer", subKey: ["name"] },
      { title: "Amount", apiKey: "total", type: "price" },
      { title: "Payment", apiKey: "payment_status" },
    ],
    data: data || [],
  };
  let orders = useMemo(() => {
    return headerObj?.data?.filter((element) => {
      element.order_number = <span className="fw-bolder">#{element.order_number}</span>;
      element.payment_status = (
        <div className={`status-${element?.payment_status.toString().toLowerCase() || ""}`}>
          <span>{element?.payment_status}</span>
        </div>
      );
      return element;
    });
  }, [headerObj?.data]);
  headerObj.data = headerObj ? orders : [];
  const redirectLink = (data) => {
    const order_number = data?.order_number?.props?.children?.[1];
    router.push(`/${i18Lang}/order/details/${order_number}`);
  };
  return <ShowTable {...props} headerData={headerObj} redirectLink={redirectLink} />;
};

export default TableWarper(RecentOrders);

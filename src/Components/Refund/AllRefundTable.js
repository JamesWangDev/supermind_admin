import React, { useContext } from 'react'
import TableWarper from '../../Utils/HOC/TableWarper'
import Loader from '../CommonComponent/Loader';
import ShowTable from '../Table/ShowTable';
import { RefundAPI } from '../../Utils/AxiosUtils/API';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const AllRefundTable = ({ data, ...props }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const headerObj = {
        checkBox: false, isOption: true, noEdit: true, isSerial: true,
        optionHead: { title: "Action", type: 'View', url: RefundAPI, message: "Refund Status Updated Successfully", showModalData: data, modalTitle: t("Refund"), permissionKey: "refund" },
        column: [
            { title: "OrderNumber", apiKey: "order_id" },
            { title: "ConsumerName", apiKey: "consumer_name", sorting: true, sortBy: "desc" },
            { title: "Reason", apiKey: "reason" },
            { title: "Status", apiKey: "refund_status" },
            { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
        ],
        data: data || []
    };
    let refunds = headerObj?.data?.filter((element) => {
        element.consumer_name = element?.user?.name
        element.order_id = <span className="fw-bolder">#{element?.order?.order_number}</span>
        element.refund_status = element.status ? <div className={`status-${element.status}`}><span>{element.status.replace(/_/g, " ")}</span></div> : '-';
        return element;
    });
    headerObj.data = headerObj ? refunds : [];
    if (!data) return <Loader />;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWarper(AllRefundTable)
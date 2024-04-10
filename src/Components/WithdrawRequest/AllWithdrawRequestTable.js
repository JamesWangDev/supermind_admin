import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import TableWarper from '../../Utils/HOC/TableWarper'
import Loader from '../CommonComponent/Loader';
import ShowTable from '../Table/ShowTable';
import { WithdrawRequestAPI } from '../../Utils/AxiosUtils/API';
import { useTranslation } from '@/app/i18n/client';

const AllWithdrawRequestTable = ({ data, ...props }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const headerObj = {
        checkBox: false,
        isOption: true,
        optionHead: { title: "Action", type: 'View', url: WithdrawRequestAPI, message: "Withdraw Status Updated Successfully", showModalData: data, modalTitle: t("Withdrawal"), permissionKey: "withdraw_request" },
        column: [
            { title: "ConsumerName", apiKey: "vendor_name" },
            { title: "Amount", apiKey: "amount", type: 'price' },
            { title: "Status", apiKey: "withdrawal_status" },
            { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
        ],
        data: data || []
    };
    let withdrawals = headerObj?.data?.filter((element) => {
        element.vendor_name = element?.user?.name
        element.withdrawal_status = element.status ? <div className={`status-${element.status}`}><span>{element.status}</span></div> : '-'
        return element;
    });
    headerObj.data = withdrawals ? withdrawals : []

    if (!data) return <Loader />;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWarper(AllWithdrawRequestTable)
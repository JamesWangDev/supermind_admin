import TableWarper from '../../../Utils/HOC/TableWarper'
import ShowTable from '../../Table/ShowTable';

const TopStore = ({ data, ...props }) => {
    const headerObj = {
        checkBox: false,
        isOption: false,
        noEdit: false,
        isSerialNo: false,
        column: [
            { title: "StoreName", apiKey: "store_name" },
            { title: "Orders", apiKey: "orders_count" },
            { title: "Earning", apiKey: "order_amount" },
        ],
        data: data || []
    };
    return (
        <>
            <ShowTable {...props} headerData={headerObj} />
        </>
    )
}

export default TableWarper(TopStore)
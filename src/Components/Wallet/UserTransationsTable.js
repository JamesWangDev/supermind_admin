import { useMemo } from 'react';
import TableWarper from '../../Utils/HOC/TableWarper'
import ShowTable from '../Table/ShowTable';

const UserTransationsTable = ({ data, ...props }) => {

    const headerObj = {
        column: [
            { title: "Amount", apiKey: "amount" },
            { title: "Type", apiKey: "type" },
            { title: "Remark", apiKey: "detail" },
            { title: "CreateAt", apiKey: "created_at", type: "date" },
        ],
        data: data?.transactions?.data || []
    };
    let orders = useMemo(() => {
        return headerObj?.data?.filter((element) => {     
            element.type = element.type ? <div className={`${element.type=='credit'? 'status-credit':'status-debit'}`}><span>{element?.type}</span></div> : '-';   
            return element;
        });
    }, [headerObj?.data]);
    headerObj.data = headerObj ? orders : [];
    if (!data) return null;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
};

export default TableWarper(UserTransationsTable)
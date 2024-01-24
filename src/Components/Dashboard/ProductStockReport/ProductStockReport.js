import placeHolderImage from '../../../../public/assets/images/placeholder.png';
import TableWarper from '../../../Utils/HOC/TableWarper'
import ShowTable from '../../Table/ShowTable'

const ProductStockReport = ({ data, ...props }) => {
    const headerObj = {
        checkBox: false,
        isOption: true,
        noEdit: false,
        isSerialNo: false,
        noDelete: true,
        editRedirect: "product",
        optionHead: { title: "Action" },
        noCustomClass: true,
        column: [
            { title: 'image', apiKey: 'product_thumbnail', type: 'image', placeholder: placeHolderImage },
            { title: 'name', apiKey: 'name' },
            { title: 'Quantity', apiKey: 'quantity' },
            { title: 'stock', apiKey: 'stock_status', type: 'stock_status' },
        ],
        data: data || []
    };
    return (
        <ShowTable {...props} headerData={headerObj} keyInPermission={"product"} />
    )
}

export default TableWarper(ProductStockReport)
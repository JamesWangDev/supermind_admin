import { Approved, store } from "../../Utils/AxiosUtils/API";
import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";

const AllRoles = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: true,
    isSerialNo: false,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Logo", apiKey: "store_logo", type: 'image' },
      { title: "StoreName", apiKey: "store_name", sorting: true, sortBy: "desc" },
      { title: "Name", apiKey: "name" },
      { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
      { title: "Approved", apiKey: "is_approved", type: 'switch', url: `${store}${Approved}` }
    ],
    data: data || []
  };
  headerObj.data.filter((element) => element.name = element?.vendor?.name)
  if (!data) return null;

  return <>
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(AllRoles);

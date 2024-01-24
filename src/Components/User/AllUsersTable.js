import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import Loader from "../CommonComponent/Loader";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";

const AllUsersTable = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    isSerialNo: false,
    optionHead: { title: "Action" },
    column: [
      { title: "Avatar", apiKey: "profile_image", type: 'image', class: "sm-width" },
      { title: "Name", apiKey: "name", sorting: true, sortBy: "desc" },
      { title: "Email", apiKey: "email", sorting: true, sortBy: "desc" },
      { title: "Role", apiKey: "role", subKey: ["name"] },
      { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
      { title: "Status", apiKey: "status", type: 'switch' }
    ],
    data: data || []
  };
  if (!data) return <Loader />;
  return <>
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(AllUsersTable);

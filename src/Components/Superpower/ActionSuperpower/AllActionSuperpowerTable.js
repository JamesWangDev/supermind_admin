import { useContext,useEffect } from "react";
import TableWarper from "@/Utils/HOC/TableWarper";
import ShowTable from "@/Components/Table/ShowTable";
import Loader from "@/Components/CommonComponent/Loader";
import usePermissionCheck from "@/Utils/Hooks/usePermissionCheck";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import AccountContext from "@/Helper/AccountContext";

const AllSuperpowerTable = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const { role, setRole } = useContext(AccountContext)
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }
  }, [])
  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Image", apiKey: "product_thumbnail", type: 'image', placeHolderImage: placeHolderImage },
      { title: "Name", apiKey: "name", sorting: true, sortBy: "desc" },
    ],
    data: data || []
  };
  headerObj.data.map((element) => element.sale_price = element?.sale_price)

  let pro = headerObj?.column?.filter((elem) => {
    return role == 'vendor' ? elem.title !== 'Approved' : elem;
  });
  headerObj.column = headerObj ? pro : [];
  if (!data) return <Loader />;
  return <>
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(AllSuperpowerTable);

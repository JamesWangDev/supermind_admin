import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";

const GptmodelTable = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Name", apiKey: "name", sorting: true, sortBy: "desc" },
      { title: "Description", apiKey: "description", sorting: false },
      { title: "API URL", apiKey: "api_url", sorting: false },
      { title: "API KEY", apiKey: "api_key", sorting: false },
      { title: "Is Public", apiKey: "is_public" },
      { title: "status", apiKey: "status", type: 'switch' }
    ],
    data: data || []
  };
  if (!data) return null;
  return <>
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(GptmodelTable);

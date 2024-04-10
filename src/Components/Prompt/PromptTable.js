import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";

const PromptTable = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Name", apiKey: "name", sorting: true, sortBy: "desc" },
      { title: "PromptText", apiKey: "prompt_text", sorting: false },
      { title: "status", apiKey: "status", type: 'switch' }
    ],
    data: data || []
  };
  if (!data) return null;
  return <>
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(PromptTable);

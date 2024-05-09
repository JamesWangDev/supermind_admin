import { useContext, useEffect, useState } from "react";
import TableWarper from "../../../Utils/HOC/TableWarper";
import ShowTable from "../../Table/ShowTable";
import Loader from "../../CommonComponent/Loader";
import AccountContext from "../../../Helper/AccountContext";
import { Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from "reactstrap";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import Btn from "@/Elements/Buttons/Btn";
import { ACTION_CATEGORIES } from "@/Utils/ActionCategories";
const Markdown = dynamic(() => import("react-markdown"), {
  loading: () => <p>Loading...</p>,
});

const AllActionsTable = ({ data, ...props }) => {
  const { role, setRole } = useContext(AccountContext);
  const [openModel, setOpenModel] = useState(false);
  const [actionDetail, setActionDetail] = useState(null);
  const [actionDescription, setActionDescription] = useState("")
  const [actionCategories, setActionCategories] = useState([])
  const [headerObjState, setHeaderObjState] = useState({})
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }
  }, []);
  
  useEffect(() => {
    const headerObj = {
      checkBox: false,
      isOption: false,
      noEdit: false,
      optionHead: { title: "Action", type: "View" },
      column: [{ title: "Name", apiKey: "name", sorting: true, sortBy: "desc" }],
      data: data || [],
    };
    headerObj.data.map((element) => (element.sale_price = element?.sale_price));
  
    let pro = headerObj?.column?.filter((elem) => {
      return role == "vendor" ? elem.title !== "Approved" : elem;
    });
    headerObj.column = headerObj ? pro : [];
    setHeaderObjState(headerObj)
  }, [data])
  
  const viewActionDetail = (data) => {
    setActionDetail(data);
    setActionDescription(data?.description)
    setActionCategories(data?.categories ?? [])
    setOpenModel(true);
  };

  const toggleModal = () => setOpenModel((prev) => !prev);

  const {mutate: updateDescriptionMutate, isLoading: updateDescriptionLoading} = useMutation(async ({description, name, categories, id}) => {
    const resp = await fetch("https://nodeapi.supermind.bot/nodeapi/updateNodeDescription", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({description, name, categories, id})
    })
    const respJson = await resp.json()
    if(respJson.success) {
      alert("Action updated")
      return
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });

  const {mutate: deleteDescriptionMutate, isLoading: deleteDescriptionLoading} = useMutation(async ({workflowId}) => {
    const resp = await fetch(`https://nodeapi.supermind.bot/nodeapi/deleteWorkflow?workflowId=${workflowId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    const respJson = await resp.json()
    if(respJson.success) {
      setHeaderObjState(prev => {
        prev.data = prev.data.filter((d) => d.workflow_id !== workflowId)
        return prev
      })
      setOpenModel(false)
      return
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  if (!data || Object.keys(headerObjState).length <= 0) return <Loader />;
  return (
    <>
      <ShowTable
        {...props}
        headerData={headerObjState}
        redirectLink={viewActionDetail}
      />
      <Modal fullscreen isOpen={openModel} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{actionDetail?.name}</ModalHeader>
        <ModalBody>
          <div>
            Categories:
            <div>
              {actionCategories.map((cat, i) => <Badge style={{cursor: "pointer"}} pill key={i} color="primary"  onClick={() => setActionCategories((prevCategories) => prevCategories.filter((prevCat) => prevCat !== cat))}>
                {cat}
              </Badge>)}
            </div>
          </div>
          <Dropdown style={{margin: 10}} isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>Select Categories</DropdownToggle>
            <DropdownMenu>
              {
                ACTION_CATEGORIES.map((cat, i) => <DropdownItem style={{backgroundColor: actionCategories.includes(cat) ? "greenyellow" : "transparent"}} key={i} onClick={()=> {
                  setActionCategories((prevCategories) => {
                    if(actionCategories.includes(cat)){
                      return prevCategories.filter((prevCat) => prevCat !== cat)
                    } else {
                      return [...prevCategories, cat]
                    }
                  })
                }}>{cat}</DropdownItem>)
              }
            </DropdownMenu>
          </Dropdown>
          <textarea style={{width:"100%", height: "100%"}} value={actionDescription} onChange={(e) => setActionDescription(e.target.value)} />
          <div style={{marginBottom: 10, display: "flex", justifyContent: "space-around"}}>
            <Btn
              title="Update Action"
              className="align-items-center btn-theme add-button"
              loading={updateDescriptionLoading || deleteDescriptionLoading}
              onClick={() => updateDescriptionMutate({description: actionDescription, name: actionDetail?.name, categories: actionCategories, id: actionDetail?.id})}
            />
            <Btn
              title="Delete Action"
              className="align-items-center"
              loading={updateDescriptionLoading || deleteDescriptionLoading}
              onClick={() => deleteDescriptionMutate({workflowId: actionDetail?.workflow_id})}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableWarper(AllActionsTable);

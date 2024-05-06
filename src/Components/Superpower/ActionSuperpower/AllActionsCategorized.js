import { useState } from "react";
import { Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from "reactstrap";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import Btn from "@/Elements/Buttons/Btn";
import { ACTION_CATEGORIES } from "@/Utils/ActionCategories";
import ActionCategoryComp from "@/Helper/ActionCategoryComp";
const Markdown = dynamic(() => import("react-markdown"), {
  loading: () => <p>Loading...</p>,
});

const AllActionsCategorized = () => {
  const [openModel, setOpenModel] = useState(false);
  const [actionDetail, setActionDetail] = useState(null);
  const [actionDescription, setActionDescription] = useState("")
  const [actionCategories, setActionCategories] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const viewActionDetail = (data) => {
    setActionDetail(data);
    setActionDescription(data?.description)
    setActionCategories(data?.categories ?? [])
    setOpenModel(true);
  };

  const toggleModal = () => setOpenModel((prev) => !prev);

  const {mutate: updateDescriptionMutate, isLoading: updateDescriptionLoading} = useMutation(async ({description, name, categories, id}) => {
    const resp = await fetch("http://134.209.37.239/nodeapi/updateNodeDescription", {
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
    const resp = await fetch(`http://134.209.37.239/nodeapi/deleteWorkflow?workflowId=${workflowId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    const respJson = await resp.json()
    if(respJson.success) {
      setRefetch(prev => !prev)
      setOpenModel(false)
      return
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <ActionCategoryComp viewActionDetail={viewActionDetail} />
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

export default AllActionsCategorized;

import { useContext, useEffect, useState } from "react";
import TableWarper from "../../../Utils/HOC/TableWarper";
import ShowTable from "../../Table/ShowTable";
import Loader from "../../CommonComponent/Loader";
import AccountContext from "../../../Helper/AccountContext";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import Btn from "@/Elements/Buttons/Btn";
const Markdown = dynamic(() => import("react-markdown"), {
  loading: () => <p>Loading...</p>,
});

const AllActionsTable = ({ data, ...props }) => {
  const { role, setRole } = useContext(AccountContext);
  const [openModel, setOpenModel] = useState(false);
  const [actionDetail, setActionDetail] = useState(null);
  const [actionDescription, setActionDescription] = useState("")
  const [headerObjState, setHeaderObjState] = useState({})

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
    setOpenModel(true);
  };

  const toggleModal = () => setOpenModel((prev) => !prev);

  const {mutate: updateDescriptionMutate, isLoading: updateDescriptionLoading} = useMutation(async ({description, name}) => {
    const resp = await fetch("https://134.209.37.239/nodeapi/updateNodeDescription", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({description, name})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        setStateProceudre(respJson.data)
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });

  const {mutate: deleteDescriptionMutate, isLoading: deleteDescriptionLoading} = useMutation(async ({workflowId}) => {
    const resp = await fetch(`https://134.209.37.239/nodeapi/deleteWorkflow?workflowId=${workflowId}`, {
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
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });

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
          <textarea style={{width:"100%", height: "100%"}} value={actionDescription} onChange={(e) => setActionDescription(e.target.value)} />
          <div style={{marginBottom: 10, display: "flex", justifyContent: "space-around"}}>
            <Btn
              title="Update Description"
              className="align-items-center btn-theme add-button"
              loading={updateDescriptionLoading || deleteDescriptionLoading}
              onClick={() => updateDescriptionMutate({description: actionDescription, name: actionDetail?.name})}
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

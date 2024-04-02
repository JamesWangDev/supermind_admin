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

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }
  }, []);
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

  const viewActionDetail = (data) => {
    setActionDetail(data);
    setActionDescription(data?.description)
    setOpenModel(true);
  };

  const toggleModal = () => setOpenModel((prev) => !prev);


  const {mutate: updateDescriptionMutate, isLoading: updateDescriptionLoading} = useMutation(async ({description, name}) => {
    const resp = await fetch("http://134.209.37.239:3010/updateNodeDescription", {
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

  if (!data) return <Loader />;
  return (
    <>
      <ShowTable
        {...props}
        headerData={headerObj}
        redirectLink={viewActionDetail}
      />
      <Modal fullscreen isOpen={openModel} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{actionDetail?.name}</ModalHeader>
        <ModalBody>
          <textarea style={{width:"100%", height: "100%"}} value={actionDescription} onChange={(e) => setActionDescription(e.target.value)} />
          <Btn
            title="Update Description"
            className="align-items-center btn-theme add-button"
            loading={updateDescriptionLoading}
            onClick={() => updateDescriptionMutate({description: actionDescription, name: actionDetail?.name})}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableWarper(AllActionsTable);

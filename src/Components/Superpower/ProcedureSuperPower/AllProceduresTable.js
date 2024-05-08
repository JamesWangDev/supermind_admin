import { useContext, useEffect, useState } from "react";
import TableWarper from "../../../Utils/HOC/TableWarper";
import ShowTable from "../../Table/ShowTable";
import Loader from "../../CommonComponent/Loader";
import AccountContext from "../../../Helper/AccountContext";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ReactFlowChart from "@/Helper/ReactFlowChart";
import { useMutation } from "@tanstack/react-query";
import Btn from "@/Elements/Buttons/Btn";

const AllProceduresTable = ({ data, ...props }) => {
  const { role, setRole } = useContext(AccountContext);
  const [openModel, setOpenModel] = useState(false);
  const [procedureDetail, setProcedureDetail] = useState(null);
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
    setProcedureDetail(data);
    setOpenModel(true);
  };

  const toggleModal = () => setOpenModel((prev) => !prev);

  const {mutate: deleteProcedureMutate, isLoading: deleteProcedureLoading} = useMutation(async ({procedureId}) => {
    const resp = await fetch(`http://134.209.37.239/nodeapi/deleteProcedure?procedureId=${procedureId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    const respJson = await resp.json()
    if(respJson.success) {
      setHeaderObjState(prev => {
        prev.data = prev.data.filter((d) => d.id !== procedureId)
        return prev
      })
      setOpenModel(false) 
      return
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
        <ModalHeader toggle={toggleModal}>{procedureDetail?.name}</ModalHeader>
        <ModalBody>
            <ReactFlowChart name={procedureDetail?.name} procedure={procedureDetail?.procedure} description={procedureDetail?.description} vectorQuery={procedureDetail?.vector_query} procedureId={procedureDetail?.id} width="95vw" height="90vh" />
            <Btn
              title="Delete Procedure"
              className="align-items-center"
              loading={deleteProcedureLoading}
              onClick={() => deleteProcedureMutate({procedureId: procedureDetail?.id})}
            />
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableWarper(AllProceduresTable);

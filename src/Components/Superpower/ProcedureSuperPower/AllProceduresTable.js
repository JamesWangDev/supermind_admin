import { useContext, useEffect, useState } from "react";
import TableWarper from "../../../Utils/HOC/TableWarper";
import ShowTable from "../../Table/ShowTable";
import Loader from "../../CommonComponent/Loader";
import AccountContext from "../../../Helper/AccountContext";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ReactFlowChart from "@/Helper/ReactFlowChart";

const AllProceduresTable = ({ data, ...props }) => {
  const { role, setRole } = useContext(AccountContext);
  const [openModel, setOpenModel] = useState(false);
  const [procedureDetail, setProcedureDetail] = useState(null);

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
    setProcedureDetail(data);
    setOpenModel(true);
  };

  const toggleModal = () => setOpenModel((prev) => !prev);

  if (!data) return <Loader />;
  return (
    <>
      <ShowTable
        {...props}
        headerData={headerObj}
        redirectLink={viewActionDetail}
      />
      <Modal fullscreen isOpen={openModel} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{procedureDetail?.name}</ModalHeader>
        <ModalBody>
            <p>{procedureDetail?.description}</p>
            <p>{procedureDetail?.procedure}</p>
            <ReactFlowChart procedure={procedureDetail?.procedure} name={procedureDetail?.name} width="95vw" height="90vh" />
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableWarper(AllProceduresTable);

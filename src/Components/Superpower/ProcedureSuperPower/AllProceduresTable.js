import { useContext, useEffect, useState } from "react";
import TableWarper from "../../../Utils/HOC/TableWarper";
import ShowTable from "../../Table/ShowTable";
import Loader from "../../CommonComponent/Loader";
import AccountContext from "../../../Helper/AccountContext";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {XMLParser} from 'fast-xml-parser'
import CustomReactFlowNode from "@/Helper/CustomReactFlowNode";
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix : "@_"
});

const nodeTypes = {
    customNode: CustomReactFlowNode,
};

const AllProceduresTable = ({ data, ...props }) => {
  const { role, setRole } = useContext(AccountContext);
  const [openModel, setOpenModel] = useState(false);
  const [procedureDetail, setProcedureDetail] = useState(null);
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }
  }, []);

  useEffect(() => {
    if(procedureDetail?.procedure){
        const parsedData = xmlParser.parse(procedureDetail?.procedure)
        const graphData = parsedData.graph || parsedData.procedure?.graph || parsedData.commandBlock?.graph || parsedData.commandBlock?.command?.graph
        const edgeData = graphData?.edge?.edge || graphData?.edge
        const sourceNodeCount = {}
        const targetNodeCount = {}
        const edges = []
        for(let i = 0; i < edgeData?.length; i++){
          const e = edgeData[i]
          if(typeof e !== "object") continue
          if(sourceNodeCount[e["@_source"]]) sourceNodeCount[e["@_source"]]++
          else sourceNodeCount[e["@_source"]] = 1
  
          if(targetNodeCount[e["@_target"]]) targetNodeCount[e["@_target"]]++
          else targetNodeCount[e["@_target"]] = 1
  
          edges.push({id: i, source: e["@_source"], sourceHandle: `${sourceNodeCount[e["@_source"]] - 1}`, target: e["@_target"], targetHandle: `${targetNodeCount[e["@_target"]] - 1}`, label: e?.edgeLogic?.condition?.returnValue ?? ""})
        }
        const nodes = graphData?.node?.map((n, i) => {
          return {id: n["@_id"], type: "customNode", position: {x: 100 * i, y: i * 100}, data: {label: n["#text"], sourceHandleCount: sourceNodeCount[n["@_id"]] ?? 1, targetHandleCount: targetNodeCount[n["@_id"]] ?? 1}}
        })
        setNodes(nodes ?? [])
        setEdges(edges ?? [])
    }
  }, [procedureDetail])

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
            <div style={{ width: '95vw', height: '90vh' }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
            </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableWarper(AllProceduresTable);

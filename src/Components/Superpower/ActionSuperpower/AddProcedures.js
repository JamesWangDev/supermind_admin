import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import request from "../../../Utils/AxiosUtils";
import I18NextContext from "@/Helper/I18NextContext";
import MultiSelectField from "../../InputFields/MultiSelectField";
import { Table, Row, Col } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import TableLoader from "../../Table/TableLoader";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import dynamic from "next/dynamic";
import ReactFlowChart from "@/Helper/ReactFlowChart";
const Markdown = dynamic(() => import("react-markdown"), {
  loading: () => <p>Loading...</p>,
});

const AddProcedures = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const [procedures, setProcedures] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [procedureDetail, setActionDetail] = useState(null);

  const { data: procedureData, isLoading: procedureLoader } = useQuery(
    ["procedures"],
    () =>
      request({
        url: "https://nodeapi.supermind.bot/nodeapi/getProcedures?paginate=100&page=0&sort=asc",
      }),
    { refetchOnWindowFocus: false, select: (res) => res?.data }
  );

  useEffect(() => {
    if (!procedureLoader && procedureData) {
      setProcedures(procedureData.data);
    }
  }, [procedureLoader, procedureData]);

  const selectOptions = useMemo(
    () => procedures?.map((item) => ({ id: item.id, name: item.name })),
    [procedures]
  );

  const viewProcedureDetail = (data) => {
    setActionDetail(data);
    setOpenModel(true);
  };

  const toggleModal = () => setOpenModel((prev) => !prev);

  return (
    <>
      <Row>
        <Col xs={9}>
          <MultiSelectField
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            name="procedures"
            require="true"
            data={selectOptions}
            onPressOption={() => {}}
          />
        </Col>
        <Col xs={3}>
          <div className="w-100 flex justify-content-center">
            <Btn
              title="Add New Procedure"
              className="align-items-center btn-theme add-button"
              onClick={() => {
                router.push(`/${i18Lang}/procedure/create`);
              }}
            />
          </div>
        </Col>
      </Row>
      {values?.procedures.length > 0 && (
        <Table
          id="table_id"
          className={`role-table refund-table all-package theme-table datatable-wrapper`}
        >
          <TableLoader fetchStatus={procedureLoader} />
          <thead>
            <tr>
              <th className="sm-width">No</th>
              <th style={{ width: "140px" }}>Name</th>
            </tr>
          </thead>
          <tbody>
            {values?.procedures.map((procedure_id, index) => {
              const procedure = procedures?.filter(
                (item) => item.id === procedure_id
              )[0];
              return (
                <tr
                  key={`procedure_table_${index}`}
                  onClick={() => viewProcedureDetail(procedure)}
                >
                  <td>{index + 1}</td>
                  <td>{procedure?.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal fullscreen isOpen={openModel} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{procedureDetail?.name}</ModalHeader>
        <ModalBody>
          <ReactFlowChart name={procedureDetail?.name} description={procedureDetail?.description} procedure={procedureDetail?.procedure} procedureId={procedureDetail?.id} vectorQuery={procedureDetail?.vector_query} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddProcedures;
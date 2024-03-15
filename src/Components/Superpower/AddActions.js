import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import I18NextContext from "@/Helper/I18NextContext";
import MultiSelectField from "../InputFields/MultiSelectField";
import { Table, Row, Col } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import TableLoader from "../Table/TableLoader";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import dynamic from "next/dynamic";
const Markdown = dynamic(() => import("react-markdown"), {
  loading: () => <p>Loading...</p>,
});

const AddActions = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const [actions, setActions] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [actionDetail, setActionDetail] = useState(null);

  // Getting data from Cart API
  const { data: actionData, isLoading: actionLoader } = useQuery(
    ["actions", values.actions],
    () =>
      request({
        url: "http://134.209.37.239:3010/getDescriptions?paginate=100&page=0&sort=asc",
      }),
    { refetchOnWindowFocus: false, select: (res) => res?.data }
  );

  useEffect(() => {
    if (!actionLoader && actionData) {
      setActions(actionData.data);
    }
  }, [actionLoader, actionData]);

  const selectOptions = useMemo(
    () => actions?.map((item) => ({ id: item.id, name: item.name })),
    [actions]
  );

  const viewActionDetail = (data) => {
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
            name="actions"
            require="true"
            data={selectOptions}
          />
        </Col>
        <Col xs={3}>
          <div className="w-100 flex justify-content-center">
            <Btn
              title="Add New Action"
              className="align-items-center btn-theme add-button"
              onClick={() => {
                router.push(`/${i18Lang}/actions/create`);
              }}
            />
          </div>
        </Col>
      </Row>
      {values?.actions.length > 0 && (
        <Table
          id="table_id"
          className={`role-table refund-table all-package theme-table datatable-wrapper`}
        >
          <TableLoader fetchStatus={actionLoader} />
          <thead>
            <tr>
              <th className="sm-width">No</th>
              <th style={{ width: "140px" }}>Name</th>
            </tr>
          </thead>
          <tbody>
            {values?.actions.map((action_id, index) => {
              const action = actions?.filter(
                (item) => item.id === action_id
              )[0];
              return (
                <tr
                  key={`action_table_${index}`}
                  onClick={() => viewActionDetail(action)}
                >
                  <td>{index + 1}</td>
                  <td>{action?.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal fullscreen isOpen={openModel} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{actionDetail?.name}</ModalHeader>
        <ModalBody>
          <Markdown>{actionDetail?.description}</Markdown>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddActions;
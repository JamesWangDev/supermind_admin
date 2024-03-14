import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import MultiSelectField from "../InputFields/MultiSelectField";
import { Table, Row, Col } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import TableLoader from "../Table/TableLoader";
import axios from "axios";
import SuperpowerChatBox from "./SuperpowerChatBox";

const AddKnowledgeTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const { t } = useTranslation(i18Lang, "common");
  const { state } = useContext(SettingContext);
  const [partitionOptions, setPartitionOptions] = useState([]);
  const { data: partitions, isLoading } = useQuery(
    ["partitions"],
    () => axios.get(`https://sea-turtle-app-qcwo5.ondigitalocean.app/partitions/1`),
    { refetchOnWindowFocus: false, select: (res) => res.data }
  );

  useEffect(() => {
    if (partitions && !isLoading) {
      setPartitionOptions(
        partitions.map((partition) => ({
          id: partition.partition_name.trim(),
          name: partition.partition_name.trim(),
        }))
      );
    }
  }, [partitions, isLoading]);

  return (
    <>
      <div className="w-100 flex justify-content-end mb-3">
        <Btn
          title="Add New Knowledge"
          className="align-items-center btn-theme add-button"
          onClick={() => {
            router.push(`/${i18Lang}/knowledge`);
          }}
        />
      </div>
      <Row>
        <Col xs={12}>
          <MultiSelectField
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            name="always_knowledges"
            require="false"
            data={partitionOptions}
          />
          {values?.always_knowledges.length > 0 && <Table id="table_id" className={`role-table refund-table all-package theme-table datatable-wrapper mb-5`}>
            <TableLoader fetchStatus={isLoading} />
                <thead>
                    <tr>
                        <th className="sm-width">No</th>
                        <th style={{width: "180px"}}>Name</th>
                        <th>Decscription</th>
                    </tr>
                </thead>
                <tbody>
                    {values?.always_knowledges.map((prompt_id, index) => (
                        <tr key={`prompt_table_${index}`}>
                            <td>{index + 1}</td>
                            <td>{partitions?.filter(item => item.partition_name.trim() === prompt_id)[0]?.partition_name}</td>
                            <td>{partitions?.filter(item => item.partition_name.trim() === prompt_id)[0]?.partition_description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>}
          <MultiSelectField
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            name="library_knowledges"
            require="false"
            data={partitionOptions}
          />
          {values?.library_knowledges.length > 0 && <Table id="table_id" className={`role-table refund-table all-package theme-table datatable-wrapper`}>
            <TableLoader fetchStatus={isLoading} />
                <thead>
                    <tr>
                        <th className="sm-width">No</th>
                        <th style={{width: "180px"}}>Name</th>
                        <th>Decscription</th>
                    </tr>
                </thead>
                <tbody>
                {values?.library_knowledges.map((prompt_id, index) => (
                    <tr key={`prompt_table_${index}`}>
                        <td>{index + 1}</td>
                        <td>{partitions?.filter(item => item.partition_name.trim() === prompt_id)[0]?.partition_name}</td>
                        <td>{partitions?.filter(item => item.partition_name.trim() === prompt_id)[0]?.partition_description}</td>
                    </tr>
                ))}
                </tbody>
            </Table>}
        </Col>
      </Row>
     {values['always_knowledges'].length > 0 &&  <SuperpowerChatBox values={values} />}
    </>
  );
};

export default AddKnowledgeTab;

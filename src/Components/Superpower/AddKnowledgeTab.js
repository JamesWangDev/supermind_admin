import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { prompt } from "../../Utils/AxiosUtils/API";
import MultiSelectField from "../InputFields/MultiSelectField";
import SelectField from "../InputFields/SelectField";
import { Table, Row, Col } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import { RiPencilLine } from "react-icons/ri";
import TableLoader from "../Table/TableLoader";
import axios from "axios";

const AddKnowledgeTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const { t } = useTranslation(i18Lang, "common");
  const { state } = useContext(SettingContext);
  const [partitionOptions, setPartitionOptions] = useState([]);
  const { data: partitions, isLoading } = useQuery(
    ["partitions"],
    () => axios.get(`https://supermind-n396.onrender.com/partitions/1`),
    { refetchOnWindowFocus: false, select: (res) => res.data }
  );
  //   const [prompts, setPrompts] = useState([]);
  // Getting data from Cart API
  //   const { data: promptData, isLoading: promptLoader } = useQuery(["prompt", values.prompts], () => request({ url: prompt }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  //   useEffect(() => {
  //     if(!promptLoader && promptData) {
  //         setPrompts(promptData.data)
  //     }
  //   }, [promptLoader, promptData])

  useEffect(() => {
    if (partitions && !isLoading) {
      setPartitionOptions(
        partitions.map((partition) => ({
          id: partition.partition_name,
          name: partition.partition_name,
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
          <MultiSelectField
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            name="library_knowledges"
            require="false"
            data={partitionOptions}
          />
        </Col>
      </Row>
      {/* {values?.prompts.length > 0 && <Table id="table_id" className={`role-table refund-table all-package theme-table datatable-wrapper`}>
        <TableLoader fetchStatus={promptLoader} />
        <thead>
          <tr>
            <th className="sm-width">No</th>
            <th style={{width: "140px"}}>Name</th>
            <th>Prompt Text</th>
            <th style={{width: "80px"}}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {values?.prompts.map((prompt_id, index) => (
            <tr key={`prompt_table_${index}`}>
              <td>{index + 1}</td>
              <td>{prompts?.filter(item => item.id === prompt_id)[0]?.name}</td>
              <td>{prompts?.filter(item => item.id === prompt_id)[0]?.prompt_text}</td>
              <td>
                <Link href={`/${i18Lang}/${prompt}/update/${prompt_id}`}>
                  <RiPencilLine />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>} */}
    </>
  );
};

export default AddKnowledgeTab;

import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { prompt, gptmodel } from "../../Utils/AxiosUtils/API";
import MultiSelectField from "../InputFields/MultiSelectField";
import SelectField from "../InputFields/SelectField";
import { Table, Row, Col } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import { RiPencilLine } from "react-icons/ri";
import TableLoader from "../Table/TableLoader";

const PromptAndModels2 = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext);
  const [prompts, setPrompts] = useState([]);
  // Getting data from Cart API
  const { data: promptData, isLoading: promptLoader } = useQuery(["prompt", values.prompts], () => request({ url: prompt }), { refetchOnWindowFocus: false, select: (res) => res?.data });
  const { data: customModelData, isLoading: modelLoader, refetch, fetchStatus } = useQuery([gptmodel], () => request({
    url: gptmodel, method: 'get'}, router), { refetchOnWindowFocus: false, select: (res) => res?.data.data });

  useEffect(() => {
    if(!promptLoader && promptData) {
        setPrompts(promptData.data)
    }
  }, [promptLoader, promptData])
console.log(values?.taskSplitter)
  const selectOptions = useMemo(() => (prompts?.map(item => ({id: item.id, name: item.name}))), [prompts]);

  return (
    <>
      <Row>
        <Col xs={9}>
          <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="prompts" require="true" data={selectOptions} />
        </Col>
        <Col xs={3}>
          <div className="w-100 flex justify-content-center">
          <Btn title="Add New Prompt" className="align-items-center btn-theme add-button" onClick={() => {
            router.push(`/${i18Lang}/${prompt}/create`)
          }} />
          </div>
        </Col>
      </Row>
      {values?.prompts.length > 0 && <Table id="table_id" className={`role-table refund-table all-package theme-table datatable-wrapper`}>
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
      </Table>}
      <Row>
        <Col xs={9}>
          <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="taskSplitter" require="true" data={selectOptions} />
        </Col>
        <Col xs={3}>
          <div className="w-100 flex justify-content-center">
          <Btn title="Add New Prompt" className="align-items-center btn-theme add-button" onClick={() => {
            router.push(`/${i18Lang}/${prompt}/create`)
          }} />
          </div>
        </Col>
      </Row>
      {values?.taskSplitter?.length > 0 && <Table id="table_id" className={`role-table refund-table all-package theme-table datatable-wrapper`}>
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
          {Array.isArray(values?.taskSplitter) && values?.taskSplitter?.map((prompt_id, index) => (
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
      </Table>}
      <div className="mt-4">
      <SelectField errors={errors} values={values} inputprops={{name: "gpt_model", id: "gpt_model", options: customModelData}} setFieldValue={setFieldValue} name="gpt_model" require="true" data={customModelData} />
      </div>
    </>
  );
};

export default PromptAndModels2;

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

const modelChoiceItems = [
  {
    name: "gpt-3.5-turbo",
    id: "gpt-3.5-turbo"
  },
  {
    name: "gpt-3.5-turbo-0125",
    id: "gpt-3.5-turbo-0125",
  },
  {
    name: "gpt-3.5-turbo-1106",
    id: "gpt-3.5-turbo-1106",
  },
  {
    name: "gpt-3.5-turbo-instruct",
    id: "gpt-3.5-turbo-instruct",
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    id: "gpt-3.5-turbo-16k-0613",
  },
  {
    name: "gpt-4-0125-preview",
    id: "gpt-4-0125-preview",
  },
  {
    name: "gpt-4-turbo-preview",
    id: "gpt-4-turbo-preview",
  },
  {
    name: "gpt-4-vision-preview",
    id: "gpt-4-vision-preview",
  },
  {
    name: "anyscale-google/gemma-7b-it",
    id: "anyscale-google/gemma-7b-it",
  },
  {
    name: "anyscale-meta-llama/Llama-2-7b-chat-hf",
    id: "anyscale-meta-llama/Llama-2-7b-chat-hf",
  },
  {
    name: "anyscale-codellama/CodeLlama-70b-Instruct-hf",
    id: "anyscale-codellama/CodeLlama-70b-Instruct-hf",
  },
  {
    name: "anyscale-mistralai/Mistral-7B-Instruct-v0.1",
    id: "anyscale-mistralai/Mistral-7B-Instruct-v0.1",
  },
  {
    name: "anyscale-mlabonne/NeuralHermes-2.5-Mistral-7B",
    id: "anyscale-mlabonne/NeuralHermes-2.5-Mistral-7B",
  }
];

const PromptAndModels2 = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext);
  const [prompts, setPrompts] = useState([]);
  // Getting data from Cart API
  const { data: promptData, isLoading: promptLoader } = useQuery(["prompt", values.prompts], () => request({ url: prompt }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  useEffect(() => {
    if(!promptLoader && promptData) {
        setPrompts(promptData.data)
    }
  }, [promptLoader, promptData])

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
      <div className="mt-4">
        <SelectField errors={errors} values={values} inputprops={{name: "gpt_model", id: "gpt_model", options: modelChoiceItems}} setFieldValue={setFieldValue} name="gpt_model" require="true" data={selectOptions} />
      </div>
    </>
  );
};

export default PromptAndModels2;

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { prompt } from "../../Utils/AxiosUtils/API";
import MultiSelectField from "../InputFields/MultiSelectField";
import { Table } from "reactstrap";

const PromptAndModels2 = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext);
  const [prompts, setPrompts] = useState([]);
  // Getting data from Cart API
  const { data: promptData, isLoading: promptLoader } = useQuery(["prompt", values], () => request({ url: prompt }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  useEffect(() => {
    if(!promptLoader && promptData) {
        setPrompts(promptData.data)
    }
  }, [promptLoader])

  const selectOptions = useMemo(() => (prompts?.map(item => ({id: item.id, name: item.name}))), [prompts]);
  return (
    <>
      <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="prompts" require="false" data={selectOptions} />
      {values?.prompts.length > 0 && <Table id="table_id" className={`role-table refund-table all-package theme-table datatable-wrapper`}>
        <thead>
          <tr>
            <th className="sm-width">No</th>
            <th style={{width: "140px"}}>Name</th>
            <th>Prompt Text</th>
          </tr>
        </thead>
        <tbody>
          {values?.prompts.map((prompt_id, index) => (
            <tr key={`prompt_table_${index}`}>
              <td>{index + 1}</td>
              <td>{prompts?.filter(item => item.id === prompt_id)[0]?.name}</td>
              <td>{prompts?.filter(item => item.id === prompt_id)[0]?.prompt_text}</td>
            </tr>
          ))}
        </tbody>
      </Table>}
    </>
  );
};

export default PromptAndModels2;

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import MultiSelectField from "../InputFields/MultiSelectField";
import { UISuperpowerAPI } from "../../Utils/AxiosUtils/API";

const AddUISuperpowersTab = ({ values, setFieldValue, errors, updateId }) => {
  // Getting data from Cart API
  const { data: superpowers, isLoading: superpowerloading } = useQuery([UISuperpowerAPI], () => request({ url: UISuperpowerAPI, method: 'get' }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  const selectOptions = useMemo(() => (superpowers?.data.map(item => ({id: item.id, name: item.name}))), [superpowers]);
  return (
    <>
      <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="ui_superpowers" require="false" data={selectOptions} />
    </>
  );
};

export default AddUISuperpowersTab;

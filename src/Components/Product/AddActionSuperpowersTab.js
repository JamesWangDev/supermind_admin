import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import MultiSelectField from "../InputFields/MultiSelectField";
import { superpower } from "../../Utils/AxiosUtils/API";

const AddActionSuperpowersTab = ({ values, setFieldValue, errors, updateId }) => {
  // Getting data from Cart API
  const { data: superpowers, isLoading: superpowerloading } = useQuery([superpower], () => request({ url: superpower, method: 'get' }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  const selectOptions = useMemo(() => (superpowers?.data.map(item => ({id: item.id, name: item.name}))), [superpowers]);
  return (
    <>
      <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="action_superpowers" require="false" data={selectOptions} />
    </>
  );
};

export default AddActionSuperpowersTab;

'use client'
import { useState } from "react";
import { ActionSuperpowerAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import SuperPowerForm from "@/Components/Superpower/ActionSuperpower/ActionSuperPowerForm";

const UpdateProduct = ({ params }) => {
  const [resetKey, setResetKey] = useState(false)
  const { mutate, isLoading } = useCreate(ActionSuperpowerAPI, params?.updateId, ActionSuperpowerAPI, false, (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      setResetKey(true)
    }
  });

  return (
    params?.updateId && (
      <SuperPowerForm mutate={mutate} updateId={params?.updateId} loading={isLoading} title={"Edit Action Superpower"} key={resetKey} />
    )
  );
};

export default UpdateProduct;

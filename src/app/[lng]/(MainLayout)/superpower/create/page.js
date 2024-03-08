"use client";
import SuperPowerForm from "@/Components/Superpower/SuperPowerForm";
import { product } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { useState } from "react";

const SuperPowerCreate = () => {
  const [resetKey, setResetKey] = useState(false);
  const { mutate, isLoading } = useCreate(product,false,product,false,
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setResetKey(true);
      }
    }
  );
  return (
    <SuperPowerForm
      mutate={mutate}
      loading={isLoading}
      title={"AddSuperpower"}
      key={resetKey}
    />
  );
};

export default SuperPowerCreate;

"use client";
import ProductForm from "@/Components/Product/ProductForm";
import { product } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { useState } from "react";

const ProductCreate = () => {
  const [resetKey, setResetKey] = useState(false);
  const { mutate, isLoading } = useCreate(product,false,product,false,
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setResetKey(true);
      }
    }
  );
  return (
    <ProductForm
      mutate={mutate}
      loading={isLoading}
      title={"AddProduct"}
      key={resetKey}
    />
  );
};

export default ProductCreate;

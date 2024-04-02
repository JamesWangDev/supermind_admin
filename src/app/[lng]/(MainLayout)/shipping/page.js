'use client'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import Link from "next/link";
import FormShipping from "@/Components/Shipping/FormShipping";
import Btn from "@/Elements/Buttons/Btn";
import request from "@/Utils/AxiosUtils";
import { shipping } from "@/Utils/AxiosUtils/API";
import useDelete from "@/Utils/Hooks/useDelete";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import DeleteButton from "@/Components/Table/DeleteButton";
import NoDataFound from "@/Components/CommonComponent/NoDataFound";
import usePermissionCheck from "@/Utils/Hooks/usePermissionCheck";
import Loader from "@/Components/CommonComponent/Loader";

const Shipping = () => {
  const [create, edit, destroy] = usePermissionCheck(["create", "edit", "destroy"]);
  const [active, setActive] = useState(false);
  const { data, isLoading } = useQuery([shipping], () => request({ url: shipping }), {
    refetchOnWindowFocus: false, select: (data) => data.data,
  });
  const { mutate } = useDelete(shipping, shipping);
  if (isLoading) return <Loader />
  return (
    <>
      <FormWrapper title="Shipping" modal={
        create && <Btn className="align-items-center btn-theme add-button" title="SelectCountry" onClick={() => setActive("create")}>
          <FiPlus /></Btn>
      }>
        <FormShipping open={"create" === active ? true : false} setActive={setActive} />
        {
          data?.length > 0 ?
            <ul className="country-list">
              {data?.map((elem, index) => (
                <li key={index}>
                  <h5>{elem.country.name}</h5>
                  {edit && <Link href={`/shipping/update/${elem?.id}`}><RiPencilLine className="text-success" />
                  </Link>}
                  {destroy && <DeleteButton id={elem?.id} mutate={mutate} />}
                </li>
              ))}
            </ul>
            : <NoDataFound />
        }
      </FormWrapper>
    </>
  );
};

export default Shipping;

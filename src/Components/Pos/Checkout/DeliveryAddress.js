import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Row } from "reactstrap";
import { RiAddLine, RiMapPinLine } from "react-icons/ri";
import ShowModal from "../../../Elements/Alerts&Modals/Modal";
import request from "../../../Utils/AxiosUtils";
import { AddressAPI, user } from "../../../Utils/AxiosUtils/API";
import CheckoutCard from "./common/CheckoutCard";
import CommonAddressForm from "./CommonAddressForm";
import useCreate from "../../../Utils/Hooks/useCreate";
import ShowAddress from "./ShowAddress";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const DeliveryAddress = ({ values, updateId, type, title }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState([])
  // Getting user by its id
  const { data, isLoading: load, refetch } = useQuery([user, updateId], () => request({ url: `/${user}/${updateId}` }), { enabled: false, refetchOnWindowFocus: false, select: (data) => (data.data) });
  // Creating Address
  const { data: addressData, mutate: addressMutate, isLoading } = useCreate(AddressAPI, false, false, "Address Added successfully", () => {
    refetch(); setModal(false)
  });
  useEffect(() => {
    setAddress(data)
  }, [data])
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId, addressData]);
  return (
    <>
      <CheckoutCard icon={<RiMapPinLine />}>
        <div className="checkout-title">
          <h4>{t(title)} {t("Address")}</h4>
          {values['consumer_id'] && <a className="d-flex align-items-center fw-bold" onClick={() => setModal(true)}><RiAddLine className="me-1"></RiAddLine>{t("AddNew")}</a>}
        </div>
        <div className="checkout-detail">
          {<>
            {values['consumer_id'] && data?.address?.length > 0 ?
              <Row className="g-4">
                {address?.address?.map((item, i) => (
                  <ShowAddress item={item} data={data} key={i} type={type} index={i} />
                ))}
              </Row>
              : <div className="empty-box">
                <h2>{t("NoaddressFound")}</h2>
              </div>}
          </>
          }
          <ShowModal modalAttr={{ className: "modal-lg" }} title={"AddShippingAddress"} open={modal} setModal={setModal}>
            <CommonAddressForm setModal={setModal} loading={isLoading} updateId={values["consumer_id"]} type={type} addressMutate={addressMutate} setAddress={setAddress} />
          </ShowModal>
        </div>
      </CheckoutCard>
    </>
  );
}

export default DeliveryAddress;

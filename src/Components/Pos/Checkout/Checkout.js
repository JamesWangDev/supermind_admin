import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Form, Formik } from "formik";
import DeliveryOptions from "./DeliveryOptions";
import PaymentOptions from "./PaymentOptions";
import SelectCustomer from "./SelectCustomer";
import DeliveryAddress from "./DeliveryAddress";
import CheckoutSidebar from "./CheckoutSidebar";
import { useQuery } from "@tanstack/react-query";
import { AddtoCartAPI, user } from "../../../Utils/AxiosUtils/API";
import request from "../../../Utils/AxiosUtils";
import Loader from "../../CommonComponent/Loader";

const Checkout = ({ loading, mutate, data }) => {
  const [search, setSearch] = useState(false);
  const [customSearch, setCustomSearch] = useState("")
  const [tc, setTc] = useState(null);
  // Initial Value for checkout
  const [initValues, setInitValues] = useState(
    { products: [], consumer_id: "", billing_address_id: "", shipping_address_id: "", shipping_total: 0, total: 0, coupon: "", wallet_balance: false, points_amount: false, delivery_description: "", delivery_interval: "", isTimeSlot: false, payment_method: "", isPoint: "", isWallet: "" });
  // Calling Add to Cart API
  const { data: addToCartData, isLoading: addToCartLoader, refetch } = useQuery([AddtoCartAPI], () => request({ url: AddtoCartAPI }), { refetchOnWindowFocus: false, cacheTime: 0, select: (res) => res?.data });
  // Getting Users data
  const { data: userData, refetch: userRefetch, isLoading: userLoader } = useQuery([user], () => request({ url: user, params: { role: 'consumer', status: 1, paginate: 15, search: customSearch ? customSearch : "" } }), { enabled: false, refetchOnWindowFocus: false, select: (data) => data.data.data });

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    if (addToCartData) {
      setInitValues((prevValues) => ({
        ...prevValues,
        products: addToCartData.items || [],
        total: addToCartData.total || null,
        address: prevValues.address || {},
      }));
    }
  }, [addToCartData, setInitValues]);

  useEffect(() => {
    refetch();
    userRefetch()
  }, [initValues.products])

  // Added debouncing
  useEffect(() => {
    if (tc) clearTimeout(tc);
    setTc(setTimeout(() => setCustomSearch(search), 500));
  }, [search])

  if (addToCartLoader && userLoader) return <Loader />
  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="pb-4 checkout-section-2">
            <Row className="g-sm-4 g-3">
              <Col xxl="8">
                <div className="left-sidebar-checkout">
                  <div className="checkout-detail-box">
                    <ul>
                      <SelectCustomer values={values} mutate={mutate} setFieldValue={setFieldValue} userData={userData} userRefetch={userRefetch} setSearch={setSearch} />
                      <DeliveryAddress type="shipping" title={"Shipping"} values={values} updateId={values["consumer_id"]} setFieldValue={setFieldValue} />
                      <DeliveryAddress type="billing" title={"Billing"} values={values} updateId={values["consumer_id"]} setFieldValue={setFieldValue} />
                      <DeliveryOptions values={values} setFieldValue={setFieldValue} />
                      <PaymentOptions values={values} setFieldValue={setFieldValue} />
                    </ul>
                  </div>
                </div>
              </Col>
              <CheckoutSidebar values={values} setFieldValue={setFieldValue} data={data} loading={loading} mutate={mutate} userData={userData} />
            </Row>
          </div>
        </Form>
      )
      }
    </Formik >
  );
};

export default Checkout;

'use client'
import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Card, Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { AddtoCartAPI, Category } from "@/Utils/AxiosUtils/API";
import CreateCartContext from "@/Helper/CartContext";
import TopCategories from "@/Components/Pos/TopCategories";
import AllProducts from "@/Components/Pos/AllProducts";
import PosDetailCard from "@/Components/Pos/PosDetailCard";
import Loader from "@/Components/CommonComponent/Loader";
import request from "@/Utils/AxiosUtils";
import SettingContext from "@/Helper/SettingContext";

const POS = () => {
  const [getCategoryId, setGetCategoryId] = useState('')
  const { dispatch, setCartData } = useContext(CreateCartContext);
  const { setSidebarOpen, sidebarOpen } = useContext(SettingContext)
  const { data: CategoryData, isLoading } = useQuery([Category], () => request({ url: Category, params: { type: 'product', status: 1 } }), { refetchOnWindowFocus: false, select: (data) => data.data.data });

  const { data: addToCartData, isLoading: addToCartLoader } = useQuery([AddtoCartAPI], () => request({ url: AddtoCartAPI }), { refetchOnWindowFocus: false, select: (res) => res?.data });
  const [initValues, setInitValues] = useState({ products: [], consumer_id: "", billing_address_id: "", shipping_address_id: "", shipping_total: 0, tax_total: 0, total: 0, variation_id: "" });
  useEffect(() => {
    if (addToCartData?.items.length > 0) {
      setInitValues((prev) => {
        return {
          ...prev, // Preserve the existing values
          products: addToCartData?.items,
          total: addToCartData?.total
        };
      });
    }
  }, [addToCartLoader]);
  useEffect(() => {
    setSidebarOpen(true)
    return() => setSidebarOpen(false)
  }, []);
  if (isLoading || addToCartLoader) return <Loader />
  return (
    <>
      <Formik
        initialValues={initValues}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Row>
            <Col xxl={sidebarOpen ? 8: 9}>
              <TopCategories CategoryData={CategoryData} setGetCategoryId={setGetCategoryId} getCategoryId={getCategoryId} />
                <div className="pos-product-sec">
                  <AllProducts setFieldValue={setFieldValue} values={values} dispatch={dispatch} setCartData={setCartData} CategoryData={CategoryData} getCategoryId={getCategoryId} setGetCategoryId={setGetCategoryId} />
                </div>
              </Col>
              <Col xxl={sidebarOpen ? 4 : 3}>
                <Card className="pos-detail-card">
                  <PosDetailCard values={values} setFieldValue={setFieldValue} dispatch={dispatch} initValues={initValues} />
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default POS;

import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row, TabContent, TabPane } from "reactstrap";
import request from "../../Utils/AxiosUtils";
import { YupObject } from "../../Utils/Validation/ValidationSchemas";
import { CouponTabTitleListData } from "../../Data/TabTitleListData";
import FormBtn from "../../Elements/Buttons/FormBtn";
import TabTitle from "./TabTitle";
import GeneralTabContent from "./GeneralTabContent";
import RestrictionTabContent from "./RestrictionTabContent";
import UsageTabContent from "./UsageTabContent";
import { CouponValidation } from "./CouponValidation";
import { CouponInitialValues } from "./CouponInitialValues";
import { dateFormate } from "../../Utils/CustomFunctions/DateFormate";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const CouponForm = ({ mutate, loading, updateId, title }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [activeTab, setActiveTab] = useState("1");
  const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery(["/coupon/id"], () => request({ url: `/coupon/${updateId}` }), { enabled: false, refetchOnWindowFocus: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  if (updateId && oldDataLoading) return null;
  return (
    <Formik
      initialValues={{ ...CouponInitialValues(updateId, oldData) }}
      validationSchema={YupObject(CouponValidation)}
      onSubmit={(values) => {
        const booleanValues = ["is_expired", "status", "is_unlimited", "is_apply_all", "is_first_order"];
        booleanValues.forEach((item) => (values[item] = Number(values[item])));
        if (values["is_unlimited"]) {
          delete values["usage_per_coupon"];
          delete values["usage_per_customer"];
        } else {
          values["usage_per_coupon"] = Number(values["usage_per_coupon"]);
          values["usage_per_customer"] = Number(values["usage_per_customer"]);
        }
        if (values["is_apply_all"]) {
          delete values["products"];
        } else {
          delete values["exclude_products"];
        }
        values["start_date"] = dateFormate(values["start_date"], true)
        values["end_date"] = dateFormate(values["end_date"], true)
        if (!values["is_expired"]) {
          delete values["start_date"];
          delete values["end_date"];
        }
        if (values["type"] === "free_shipping") {
          delete values["amount"];
        }
        mutate(values);
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Col>
          <Card>
            <div className="title-header option-title">
              <h5>{t(title)}</h5>
            </div>
            <Form className="theme-form theme-form-2 mega-form vertical-tabs">
              <Row>
                <Col xl="3" lg="4">
                  <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={CouponTabTitleListData} errors={errors} touched={touched} />
                </Col>
                <Col xl="7" lg="8">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <GeneralTabContent setFieldValue={setFieldValue} values={values} />
                    </TabPane>
                    <TabPane tabId="2">
                      <RestrictionTabContent values={values} setFieldValue={setFieldValue} errors={errors} />
                    </TabPane>
                    <TabPane tabId="3">
                      <UsageTabContent values={values} loading={loading} />
                    </TabPane>
                    <FormBtn loading={loading} />
                  </TabContent>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      )}
    </Formik>
  );
};

export default CouponForm;

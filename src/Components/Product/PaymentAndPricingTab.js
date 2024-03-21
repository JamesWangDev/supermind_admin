import React, { useContext } from "react";
import SimpleInputField from "../InputFields/SimpleInputField";
import CheckBoxField from "../InputFields/CheckBoxField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const PaymentAndPricingTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  return (
    <>
      <div className="content-color mb-4" style={{fontSize: 16, fontWeight: 600}}>Tier One:</div>
      <div className="ms-5">
        <SimpleInputField nameList={[{ name: "subscription_cost", type: "number", require: "true", placeholder: t("Enter Cost"), title: "Subscription Cost" }]} />
      </div>
      <div className="mb-4" style={{fontSize: 16, fontWeight: 600}}>Usage Limits:</div>
      <div className="ms-5">
        <SimpleInputField nameList={[{ name: "tokens", require: "true", type: "number", placeholder: t("Enter Token Limits"), title: "Tokens" }, { name: "downstream_cost", require: "true", type: "number", placeholder: t("Enter Downstream Costs"), title: "Downstream Costs" }]} />
      </div>
      <div className="ms-5 mt-5">
        <CheckBoxField name="is_allow_overage" title="Alow Overage ?" />

        <SimpleInputField nameList={[{ name: "cost_per_token", require: "true", type: "number", placeholder: t("Enter Cost per Token"), title: "Cost per Token" }, { name: "downstream_cost", require: "true", type: "number", placeholder: t("Enter Downstream Costs"), title: "Downstream Costs" }]} />
      </div>
      <div className="content-color mb-4" style={{fontSize: 16, fontWeight: 600}}>Tier Two:</div>
      <div className="content-color mb-4 mt-4" style={{fontSize: 16, fontWeight: 600}}>Tier Three:</div>
    </>
  );
};

export default PaymentAndPricingTab;

import React, { useContext } from "react";
import SimpleInputField from "../InputFields/SimpleInputField";
import CheckBoxField from "../InputFields/CheckBoxField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SelectField from "../InputFields/SelectField";

const participate_options = [
    {
        id: "standard",
        name: "standard"
    },
    {
        id: "premium",
        name: "premium"
    },
    {
        id: "platinum",
        name: "platinum"
    }
]

const PaymentAndPricingTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  return (
    <>
      {/* <div className="content-color mb-4" style={{fontSize: 16, fontWeight: 600}}>Supermind Subscribers:</div> */}
      <CheckBoxField name="is_sub_participate" title="Participate" />
      <div className="ms-5">
        <SelectField errors={errors} values={values} inputprops={{name: "participate_type", id: "participate_type", options: participate_options}} setFieldValue={setFieldValue} name="participate_type" require="true" data={participate_options} />
      </div>
      <CheckBoxField name="is_sub_direct" title="Direct Suscribers" />
      <div className="ms-5">
        <SimpleInputField nameList={[{ name: "monthly", require: "true", type: "number", placeholder: t("Enter Monthly Price"), title: "Monthly" }, { name: "max_downstream_cost", require: "true", type: "number", placeholder: t("Enter Max Downstream Costs"), title: "Max Downstream Costs" }, { name: "overage_profit_margin", require: "true", type: "number", placeholder: t("Enter Overage Profit Margin"), title: "Overage Profit Margin" }]} />
      </div>
      {/* <div className="ms-5 mt-5">
        <CheckBoxField name="is_allow_overage" title="Alow Overage ?" />

        <SimpleInputField nameList={[{ name: "cost_per_token", require: "true", type: "number", placeholder: t("Enter Cost per Token"), title: "Cost per Token" }, { name: "downstream_cost", require: "true", type: "number", placeholder: t("Enter Downstream Costs"), title: "Downstream Costs" }]} />
      </div>
      <div className="content-color mb-4" style={{fontSize: 16, fontWeight: 600}}>Tier Two:</div>
      <div className="content-color mb-4 mt-4" style={{fontSize: 16, fontWeight: 600}}>Tier Three:</div> */}
    </>
  );
};

export default PaymentAndPricingTab;

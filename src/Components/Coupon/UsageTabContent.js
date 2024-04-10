
import { useContext } from "react";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const UsageTabContent = ({ values, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <CheckBoxField name="is_unlimited" />
      {!values["is_unlimited"] && <SimpleInputField nameList={[{
        name: "usage_per_coupon", placeholder: t("EnterValue"), helpertext: "*Specify the maximum number of times a single coupon can be utilized."
      }, { name: "usage_per_customer", placeholder: t("EnterValue"), helpertext: "*Specify the maximum number of times a single customer can utilize the coupon." }]} />}
    </>
  );
};

export default UsageTabContent;

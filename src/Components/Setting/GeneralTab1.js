import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import { currency } from "../../Utils/AxiosUtils/API";
import Loader from "../CommonComponent/Loader";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const GeneralTab1 = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data: CurrencyData, isLoading, refetch } = useQuery([currency], () => request({ url: currency }), {
    enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data?.map((elem) => { return { name: elem.code, id: elem.id } })
  });
  useEffect(() => { refetch() }, [])
  if (isLoading) return <Loader />
  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            name: "[values][general][default_currency_id]",
            title: "Currency",
            inputprops: {
              name: "[values][general][default_currency_id]",
              id: "[values][general][default_currency_id]",
              options: CurrencyData
            },
          },
        ]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "[values][general][admin_site_language_direction]",
            title: "Direction",
            inputprops: {
              name: "[values][general][admin_site_language_direction]",
              id: "[values][general][admin_site_language_direction]",
              options: [{ name: 'RTL', id: "rtl" }, { name: 'LTR', id: "ltr" }]
            },
          },
        ]}
      />
      <SimpleInputField
        nameList={[
          { name: "[values][general][min_order_amount]", title: "MinimunOrderAmount", placeholder: t("EnterMinOrderAmount"), helpertext: "*Please enter the minimum amount required for an order to be processed." },
          { name: "[values][general][min_order_free_shipping]", type: 'number', title: "MinimumOrderFreeShipping", placeholder: t("EnterMinOrderFreeShipping"), helpertext: "*Please enter the minimum order amount for free shipping" },
          { name: "[values][general][product_sku_prefix]", title: "StorePrefix", placeholder: t("EnterStorePrefix") }]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "[values][general][mode]",
            title: "Mode",
            inputprops: {
              name: "[values][general][mode]",
              id: "[values][general][mode]",
              options: [
                { id: "light-only", name: "Light" },
                { id: "dark-only", name: "Dark" }
              ],
            },
          },
        ]}
      />
      <SimpleInputField
        nameList={[{ name: "[values][general][copyright]", title: "Copyright", placeholder: t("EnterCopyright") },
        ]}
      />
    </>
  );
};

export default GeneralTab1;

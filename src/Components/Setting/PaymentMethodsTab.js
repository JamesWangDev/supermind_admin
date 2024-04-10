import React, { Fragment, useContext, useState } from "react";
import { SettingPaymentMethodTab } from "@/Data/TabTitleListData";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";


const PaymentMethodsTab = ({ errors, touched }) => {

  const paymentMethodsProvider = {
    PaypalProvider: {
      paypal: ["client_id", "client_secret", "sandbox_mode", "status", "title"]
    },
    CcAvenueProvider:{
      ccavenue: ["title", "status", "access_code", "merchant_id", "sandbox_mode", "working_key" ] 
    },
    StripeProvider: {
      stripe: ["key", "secret", "status", "title"],
    },
    RazorpayProvider: {
      razorpay: ["key", "secret", "status", "title"],
    },
    CashOnDeliveryProvider: {
      status: ["status", "title"],
    },
    MollieProvider: {
      mollie: ["secret_key", "status", "title"]
    },
    InstaMojoProvider: {
      instamojo: ["client_id", "client_secret", "salt_key", "sandbox_mode", "status", "title"]
    },
    PhonepeProvider: {
      phonepe: ["merchant_id", "salt_index", "salt_key", "sandbox_mode", "status", "title"]
    }
  }
  const toggleInputs = ["status", "sandbox_mode"];
  const [active, setActive] = useState();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className="inside-horizontal-tabs payment-accordion-tab">
      {SettingPaymentMethodTab.map((paymentMethod, ind) => (
        <div className="shipping-accordion-custom" index={ind}>
          <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== ind && ind)}>
            {t(paymentMethod.title)}{active === ind ? <RiArrowUpSLine /> :<RiArrowDownSLine />}
          </div>
          {active === ind && (
            <>{Object.keys(paymentMethodsProvider[paymentMethod.key]).map((key) => (
              <div className="shipping-accordion-box" key={key}>
                {paymentMethodsProvider[paymentMethod.key][key].map((item) => (
                  <Fragment key={item}>{toggleInputs.includes(item) ? <CheckBoxField name={`[values][payment_methods][${key}][${item}]`} title={item} /> : <SimpleInputField nameList={[{ name: `[values][payment_methods][${key}][${item}]`, title: item }]} />}</Fragment>
                ))}
              </div>
            ))
            }</>
          )}
        </div>)
      )} 
    </div>
  );
};

export default PaymentMethodsTab;

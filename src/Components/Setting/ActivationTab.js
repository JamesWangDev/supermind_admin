import CheckBoxField from "../InputFields/CheckBoxField";

const ActivationTab = () => {

  return (
    <>
      <CheckBoxField name="[values][activation][multivendor]" title="MultiVendor" helpertext="*Enable or disable external vendors access to our online store." />
      <CheckBoxField name="[values][activation][store_auto_approve]" title="StoreAutoApprove" helpertext="*Enable automatic acceptance of vendor products without manual review." />
      <CheckBoxField name="[values][activation][wallet_enable]" title="WalletEnable" helpertext="*Enable the use of wallet balance for payment during checkout." />
      <CheckBoxField name="[values][activation][point_enable]" title="PointEnable" helpertext="*Enable the use of points for payment during checkout." />
      <CheckBoxField name="[values][activation][coupon_enable]" title="CouponEnable" helpertext="*Allow customers to use coupons for payment at checkout." />
      <CheckBoxField name="[values][activation][product_auto_approve]" title="ProductAutoApprove" helpertext="*Admin approval is necessary for new stores, similar to product approval." />
      <CheckBoxField name="[values][activation][stock_product_hide]" title="StockProductHide" helpertext="*Decide whether to show product stock or not." />
    </>
  );
};

export default ActivationTab;
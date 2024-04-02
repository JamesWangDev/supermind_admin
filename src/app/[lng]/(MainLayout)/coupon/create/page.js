'use client'

import CouponForm from "@/Components/Coupon/CouponForm";
import { coupon } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";

const AddNewCoupon = () => {
  const { mutate, isLoading } = useCreate(coupon, false, '/coupon');
  return <CouponForm mutate={mutate} loading={isLoading} title={"CreateCoupons"} />;
};

export default AddNewCoupon;

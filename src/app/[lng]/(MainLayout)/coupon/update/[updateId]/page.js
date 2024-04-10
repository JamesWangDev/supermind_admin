'use client'

import CouponForm from "@/Components/Coupon/CouponForm";
import { coupon } from "@/Utils/AxiosUtils/API";
import useUpdate from "@/Utils/Hooks/useUpdate";

const CouponUpdate = ({ params }) => {
  const { mutate, isLoading } = useUpdate(coupon, params?.updateId, coupon);

  return (
    params?.updateId && (
      <CouponForm mutate={mutate} updateId={params?.updateId} loading={isLoading} title={"UpdateCoupon"} />
    )
  );
};

export default CouponUpdate;
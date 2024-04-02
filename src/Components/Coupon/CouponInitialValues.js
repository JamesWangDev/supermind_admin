
export function CouponInitialValues(updateId, oldData) {
    return {
        title: updateId ? oldData?.data?.title || "" : "",
        description: updateId ? oldData?.data?.description || "" : "",
        code: updateId ? oldData?.data?.code || "" : "",
        type: updateId ? oldData?.data?.type || "" : "",
        amount: updateId ? oldData?.data?.amount || "" : "",
        min_spend: updateId ? oldData?.data?.min_spend || "" : "",
        is_unlimited: updateId ? Boolean(Number(oldData?.data?.is_unlimited)) : false,
        usage_per_coupon: updateId ? oldData?.data?.usage_per_coupon || "" : "",
        usage_per_customer: updateId ? oldData?.data?.usage_per_customer || "" : "",
        status: updateId ? Boolean(Number(oldData?.data?.status)) || "" : true,
        is_expired: updateId ? Boolean(Number(oldData?.data?.is_expired)) || "" : false,
        start_date: updateId ? oldData?.data?.start_date || new Date() : new Date(),
        end_date: updateId ? oldData?.data?.end_date || new Date() : new Date(),
        is_apply_all: updateId ? Boolean(Number(oldData?.data?.is_apply_all)) || "" : "",
        is_first_order: updateId ? Boolean(Number(oldData?.data?.is_first_order)) || "" : "",
        products: updateId ? oldData?.data?.products.map((elem) => elem.id) || [] : [],
        exclude_products: updateId ? oldData?.data?.exclude_products.map((elem) => elem.id) || [] : [],
    }
}
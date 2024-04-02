import { ifIsApplyAll, ifIsExpirable, ifTypeIsfree_shipping, nameSchema } from "../../Utils/Validation/ValidationSchemas";

export const CouponValidation = {
    title: nameSchema,
    description: nameSchema,
    code: nameSchema,
    type: nameSchema,
    min_spend: nameSchema,
    start_date: ifIsExpirable,
    end_date: ifIsExpirable,
    amount: ifTypeIsfree_shipping,
    products: ifIsApplyAll,
}

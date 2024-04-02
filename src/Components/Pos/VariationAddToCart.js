import { useContext } from "react";
import Btn from "@/Elements/Buttons/Btn";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";


const VariationAddToCart = ({ cloneVariation, setFieldValue, mutate, isLoading }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const addToCart = (allProduct) => {
        if (cloneVariation.selectedVariation) {
            const params = {
                product_id: allProduct?.id,
                variation_id: cloneVariation?.selectedVariation?.id,
                quantity: cloneVariation?.productQty,
            };
            setFieldValue('variation_id', cloneVariation?.selectedVariation?.id)
            mutate(params)
        }
    }
    return (
        <div className="addtocart_btn">
            <Btn className="add-button addcart-button btn buy-button" disabled={cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.stock_status !== 'in_stock' : true} onClick={() => addToCart(cloneVariation.product)} loading={Number(isLoading)}>
                <span>
                    {cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.stock_status == 'in_stock' ? t("AddToCart") : t("OutOfStock") : t("AddToCart")}
                </span>
            </Btn>
        </div>
    )
}
export default VariationAddToCart
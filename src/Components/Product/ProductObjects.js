import { descriptionSchema, discountSchema, dropDownScheme, ifTypeSimpleSchema, nameSchema, variationSchema, externalUrlSchema } from "../../Utils/Validation/ValidationSchemas";

export const ProductValidationSchema = {
  name: nameSchema,
  short_description: nameSchema,
  description: descriptionSchema,
  stock_status: nameSchema,
  external_url: externalUrlSchema,
  sku: ifTypeSimpleSchema,
  quantity: ifTypeSimpleSchema,
  price: ifTypeSimpleSchema, // if (type == simple)
  discount: discountSchema, // if (type == simple)
  categories: dropDownScheme,
  tax_id: nameSchema,
  variations: variationSchema
};

export function ProductInitValues(oldData, updateId) {
  const attr_combination = () => {
    let attributes = oldData?.attributes?.map((value) => value?.id);
    let variants = attributes?.map((attr, i) => {
      let matchingVariations = oldData?.variations.filter((variation) => {
        return variation.attribute_values.some((attrVal) => attrVal?.attribute_id == attr);
      });

      let attributeValues = matchingVariations?.reduce((acc, variation) => {
        let values = variation.attribute_values.filter((attrVal) => attrVal?.attribute_id == attr).map((attrVal) => attrVal?.id);
        return values ? [...new Set([...acc, ...values])] : acc;
      }, []);
      return oldData?.attributes[i] && attributeValues.length > 0 ? { name: oldData?.attributes[i], values: attributeValues } : false;
    });
    return variants?.filter((elem) => elem !== false);
  };
  return {
    // General
    name: updateId ? oldData?.name || "" : "",
    short_description: updateId ? oldData?.short_description || "" : "",
    description: updateId ? oldData?.description || "" : "",
    store_id: updateId ? Number(oldData?.store_id) || "" : "",
    // Inverntory  =>Type: Simple
    type: updateId ? oldData?.type || "" : "simple",
    unit: updateId ? oldData?.unit || "" : "",
    weight: updateId ? oldData?.weight || "" : "",
    stock_status: updateId ? oldData?.stock_status || "" : "in_stock",
    show_stock_quantity: updateId ? oldData?.show_stock_quantity == 1 ? true : false : false,
    sku: updateId ? oldData?.sku || "" : "",
    quantity: updateId ? oldData?.quantity || "" : "",
    price: updateId ? oldData?.price || "" : "",
    sale_price: updateId ? oldData?.sale_price || "" : "0.00",
    discount: updateId ? oldData?.discount || "" : "",
    is_sale_enable: updateId ? oldData?.is_sale_enable || false : false,
    sale_starts_at: updateId ? oldData?.sale_starts_at || new Date() : new Date(),
    sale_expired_at: updateId ? oldData?.sale_expired_at || new Date() : new Date(),
    // Inventory  =>Type: Classified
    variations: updateId ? oldData?.variations : [],
    combination: updateId ? attr_combination() : [{}],
    attributesName: updateId ? oldData?.attributes : [],
    attributes_ids: updateId ? oldData?.attributes?.map((elem) => elem.id) : [],
    is_external: updateId &&  oldData?.external_url ? true : false,
    external_button_text: updateId ? oldData?.external_button_text : '',
    external_url: updateId ? oldData?.external_url : '',
    variation_image_id: "",
    // Setup
    tags: updateId ? oldData?.tags?.map((item) => item.id) || [] : [],
    categories: updateId ? oldData?.categories?.map((item) => item.id) || [] : [],
    is_random_related_products: updateId ? Boolean(Number(oldData?.is_random_related_products)) : true,
    related_products: updateId ? oldData?.related_products?.map((elem) => elem) || [] : [],
    cross_sell_products: updateId ? oldData?.cross_sell_products?.map((elem) => elem) || [] : [],
    // Images
    product_thumbnail: updateId ? oldData?.product_thumbnail || "" : "",
    product_thumbnail_id: updateId ? oldData?.product_thumbnail?.id || "" : "",
    size_chart_image: updateId ? oldData?.size_chart_image || "" : "",
    size_chart_image_id: updateId ? oldData?.size_chart_image?.id || "" : "",
    product_galleries: updateId ? oldData?.product_galleries?.map((img) => img) || "" : "",
    product_galleries_id: updateId ? oldData?.product_galleries?.map((elem) => elem.id) || "" : "",
    // SEO
    meta_title: updateId ? oldData?.meta_title || "" : "",
    meta_description: updateId ? oldData?.meta_description || "" : "",
    product_meta_image_id: updateId ? oldData?.product_meta_image_id?.id || "" : "",
    product_meta_image: updateId ? oldData?.product_meta_image || "" : "",
    // Shipping Tax
    is_free_shipping: updateId ? Boolean(Number(oldData?.is_free_shipping)) : "",
    tax_id: updateId ? oldData?.tax_id : "",
    estimated_delivery_text: updateId ? oldData?.estimated_delivery_text : "",
    return_policy_text: updateId ? oldData?.return_policy_text : "",

    // Status
    is_featured: updateId ? Boolean(oldData?.is_featured) : false,
    safe_checkout: updateId ? Boolean(oldData?.safe_checkout) : true,
    secure_checkout: updateId ? Boolean(oldData?.secure_checkout) : true,
    social_share: updateId ? Boolean(oldData?.social_share) : true,
    encourage_order: updateId ? Boolean(oldData?.encourage_order) : true,
    encourage_view: updateId ? Boolean(oldData?.encourage_view) : true,
    is_trending: updateId ? Boolean(oldData?.is_trending) : false,
    is_return: updateId ? Boolean(oldData?.is_return) : true,
    status: updateId ? Boolean(oldData?.status) : true
  };
}

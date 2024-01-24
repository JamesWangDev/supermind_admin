const HomePage3InitialValue = (data) => {
    let obj = {}
    data?.content?.product_bundles?.bundles.length > 0 &&
        data?.content?.product_bundles?.bundles.forEach((elem, index) => {
            elem.image_url ? obj[`productBundleImage${index}`] = { original_url: elem?.image_url } : ''
            return obj
        })
    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,

        // MultiSelect Varables
        productList1Product: data?.content?.products_list_1?.product_ids || [],
        productList2Product: data?.content?.products_list_2?.product_ids || [],
        featureBlogSelect: data?.content?.featured_blogs?.blog_ids || [],

        categoryIconList: data?.content?.categories_icon_list?.category_ids || [],

        sliderProduct1: data?.content?.slider_products?.product_slider_1?.product_ids || [],
        sliderProduct2: data?.content?.slider_products?.product_slider_2?.product_ids || [],
        sliderProduct3: data?.content?.slider_products?.product_slider_3?.product_ids || [],
        sliderProduct4: data?.content?.slider_products?.product_slider_4?.product_ids || [],

        // Images
        homeBannerMainImage: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } || '' : "",
        homeBannerSubBannerImage: data?.content?.home_banner?.sub_banner_1?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_1?.image_url } || '' : '',
        categoriesIconImage: data?.content?.categories_icon_list?.image_url ? { original_url: data?.content?.categories_icon_list?.image_url } || '' : '',
        offerBannerImage: data?.content?.offer_banner?.image_url ? { original_url: data?.content?.offer_banner?.image_url } || '' : '',
        couponImage: data?.content?.coupons?.image_url ? { original_url: data?.content?.coupons?.image_url } || '' : '',
        newsLetterImage: data?.content?.news_letter?.image_url ? { original_url: data?.content?.news_letter?.image_url } || '' : '',
        ...obj,

        // Redirect Link
        homeBannerLinkType: data?.content?.home_banner?.main_banner?.redirect_link?.link_type || '',
        homeBannerLink: data?.content?.home_banner?.main_banner?.redirect_link?.link || "",

        homeSubBanner1LinkType: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link_type || '',
        homeSubBanner1Link: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link || '',

        couponBannerLinkType: data?.content?.coupons?.redirect_link?.link_type || "",
        couponBannerLink: data?.content?.coupons?.redirect_link?.link || "",

        offerBannerLinkType: data?.content?.offer_banner?.redirect_link?.link_type || "",
        offerBannerLink: data?.content?.offer_banner?.redirect_link?.link || ""
    }
}

export default HomePage3InitialValue
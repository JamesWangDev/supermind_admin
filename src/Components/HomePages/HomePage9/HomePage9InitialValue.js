const HomePage9InitialValue = (data) => {
    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,

        // Images
        homeBanner9Image: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } : "",

        categoriesIconImage: data?.content?.categories_icon_list?.image_url ? { original_url: data?.content?.categories_icon_list?.image_url } || '' : '',

        twoColumnBanner1Image: data?.content?.two_column_banners?.banner_1?.image_url ? { original_url: data?.content?.two_column_banners?.banner_1?.image_url } : "",

        twoColumnBanner2Image: data?.content?.two_column_banners?.banner_2?.image_url ? { original_url: data?.content?.two_column_banners?.banner_2?.image_url } : "",

        SliderProductBannerImage: data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.image_url ? { original_url: data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.image_url } : "",

        couponBannerImage: data?.content?.coupon_banner?.image_url ? { original_url: data?.content?.coupon_banner?.image_url } : "",

        newsLetterImage: data?.content?.news_letter?.image_url ? { original_url: data?.content?.news_letter?.image_url } || '' : '',

        // MultiSelect

        sliderProduct1: data?.content?.slider_product_with_banner?.slider_products?.product_slider_1?.product_ids || [],
        sliderProduct2: data?.content?.slider_product_with_banner?.slider_products?.product_slider_2?.product_ids || [],
        sliderProduct3: data?.content?.slider_product_with_banner?.slider_products?.product_slider_3?.product_ids || [],

        productListImage1: data?.content?.products_list_1?.product_ids || [],
        productListImage2: data?.content?.products_list_2?.product_ids || [],
        productListImage3: data?.content?.products_list_3?.product_ids || [],

        categoryIconList: data?.content?.categories_icon_list?.category_ids || [],

        // Redirect Link

        homeBannerLinkType: data?.content?.home_banner?.main_banner?.redirect_link?.link_type || '',
        homeBannerLink: data?.content?.home_banner?.main_banner?.redirect_link?.link || "",

        twoBanners1LinkType: data?.content?.two_column_banners?.banner_1?.redirect_link?.link_type || "",
        twoBanners1Link: data?.content?.two_column_banners?.banner_1?.redirect_link?.link || "",

        twoBanners2LinkType: data?.content?.two_column_banners?.banner_2?.redirect_link?.link_type || "",
        twoBanners2Link: data?.content?.two_column_banners?.banner_2?.redirect_link?.link || "",

        couponBannerLinkType: data?.content?.coupon_banner?.redirect_link?.link_type || "",
        couponBannerLink: data?.content?.coupon_banner?.redirect_link?.link || "",

        leftSliderBannerLinkType: data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.redirect_link?.link_type || "",
        leftSliderBannerLink: data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.redirect_link?.link || "",
    }
}

export default HomePage9InitialValue
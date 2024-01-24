import { concatDynamicProductKeys } from "../../../Utils/CustomFunctions/concatDynamicProductKeys"

const HomePage9Submit = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))

    if (values['homeBanner9Image']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeBanner9Image'].original_url
    } else values['content']['home_banner']['main_banner']['image_url'] = ''

    if (values['categoriesIconImage']) {
        values['content']['categories_icon_list']['image_url'] = values['categoriesIconImage'].original_url
    } else values['content']['categories_icon_list']['image_url'] = ""

    if (values['twoColumnBanner1Image']) {
        values['content']['two_column_banners']['banner_1']['image_url'] = values['twoColumnBanner1Image'].original_url
    } else values['content']['two_column_banners']['banner_1']['image_url'] = ''

    if (values['twoColumnBanner2Image']) {
        values['content']['two_column_banners']['banner_2']['image_url'] = values['twoColumnBanner2Image'].original_url
    } else values['content']['two_column_banners']['banner_2']['image_url'] = ''

    if (values['newsLetterImage']) {
        values['content']['news_letter']['image_url'] = values['newsLetterImage'].original_url
    } else values['content']['news_letter']['image_url'] = ""

    // MultiSelect
    if (values['categoryIconList']) {
        values['content']['categories_icon_list']['category_ids'] = values['categoryIconList']
    }
    if (values['sliderProduct1']) {
        values['content']['slider_product_with_banner']['slider_products']['product_slider_1']['product_ids'] = values['sliderProduct1']
    }
    if (values['sliderProduct2']) {
        values['content']['slider_product_with_banner']['slider_products']['product_slider_2']['product_ids'] = values['sliderProduct2']
    }
    if (values['sliderProduct3']) {
        values['content']['slider_product_with_banner']['slider_products']['product_slider_3']['product_ids'] = values['sliderProduct3']
    }

    if (values['productListImage1']) {
        values['content']['products_list_1']['product_ids'] = values['productListImage1']
    }
    if (values['productListImage2']) {
        values['content']['products_list_2']['product_ids'] = values['productListImage2']
    }
    if (values['productListImage3']) {
        values['content']['products_list_3']['product_ids'] = values['productListImage3']
    }

    // For Passing Redirect Link
    // --------------------------------------------------------------------------
    if (values['homeBannerLinkType']) {
        values['content']['home_banner']['main_banner']['redirect_link']['link_type'] = values['homeBannerLinkType'];
    } else {
        values['content']['home_banner']['main_banner']['redirect_link']['link_type'] = "";
        values['content']['home_banner']['main_banner']['redirect_link']['link'] = "";
        values['homeBannerLinkType'] = "";
    }
    if (values['homeBannerLink']) {
        values['content']['home_banner']['main_banner']['redirect_link']['link'] = values['homeBannerLink']
        if (values['homeBannerLinkType'] == "product") {
            values['content']['home_banner']['main_banner']['redirect_link']['product_ids'] = values['homeBannerLink']
        } else {
            values['content']['home_banner']['main_banner']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['home_banner']['main_banner']['redirect_link']['link'] = ""
    }
    // --------------------------------------------------------------------------
    if (values['twoBanners1LinkType']) {
        values['content']['two_column_banners']['banner_1']['redirect_link']['link_type'] = values['twoBanners1LinkType'];
    } else {
        values['content']['two_column_banners']['banner_1']['redirect_link']['link_type'] = "";
        values['content']['two_column_banners']['banner_1']['redirect_link']['link'] = "";
        values['twoBanners1LinkType'] = "";
    }
    if (values['twoBanners1Link']) {
        values['content']['two_column_banners']['banner_1']['redirect_link']['link'] = values['twoBanners1Link']
        if (values['twoBanners1LinkType'] == "product") {
            values['content']['two_column_banners']['banner_1']['redirect_link']['product_ids'] = values['twoBanners1Link']
        } else {
            values['content']['two_column_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // --------------------------------------------------------------------------
    if (values['twoBanners2LinkType']) {
        values['content']['two_column_banners']['banner_2']['redirect_link']['link_type'] = values['twoBanners2LinkType'];
    } else {
        values['content']['two_column_banners']['banner_2']['redirect_link']['link_type'] = "";
        values['content']['two_column_banners']['banner_2']['redirect_link']['link'] = "";
        values['twoBanners2LinkType'] = "";
    }
    if (values['twoBanners2Link']) {
        values['content']['two_column_banners']['banner_2']['redirect_link']['link'] = values['twoBanners2Link']
        if (values['twoBanners2LinkType'] == "product") {
            values['content']['two_column_banners']['banner_2']['redirect_link']['product_ids'] = values['twoBanners2Link']
        } else {
            values['content']['two_column_banners']['banner_2']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['two_column_banners']['banner_2']['redirect_link']['link'] = ""
    }
    // --------------------------------------------------------------------------
    if (values['couponBannerLinkType']) {
        values['content']['coupon_banner']['redirect_link']['link_type'] = values['couponBannerLinkType'];
    } else {
        values['content']['coupon_banner']['redirect_link']['link_type'] = "";
        values['content']['coupon_banner']['redirect_link']['link'] = "";
        values['couponBannerLinkType'] = "";
    }
    if (values['couponBannerLink']) {
        values['content']['coupon_banner']['redirect_link']['link'] = values['couponBannerLink']
        if (values['couponBannerLinkType'] == "product") {
            values['content']['coupon_banner']['redirect_link']['product_ids'] = values['couponBannerLink']
        } else {
            values['content']['coupon_banner']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['coupon_banner']['redirect_link']['link'] = ""
    }
    // --------------------------------------------------------------------------
    if (values['leftSliderBannerLinkType']) {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link_type'] = values['leftSliderBannerLinkType'];
    } else {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link_type'] = "";
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link'] = "";
        values['leftSliderBannerLinkType'] = "";
    }
    if (values['leftSliderBannerLink']) {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link'] = values['leftSliderBannerLink']
        if (values['leftSliderBannerLinkType'] == "product") {
            values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['product_ids'] = values['leftSliderBannerLink']
        } else {
            values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link'] = "";
    }

    mutate(values)
}

export default HomePage9Submit
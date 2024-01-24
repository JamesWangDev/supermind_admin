import { concatDynamicProductKeys } from "../../../Utils/CustomFunctions/concatDynamicProductKeys"

const HomePage2Submit = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))

    // Images
    if (values['homeMainBannerImage']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeMainBannerImage'].original_url
    } else values['content']['home_banner']['main_banner']['image_url'] = ""

    if (values['homeMainSubBanner1Image']) {
        values['content']['home_banner']['sub_banner_1']['image_url'] = values['homeMainSubBanner1Image'].original_url
    } else values['content']['home_banner']['sub_banner_1']['image_url'] = ''

    if (values['homeMainSubBanner2Image']) {
        values['content']['home_banner']['sub_banner_2']['image_url'] = values['homeMainSubBanner2Image'].original_url
    } else values['content']['home_banner']['sub_banner_2']['image_url'] = ''

    if (values['categoriesIconImage']) {
        values['content']['categories_icon_list']['image_url'] = values['categoriesIconImage'].original_url
    } else values['content']['categories_icon_list']['image_url'] = ''

    if (values['couponImage']) {
        values['content']['coupons']['image_url'] = values['couponImage'].original_url
    } else values['content']['coupons']['image_url'] = ''

    if (values['mainContentRightBanner1Image']) {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['image_url'] = values['mainContentRightBanner1Image'].original_url
    } else values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['image_url'] = ''

    if (values['mainContentRightBanner2Image']) {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['image_url'] = values['mainContentRightBanner2Image'].original_url
    } else values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['image_url'] = ''

    if (values['fullWidthImage']) {
        values['content']['full_width_banner']['image_url'] = values['fullWidthImage'].original_url
    } else values['content']['full_width_banner']['image_url'] = ''

    if (values['newsLetterImage']) {
        values['content']['news_letter']['image_url'] = values['newsLetterImage'].original_url
    } else values['content']['news_letter']['image_url'] = ''

    values['content']['featured_banners']['banners'].forEach((elem, i) => {
        if (values[`featureBannerImage${i}`]) {
            values['content']['featured_banners']['banners'][i]['image_url'] = values[`featureBannerImage${i}`].original_url
        } else { values['content']['featured_banners']['banners'][i]['image_url'] = '' }

        if (values[`featureRedirectLinkType${i}`] || values[`featureRedirectLink${i}`]) {
            values['content']['featured_banners']['banners'][i]['redirect_link']['link_type'] = values[`featureRedirectLinkType${i}`]
            values['content']['featured_banners']['banners'][i]['redirect_link']['link'] = values[`featureRedirectLink${i}`]
            if (values[`featureRedirectLinkType${i}`] == "product") {
                values['content']['featured_banners']['banners'][i]['redirect_link']['product_ids'] = values[`featureRedirectLink${i}`]
            } else {
                values['content']['featured_banners']['banners'][i]['redirect_link']['product_ids'] = ''
            }
        } else {
            values['content']['featured_banners']['banners'][i]['redirect_link']['link_type'] = ''
            values['content']['featured_banners']['banners'][i]['redirect_link']['link'] = ''
        }
    })

    // MultiSelect Variables
    if (values['mainContentSection3ProductIds']) {
        values['content']['main_content']['section3_products']['product_ids'] = values['mainContentSection3ProductIds']
    }

    if (values['categoryIconList']) {
        values['content']['categories_icon_list']['category_ids'] = values['categoryIconList']
    }

    if (values['mainContentSection4ProductIds']) {
        values['content']['main_content']['section4_products']['product_ids'] = values['mainContentSection4ProductIds']
    }

    if (values['mainLeftProduct1']) {
        values['content']['main_content']['section1_products']['product_ids'] = values['mainLeftProduct1']
    }
    if (values['mainLeftProduct2']) {
        values['content']['main_content']['section2_slider_products']['product_ids'] = values['mainLeftProduct2']
    }
    if (values['sliderProduct1']) {
        values['content']['slider_products']['product_slider_1']['product_ids'] = values['sliderProduct1']
    }
    if (values['sliderProduct2']) {
        values['content']['slider_products']['product_slider_2']['product_ids'] = values['sliderProduct2']
    }
    if (values['sliderProduct3']) {
        values['content']['slider_products']['product_slider_3']['product_ids'] = values['sliderProduct3']
    }
    if (values['sliderProduct4']) {
        values['content']['slider_products']['product_slider_4']['product_ids'] = values['sliderProduct4']
    }

    // For Passing Redirect Link
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
    // ---------------------------------------------------------------------
    if (values['homeSubBanner1LinkType']) {
        values['content']['home_banner']['sub_banner_1']['redirect_link']['link_type'] = values['homeSubBanner1LinkType'];
    } else {
        values['content']['home_banner']['sub_banner_1']['redirect_link']['link_type'] = ''
        values['content']['home_banner']['sub_banner_1']['redirect_link']['link'] = ""
    }
    if (values['homeSubBanner1Link']) {
        values['content']['home_banner']['sub_banner_1']['redirect_link']['link'] = values['homeSubBanner1Link']
        if (values['homeSubBanner1LinkType'] == "product") {
            values['content']['home_banner']['sub_banner_1']['redirect_link']['product_ids'] = values['homeSubBanner1Link']
        } else {
            values['content']['home_banner']['sub_banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['home_banner']['sub_banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['homeSubBanner2LinkType']) {
        values['content']['home_banner']['sub_banner_2']['redirect_link']['link_type'] = values['homeSubBanner2LinkType'];
    } else {
        values['content']['home_banner']['sub_banner_2']['redirect_link']['link_type'] = ''
        values['content']['home_banner']['sub_banner_2']['redirect_link']['link'] = ""
    }
    if (values['homeSubBanner2Link']) {
        values['content']['home_banner']['sub_banner_2']['redirect_link']['link'] = values['homeSubBanner2Link']
        if (values['homeSubBanner2LinkType'] == "product") {
            values['content']['home_banner']['sub_banner_2']['redirect_link']['product_ids'] = values['homeSubBanner2Link']
        } else {
            values['content']['home_banner']['sub_banner_2']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['home_banner']['sub_banner_2']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['couponBannerLinkType']) {
        values['content']['coupons']['redirect_link'] = {}
        values['content']['coupons']['redirect_link']['link_type'] = values['couponBannerLinkType'];
    } else {
        values['content']['coupons']['redirect_link']['link_type'] = ''
        values['content']['coupons']['redirect_link']['link'] = ""
    }
    if (values['couponBannerLink']) {
        values['content']['coupons']['redirect_link']['link'] = values['couponBannerLink']
        if (values['couponBannerLinkType'] == "product") {
            values['content']['coupons']['redirect_link']['product_ids'] = values['couponBannerLink']
        } else {
            values['content']['coupons']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['coupons']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainRightBanner1LinkType']) {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link'] = {}
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link_type'] = values['mainRightBanner1LinkType'];
    } else {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link_type'] = ''
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link'] = ""
    }
    if (values['mainRightBanner1Link']) {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link'] = values['mainRightBanner1Link']
        if (values['mainRightBanner1LinkType'] == "product") {
            values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['product_ids'] = values['mainRightBanner1Link']
        } else {
            values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainRightBanner2LinkType']) {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['redirect_link'] = {}
        values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['redirect_link']['link_type'] = values['mainRightBanner2LinkType'];
    } else {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['redirect_link']['link_type'] = ''
        values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['redirect_link']['link'] = ""
    }
    if (values['mainRightBanner2Link']) {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['redirect_link']['link'] = values['mainRightBanner2Link']
        if (values['mainRightBanner2LinkType'] == "product") {
            values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['redirect_link']['product_ids'] = values['mainRightBanner2Link']
        } else {
            values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_2']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['fullWidthLinkType']) {
        values['content']['full_width_banner']['redirect_link'] = {}
        values['content']['full_width_banner']['redirect_link']['link_type'] = values['fullWidthLinkType'];
    } else {
        values['content']['full_width_banner']['redirect_link']['link_type'] = ''
        values['content']['full_width_banner']['redirect_link']['link'] = ""
    }
    if (values['fullWidthLink']) {
        values['content']['full_width_banner']['redirect_link']['link'] = values['fullWidthLink']
        if (values['fullWidthLinkType'] == "product") {
            values['content']['full_width_banner']['redirect_link']['product_ids'] = values['fullWidthLink']
        } else {
            values['content']['full_width_banner']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['full_width_banner']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    mutate(values)
}

export default HomePage2Submit
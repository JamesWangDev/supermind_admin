import { concatDynamicProductKeys } from "../../../Utils/CustomFunctions/concatDynamicProductKeys"

const HomePage6Submit = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))

    // Multiselect
    if (values['productListProductIds']) {
        values['content']['product_list_1']['product_ids'] = values['productListProductIds']
    }
    if (values['leftCategory2']) {
        values['content']['main_content']['section2_categories_icon_list']['category_ids'] = values['leftCategory2']
    }
    if (values['mainContentProductIds']) {
        values['content']['main_content']['section4_products']['product_ids'] = values['mainContentProductIds']
    }
    if (values['mainContentRightSidebarProductIds']) {
        values['content']['main_content']['sidebar']['sidebar_products']['product_ids'] = values['mainContentRightSidebarProductIds']
    }
    if (values['section1Products']) {
        values['content']['main_content']['section1_products']['product_ids'] = values['section1Products']
    }
    if (values['sidebarCategory1']) {
        values['content']['main_content']['sidebar']['categories_icon_list']['category_ids'] = values['sidebarCategory1']
    }

    // Images
    if (values['homeBannerImage1']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeBannerImage1'].original_url
    } else values['content']['home_banner']['main_banner']['image_url'] = ''

    if (values['homeBannerImage2']) {
        values['content']['home_banner']['sub_banner_1']['image_url'] = values['homeBannerImage2'].original_url
    } else values['content']['home_banner']['sub_banner_1']['image_url'] = ''

    if (values['mainContentLeftCategoryImage']) {
        values['content']['main_content']['section2_categories_icon_list']['image_url'] = values['mainContentLeftCategoryImage'].original_url

    } else values['content']['main_content']['section2_categories_icon_list']['image_url'] = ''

    if (values['mainContentLeftBannerImage']) {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['image_url'] = values['mainContentLeftBannerImage'].original_url

    } else values['content']['main_content']['section3_two_column_banners']['banner_1']['image_url'] = ''

    if (values['mainContentLeftBannerImage2']) {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['image_url'] = values['mainContentLeftBannerImage2'].original_url

    } else values['content']['main_content']['section3_two_column_banners']['banner_2']['image_url'] = ''

    if (values['fullWidthImage']) {
        values['content']['full_width_banner']['image_url'] = values['fullWidthImage'].original_url

    } else values['content']['full_width_banner']['image_url'] = ''

    if (values['newsLetterImage']) {
        values['content']['news_letter']['image_url'] = values['newsLetterImage'].original_url
    } else values['content']['news_letter']['image_url'] = ""

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
    if (values['mainLeftBanner1LinkType']) {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link_type'] = values['mainLeftBanner1LinkType'];
    } else {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link_type'] = ''
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    if (values['mainLeftBanner1Link']) {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link'] = values['mainLeftBanner1Link']
        if (values['mainLeftBanner1LinkType'] == "product") {
            values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['product_ids'] = values['mainLeftBanner1Link']
        } else {
            values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainLeftBanner2LinkType']) {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link_type'] = values['mainLeftBanner2LinkType'];
    } else {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link_type'] = ''
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link'] = ""
    }
    if (values['mainLeftBanner2Link']) {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link'] = values['mainLeftBanner2Link']
        if (values['mainLeftBanner2LinkType'] == "product") {
            values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['product_ids'] = values['mainLeftBanner2Link']
        } else {
            values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link'] = {}
    if (values['mainRightBannerLinkType']) {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link_type'] = values['mainRightBannerLinkType'];
    } else {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link_type'] = ''
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link'] = ""
    }
    if (values['mainRightBannerLink']) {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link'] = values['mainRightBannerLink']
        if (values['mainRightBannerLinkType'] == "product") {
            values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['product_ids'] = values['mainRightBannerLink']
        } else {
            values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['sidebar']['right_side_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['fullWidthLinkType']) {
        values['content']['full_width_banner']['redirect_link']['link_type'] = values['fullWidthLinkType'];
    } else {
        values['content']['full_width_banner']['redirect_link']['link_type'] = ''
        values['content']['full_width_banner']['redirect_link']['link'] = ""
    }
    if (values['fullWidthLink']) {
        values['content']['full_width_banner']['redirect_link']['link'] = values['fullWidthLink']
        if (values['fullWidthLinkType'] == "product") {
            values['content']['full_width_banner']['redirect_link']['product_ids'] = values['fullWidthLinkType']
        } else {
            values['content']['full_width_banner']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['full_width_banner']['redirect_link']['link'] = ""
    }

    mutate(values)
}
export default HomePage6Submit
import { concatDynamicProductKeys } from "../../../Utils/CustomFunctions/concatDynamicProductKeys";

const HomePage1Submit = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))

    // For passing the multiselect [ID or Value]
    if (values['product_ids']) {
        values['content']['main_content']['sidebar']['sidebar_products']['product_ids'] = values['product_ids']
    }
    if (values['mainRightBannerProductIds']) {
        values['content']['main_content']['section4_products']['product_ids'] = values['mainRightBannerProductIds']
    }
    if (values['mainRight1TabProductIds']) {
        values['content']['main_content']['section1_products']['product_ids'] = values['mainRight1TabProductIds']
    }
    if (values['mainRight7TabProductIds']) {
        values['content']['main_content']['section7_products']['product_ids'] = values['mainRight7TabProductIds']
    }
    if (values['mainRightContentBlog']) {
        values['content']['main_content']['section9_featured_blogs']['blog_ids'] = values['mainRightContentBlog']
    }
    if (values['mainLeftCategory']) {
        values['content']['main_content']['sidebar']['categories_icon_list']['category_ids'] = values['mainLeftCategory']
    }

    // For Passing images 
    if (values['homeBannerMainImage']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeBannerMainImage'].original_url
    } else values['content']['home_banner']['main_banner']['image_url'] = ''

    if (values['homeBannerSubBanner1Image']) {
        values['content']['home_banner']['sub_banner_1']['image_url'] = values['homeBannerSubBanner1Image'].original_url
    } else values['content']['home_banner']['sub_banner_1']['image_url'] = ''

    if (values['homeBannerSubBanner2Image']) {
        values['content']['home_banner']['sub_banner_2']['image_url'] = values['homeBannerSubBanner2Image'].original_url
    } else values['content']['home_banner']['sub_banner_2']['image_url'] = ''

    if (values['mainLeftBanner1']) {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['image_url'] = values['mainLeftBanner1'].original_url
    } else values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['image_url'] = ''

    if (values['mainLeftBanner2']) {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_2']['image_url'] = values['mainLeftBanner2'].original_url
    } else values['content']['main_content']['sidebar']['left_side_banners']['banner_2']['image_url'] = ''

    if (values['section2CategoryImage']) {
        values['content']['main_content']['section2_categories_list']['image_url'] = values['section2CategoryImage'].original_url
    } else values['content']['main_content']['section2_categories_list']['image_url'] = ''

    if (values['section3Banner1']) {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['image_url'] = values['section3Banner1'].original_url
    } else values['content']['main_content']['section3_two_column_banners']['banner_1']['image_url'] = ''

    if (values['section3Banner2']) {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['image_url'] = values['section3Banner2'].original_url
    } else values['content']['main_content']['section3_two_column_banners']['banner_2']['image_url'] = ''

    if (values['section5CouponsImage']) {
        values['content']['main_content']['section5_coupons']['image_url'] = values['section5CouponsImage'].original_url
    } else values['content']['main_content']['section5_coupons']['image_url'] = ''

    if (values['section6_twocolumnBanner1']) {
        values['content']['main_content']['section6_two_column_banners']['banner_1']['image_url'] = values['section6_twocolumnBanner1'].original_url
    } else values['content']['main_content']['section6_two_column_banners']['banner_1']['image_url'] = ''

    if (values['section6_twocolumnBanner2']) {
        values['content']['main_content']['section6_two_column_banners']['banner_2']['image_url'] = values['section6_twocolumnBanner2'].original_url
    } else values['content']['main_content']['section6_two_column_banners']['banner_2']['image_url'] = ''

    if (values['section8_VegitableImage']) {
        values['content']['main_content']['section8_full_width_banner']['image_url'] = values['section8_VegitableImage'].original_url
    } else values['content']['main_content']['section8_full_width_banner']['image_url'] = ''

    if (values['mainContentSidebarCategoryImage']) {
        values['content']['main_content']['sidebar']['categories_icon_list']['image_url'] = values['mainContentSidebarCategoryImage'].original_url
    } else values['content']['main_content']['sidebar']['categories_icon_list']['image_url'] = ''

    if (values['newsLetterImage']) {
        values['content']['news_letter']['image_url'] = values['newsLetterImage'].original_url
    } else values['content']['news_letter']['image_url'] = ''

    values['content']['featured_banners']['banners'].forEach((elem, i) => {
        if (values[`featureBannerImage${i}`]) {
            values['content']['featured_banners']['banners'][i]['image_url'] = values[`featureBannerImage${i}`].original_url
        } else {
            values['content']['featured_banners']['banners'][i]['image_url'] = ''
        }
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
    if (values['mainLeftBanner1LinkType']) {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['redirect_link'] = {}
        values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['redirect_link']['link_type'] = values['mainLeftBanner1LinkType'];
    } else {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['redirect_link']['link_type'] = ''
        values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['redirect_link']['link'] = ""
    }
    if (values['mainLeftBanner1Link']) {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['redirect_link']['link'] = values['mainLeftBanner1Link']
        if (values['mainLeftBanner1LinkType'] == "product") {
            values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['redirect_link']['product_ids'] = values['mainLeftBanner1Link']
        } else {
            values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainLeftBanner2LinkType']) {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_2']['redirect_link'] = {}
        values['content']['main_content']['sidebar']['left_side_banners']['banner_2']['redirect_link']['link_type'] = values['mainLeftBanner2LinkType'];
    } else {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_2']['redirect_link']['link_type'] = ''
        values['content']['main_content']['sidebar']['left_side_banners']['banner_2']['redirect_link']['link'] = ""
    }
    if (values['mainLeftBanner2Link']) {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_2']['redirect_link']['link'] = values['mainLeftBanner2Link']
    } else {
        values['content']['main_content']['sidebar']['left_side_banners']['banner_2']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainRight3LinkType1']) {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link'] = {}
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link_type'] = values['mainRight3LinkType1'];
    } else {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link_type'] = ''
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    if (values['mainRight3Link1']) {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link'] = values['mainRight3Link1']
        if (values['mainRight3LinkType1'] == "product") {
            values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['product_ids'] = values['mainRight3Link1']
        } else {
            values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['section3_two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainRight3LinkType2']) {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link'] = {}
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link_type'] = values['mainRight3LinkType2'];
    } else {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link_type'] = ''
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link'] = ""
    }
    if (values['mainRight3Link2']) {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link'] = values['mainRight3Link2']
        if (values['mainRight3LinkType2'] == "product") {
            values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['product_ids'] = values['mainRight3Link2']
        } else {
            values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['section3_two_column_banners']['banner_2']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainRight6LinkType1']) {
        values['content']['main_content']['section6_two_column_banners']['banner_1']['redirect_link']['link_type'] = values['mainRight6LinkType1'];
    } else {
        values['content']['main_content']['section6_two_column_banners']['banner_1']['redirect_link']['link_type'] = ''
        values['content']['main_content']['section6_two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    if (values['mainRight6Link1']) {
        values['content']['main_content']['section6_two_column_banners']['banner_1']['redirect_link']['link'] = values['mainRight6Link1']
        if (values['mainRight6LinkType1'] == "product") {
            values['content']['main_content']['section6_two_column_banners']['banner_1']['redirect_link']['product_ids'] = values['mainRight6Link1']
        } else {
            values['content']['main_content']['section6_two_column_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['section6_two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainRight6LinkType2']) {
        values['content']['main_content']['section6_two_column_banners']['banner_2']['redirect_link']['link_type'] = values['mainRight6LinkType2'];
    } else {
        values['content']['main_content']['section6_two_column_banners']['banner_2']['redirect_link']['link_type'] = ''
        values['content']['main_content']['section6_two_column_banners']['banner_2']['redirect_link']['link'] = ""
    }
    if (values['mainRight6Link2']) {
        values['content']['main_content']['section6_two_column_banners']['banner_2']['redirect_link']['link'] = values['mainRight6Link2']
        if (values['mainRight6LinkType2'] == "product") {
            values['content']['main_content']['section6_two_column_banners']['banner_2']['redirect_link']['product_ids'] = values['mainRight6Link2']
        } else {
            values['content']['main_content']['section6_two_column_banners']['banner_2']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['section6_two_column_banners']['banner_2']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['mainRight8LinkType']) {
        values['content']['main_content']['section8_full_width_banner']['redirect_link'] = {}
        values['content']['main_content']['section8_full_width_banner']['redirect_link']['link_type'] = values['mainRight8LinkType'];
    } else {
        values['content']['main_content']['section8_full_width_banner']['redirect_link']['link_type'] = ''
        values['content']['main_content']['section8_full_width_banner']['redirect_link']['link'] = ""
    }
    if (values['mainRight8Link']) {
        values['content']['main_content']['section8_full_width_banner']['redirect_link']['link'] = values['mainRight8Link']
        if (values['mainRight8LinkType'] == "product") {
            values['content']['main_content']['section8_full_width_banner']['redirect_link']['product_ids'] = values['mainRight8Link']
        } else {
            values['content']['main_content']['section8_full_width_banner']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['main_content']['section8_full_width_banner']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------

    mutate(values);
}

export default HomePage1Submit
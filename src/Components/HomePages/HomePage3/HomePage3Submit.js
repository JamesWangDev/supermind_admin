import { concatDynamicProductKeys } from "../../../Utils/CustomFunctions/concatDynamicProductKeys"

const HomePage3Submit = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))

    // MultiSelect 
    if (values['productList1Product']) {
        values['content']['products_list_1']['product_ids'] = values['productList1Product']
    }
    if (values['categoryIconList']) {
        values['content']['categories_icon_list']['category_ids'] = values['categoryIconList']
    }
    if (values['productList2Product']) {
        values['content']['products_list_2']['product_ids'] = values['productList2Product']
    }
    if (values['featureBlogSelect']) {
        values['content']['featured_blogs']['blog_ids'] = values['featureBlogSelect']
    }

    // Images
    if (values['homeBannerMainImage']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeBannerMainImage'].original_url
    } else values['content']['home_banner']['main_banner']['image_url'] = ''

    if (values['homeBannerSubBannerImage']) {
        values['content']['home_banner']['sub_banner_1']['image_url'] = values['homeBannerSubBannerImage'].original_url
    } else values['content']['home_banner']['sub_banner_1']['image_url'] = ""

    if (values['categoriesIconImage']) {
        values['content']['categories_icon_list']['image_url'] = values['categoriesIconImage'].original_url
    } else values['content']['categories_icon_list']['image_url'] = ""

    if (values['couponImage']) {
        values['content']['coupons']['image_url'] = values['couponImage'].original_url
    } else values['content']['coupons']['image_url'] = ""

    if (values['offerBannerImage']) {
        values['content']['offer_banner']['image_url'] = values['offerBannerImage'].original_url
    } else values['content']['offer_banner']['image_url'] = ""

    if (values['newsLetterImage']) {
        values['content']['news_letter']['image_url'] = values['newsLetterImage'].original_url
    } else values['content']['news_letter']['image_url'] = ""

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

    values['content']['product_bundles']['bundles'].forEach((elem, i) => {
        if (values[`productBundleImage${i}`]) {
            values['content']['product_bundles']['bundles'][i]['image_url'] = values[`productBundleImage${i}`].original_url
        } else values['content']['product_bundles']['bundles'][i]['image_url'] = ''
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
    if (values['offerBannerLinkType']) {
        values['content']['offer_banner']['redirect_link'] = {}
        values['content']['offer_banner']['redirect_link']['link_type'] = values['offerBannerLinkType'];
    } else {
        values['content']['offer_banner']['redirect_link']['link_type'] = ''
        values['content']['offer_banner']['redirect_link']['link'] = ""
    }
    if (values['offerBannerLink']) {
        values['content']['offer_banner']['redirect_link']['link'] = values['offerBannerLink']
        if (values['offerBannerLinkType'] == "product") {
            values['content']['offer_banner']['redirect_link']['product_ids'] = values['offerBannerLinkType']
        } else {
            values['content']['offer_banner']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['offer_banner']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------

    mutate(values);
}
export default HomePage3Submit
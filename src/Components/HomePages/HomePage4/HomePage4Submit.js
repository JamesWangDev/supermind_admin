import { concatDynamicProductKeys } from "../../../Utils/CustomFunctions/concatDynamicProductKeys"

const HomePage4Submit = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))

    // For Passing Image
    if (values['homeBannerBackgroungImage']) {
        values['content']['home_banner']['bg_image_url'] = values['homeBannerBackgroungImage'].original_url
    } else values['content']['home_banner']['bg_image_url'] = ''

    if (values['homeBannerMainImage']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeBannerMainImage'].original_url
    } else values['content']['home_banner']['main_banner']['image_url'] = ''

    if (values['homeBannerSub1Image']) {
        values['content']['home_banner']['sub_banner_1']['image_url'] = values['homeBannerSub1Image'].original_url
    } else values['content']['home_banner']['sub_banner_1']['image_url'] = ''

    if (values['homeBannerSub2Image']) {
        values['content']['home_banner']['sub_banner_2']['image_url'] = values['homeBannerSub2Image'].original_url
    } else values['content']['home_banner']['sub_banner_2']['image_url'] = ''

    if (values['homeBannerSub3Image']) {
        values['content']['home_banner']['sub_banner_3']['image_url'] = values['homeBannerSub3Image'].original_url
    } else values['content']['home_banner']['sub_banner_3']['image_url'] = ''

    if (values['categoryProductImage']) {
        values['content']['categories_image_list']['image_url'] = values['categoryProductImage'].original_url
    } else values['content']['categories_image_list']['image_url'] = ''

    if (values['twoColumnBanner1Image']) {
        values['content']['two_column_banners']['banner_1']['image_url'] = values['twoColumnBanner1Image'].original_url
    } else values['content']['two_column_banners']['banner_1']['image_url'] = ''

    if (values['twoColumnBanner2Image']) {
        values['content']['two_column_banners']['banner_2']['image_url'] = values['twoColumnBanner2Image'].original_url
    } else values['content']['two_column_banners']['banner_2']['image_url'] = ''

    if (values['fullWidthImage']) {
        values['content']['full_width_banner']['image_url'] = values['fullWidthImage'].original_url
    } else values['content']['full_width_banner']['image_url'] = ''

    if (values['newsLetterImage']) {
        values['content']['news_letter']['image_url'] = values['newsLetterImage'].original_url
    } else values['content']['news_letter']['image_url'] = ''

    values['content']['value_banners']['banners'].forEach((elem, i) => {
        if (values[`featureBannerImage${i}`]) {
            values['content']['value_banners']['banners'][i]['image_url'] = values[`featureBannerImage${i}`].original_url
        } else { values['content']['value_banners']['banners'][i]['image_url'] = '' }

        if (values[`valueBannerLinkType${i}`] || values[`valueBannerLink${i}`]) {
            values['content']['value_banners']['banners'][i]['redirect_link']['link_type'] = values[`valueBannerLinkType${i}`]
            values['content']['value_banners']['banners'][i]['redirect_link']['link'] = values[`valueBannerLink${i}`]
        } else {
            values['content']['value_banners']['banners'][i]['redirect_link']['link_type'] = ''
            values['content']['value_banners']['banners'][i]['redirect_link']['link'] = ''
        }
    })

    //  For passing the multiselect [ID or Value]

    if (values['categoryIconList']) {
        values['content']['categories_image_list']['category_ids'] = values['categoryIconList']
    }
    if (values['categoryProduct']) {
        values['content']['categories_products']['category_ids'] = values['categoryProduct']
    }
    if (values['productList1Product']) {
        values['content']['products_list_1']['product_ids'] = values['productList1Product']
    }
    if (values['featureBlogSelect']) {
        values['content']['featured_blogs']['blog_ids'] = values['featureBlogSelect']
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
    if (values['homeSubBanner3LinkType']) {
        values['content']['home_banner']['sub_banner_3']['redirect_link']['link_type'] = values['homeSubBanner3LinkType'];
    } else {
        values['content']['home_banner']['sub_banner_3']['redirect_link']['link_type'] = ''
        values['content']['home_banner']['sub_banner_3']['redirect_link']['link'] = ""
    }
    if (values['homeSubBanner3Link']) {
        values['content']['home_banner']['sub_banner_3']['redirect_link']['link'] = values['homeSubBanner3Link']
        if (values['homeSubBanner3LinkType'] == "product") {
            values['content']['home_banner']['sub_banner_3']['redirect_link']['product_ids'] = values['homeSubBanner3Link']
        } else {
            values['content']['home_banner']['sub_banner_3']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['home_banner']['sub_banner_3']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['twoBanner1LinkType']) {
        values['content']['two_column_banners']['banner_1']['redirect_link']['link_type'] = values['twoBanner1LinkType'];
    } else {
        values['content']['two_column_banners']['banner_1']['redirect_link']['link_type'] = ''
        values['content']['two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    if (values['twoBanner1Link']) {
        values['content']['two_column_banners']['banner_1']['redirect_link']['link'] = values['twoBanner1Link']
        if (values['twoBanner1LinkType'] == "product") {
            values['content']['two_column_banners']['banner_1']['redirect_link']['product_ids'] = values['twoBanner1Link']
        } else {
            values['content']['two_column_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['two_column_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['twoBanner2LinkType']) {
        values['content']['two_column_banners']['banner_2']['redirect_link']['link_type'] = values['twoBanner2LinkType'];
    } else {
        values['content']['two_column_banners']['banner_2']['redirect_link']['link_type'] = ''
        values['content']['two_column_banners']['banner_2']['redirect_link']['link'] = ""
    }
    if (values['twoBanner2Link']) {
        values['content']['two_column_banners']['banner_2']['redirect_link']['link'] = values['twoBanner2Link']
        if (values['twoBanner2LinkType'] == "product") {
            values['content']['two_column_banners']['banner_2']['redirect_link']['product_ids'] = values['twoBanner2Link']
        } else {
            values['content']['two_column_banners']['banner_2']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['two_column_banners']['banner_2']['redirect_link']['link'] = ""
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
            values['content']['full_width_banner']['redirect_link']['product_ids'] = values['fullWidthLink']
        } else {
            values['content']['full_width_banner']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['full_width_banner']['redirect_link']['link'] = ""
    }

    mutate(values)
}

export default HomePage4Submit
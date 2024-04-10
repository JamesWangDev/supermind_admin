import { concatDynamicProductKeys } from "../../../Utils/CustomFunctions/concatDynamicProductKeys"

const HomePage5Submit = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))

    //MultiSelect
    if (values['categoryIconList']) {
        values['content']['categories_image_list']['category_ids'] = values['categoryIconList']
    }
    if (values['productDealProductIds']) {
        values['content']['product_with_deals']['products_list']['product_ids'] = values['productDealProductIds']
    }
    if (values['product1ProductIds']) {
        values['content']['products_list_1']['product_ids'] = values['product1ProductIds']
    }
    if (values['product2ProductIds']) {
        values['content']['products_list_2']['product_ids'] = values['product2ProductIds']
    }
    if (values['product3ProductIds']) {
        values['content']['products_list_3']['product_ids'] = values['product3ProductIds']
    }
    if (values['product4ProductIds']) {
        values['content']['products_list_4']['product_ids'] = values['product4ProductIds']
    }
    if (values['product5ProductIds']) {
        values['content']['products_list_5']['product_ids'] = values['product5ProductIds']
    }
    if (values['product6ProductIds']) {
        values['content']['products_list_6']['product_ids'] = values['product6ProductIds']
    }
    if (values['product7ProductIds']) {
        values['content']['products_list_7']['product_ids'] = values['product7ProductIds']
    }
    if (values['featureBlogSelect']) {
        values['content']['featured_blogs']['blog_ids'] = values['featureBlogSelect']
    }

    values['content']['product_with_deals']['deal_of_days']['deals'].forEach((elem, index) => {
        if (values[`DealOfDaysProduct${index}`]) {
            values['content']['product_with_deals']['deal_of_days']['deals'][index]['product_id'] = values[`DealOfDaysProduct${index}`]
        }
    })

    // Passing images 
    if (values['productDealsImage']) {
        values['content']['product_with_deals']['deal_of_days']['image_url'] = values['productDealsImage'].original_url
    } else values['content']['product_with_deals']['deal_of_days']['image_url'] = ''

    if (values['homeBannerImage']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeBannerImage'].original_url
    } else values['content']['home_banner']['main_banner']['image_url'] = ''

    if (values['categoryProductImage']) {
        values['content']['categories_image_list']['image_url'] = values['categoryProductImage'].original_url
    } else values['content']['categories_image_list']['image_url'] = ''

    if (values['fullWidthImage']) {
        values['content']['full_width_banner']['image_url'] = values['fullWidthImage'].original_url
    } else values['content']['full_width_banner']['image_url'] = ''

    if (values['twoColumnBanner1Image']) {
        values['content']['two_column_banners']['banner_1']['image_url'] = values['twoColumnBanner1Image'].original_url
    } else values['content']['two_column_banners']['banner_1']['image_url'] = ''

    if (values['twoColumnBanner2Image']) {
        values['content']['two_column_banners']['banner_2']['image_url'] = values['twoColumnBanner2Image'].original_url
    } else values['content']['two_column_banners']['banner_2']['image_url'] = ''

    values['content']['featured_banners']['banners'].forEach((elem, i) => {
        if (values[`featureBannerImage${i}`]) {
            values['content']['featured_banners']['banners'][i]['image_url'] = values[`featureBannerImage${i}`].original_url
        } else { values['content']['featured_banners']['banners'][i]['image_url'] = '' }
        if (values[`featureRedirectLinkType${i}`] || values[`featureRedirectLink${i}`]) {
            values['content']['featured_banners']['banners'][i]['redirect_link']['link_type'] = values[`featureRedirectLinkType${i}`]
            values['content']['featured_banners']['banners'][i]['redirect_link']['link'] = values[`featureRedirectLink${i}`]
        } else {
            values['content']['featured_banners']['banners'][i]['redirect_link']['link_type'] = ''
            values['content']['featured_banners']['banners'][i]['redirect_link']['link'] = ''
        }
    })

    values['content']['bank_wallet_offers']['offers'].forEach((elem, i) => {
        if (values[`bankOfferImage${i}`]) {
            values['content']['bank_wallet_offers']['offers'][i]['image_url'] = values[`bankOfferImage${i}`].original_url
        } else values['content']['bank_wallet_offers']['offers'][i]['image_url'] = ""
    })

    values['content']['bank_wallet_offers']['offers'].forEach((elem, i) => {
        if (values[`bankOfferBankImage${i}`]) {
            values['content']['bank_wallet_offers']['offers'][i]['bank_image_url'] = values[`bankOfferBankImage${i}`].original_url
        } else values['content']['bank_wallet_offers']['offers'][i]['bank_image_url'] = ""
    })

    // For Passing Redirect Link
    // ---------------------------------------------------------------------
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
    values['content']['full_width_banner']['redirect_link'] = {}
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
    if (values['delivery1LinkType']) {
        values['content']['delivery_banners']['banner_1']['redirect_link']['link_type'] = values['delivery1LinkType'];
    } else {
        values['content']['delivery_banners']['banner_1']['redirect_link']['link_type'] = ''
        values['content']['delivery_banners']['banner_1']['redirect_link']['link'] = ""
    }
    if (values['delivery1Link']) {
        values['content']['delivery_banners']['banner_1']['redirect_link']['link'] = values['delivery1Link']
        if (values['delivery1LinkType'] == "product") {
            values['content']['delivery_banners']['banner_1']['redirect_link']['product_ids'] = values['delivery1Link']
        } else {
            values['content']['delivery_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['delivery_banners']['banner_1']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    if (values['delivery2LinkType']) {
        values['content']['delivery_banners']['banner_2']['redirect_link']['link_type'] = values['delivery2LinkType'];
    } else {
        values['content']['delivery_banners']['banner_2']['redirect_link']['link_type'] = ''
        values['content']['delivery_banners']['banner_2']['redirect_link']['link'] = ""
    }
    if (values['delivery2Link']) {
        values['content']['delivery_banners']['banner_2']['redirect_link']['link'] = values['delivery2Link']
        if (values['delivery2LinkType'] == "product") {
            values['content']['delivery_banners']['banner_2']['redirect_link']['product_ids'] = values['delivery2Link']
        } else {
            values['content']['delivery_banners']['banner_2']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['delivery_banners']['banner_2']['redirect_link']['link'] = ""
    }
    // ---------------------------------------------------------------------
    mutate(values)
}

export default HomePage5Submit
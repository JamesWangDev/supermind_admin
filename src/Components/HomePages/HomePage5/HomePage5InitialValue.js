const HomePage5InitialValue = (data) => {
    let obj = {}
    data?.content?.bank_wallet_offers?.offers.length > 0 &&
        data?.content?.bank_wallet_offers?.offers.forEach((elem, index) => {
            elem.image_url ? obj[`bankOfferImage${index}`] = { original_url: elem.image_url } : ''
            return obj
        })
    let obj2 = {}
    data?.content?.bank_wallet_offers?.offers.length > 0 &&
        data?.content?.bank_wallet_offers?.offers.forEach((elem, index) => {
            elem.bank_image_url ? obj2[`bankOfferBankImage${index}`] = { original_url: elem.bank_image_url } : ''
            return obj2
        })

    let obj4 = {}
    data?.content?.featured_banners?.banners.length > 0 &&
        data?.content?.featured_banners?.banners.forEach((elem, index) => {
            elem.image_url ? obj4[`featureBannerImage${index}`] = { original_url: elem.image_url } : ''
            elem?.redirect_link ? obj[`featureRedirectLinkType${index}`] = elem?.redirect_link?.link_type : ""
            elem?.redirect_link ? obj[`featureRedirectLink${index}`] = elem?.redirect_link?.link : ""
            return obj4
        })

    let productObj = {}
    data?.content?.product_with_deals?.deal_of_days?.deals?.length > 0 &&
        data?.content?.product_with_deals?.deal_of_days?.deals?.forEach((elem, index) => {
            elem.product_id ? productObj[`DealOfDaysProduct${index}`] = elem.product_id : ''
        })
    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,

        // MultiSelect Variables
        categoryIconList: data?.content?.categories_image_list?.category_ids || [],
        productDealProductIds: data?.content?.product_with_deals?.products_list?.product_ids || [],
        product1ProductIds: data?.content?.products_list_1?.product_ids || [],
        product2ProductIds: data?.content?.products_list_2?.product_ids || [],
        product3ProductIds: data?.content?.products_list_3?.product_ids || [],
        product4ProductIds: data?.content?.products_list_4?.product_ids || [],
        product5ProductIds: data?.content?.products_list_5?.product_ids || [],
        product6ProductIds: data?.content?.products_list_6?.product_ids || [],
        product7ProductIds: data?.content?.products_list_7?.product_ids || [],
        featureBlogSelect: data?.content?.featured_blogs?.blog_ids || [],
        ...productObj,

        // Images
        productDealsImage: data?.content?.product_with_deals?.deal_of_days?.image_url ? { original_url: data?.content?.product_with_deals?.deal_of_days?.image_url } : "",

        homeBannerImage: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } : "",

        categoryProductImage: data?.content?.categories_image_list?.image_url ? { original_url: data?.content?.categories_image_list?.image_url } : "",

        fullWidthImage: data?.content?.full_width_banner?.image_url ? { original_url: data?.content?.full_width_banner?.image_url } : "",

        twoColumnBanner1Image: data?.content?.two_column_banners?.banner_1?.image_url ? { original_url: data?.content?.two_column_banners?.banner_1?.image_url } : "",

        twoColumnBanner2Image: data?.content?.two_column_banners?.banner_2?.image_url ? { original_url: data?.content?.two_column_banners?.banner_2?.image_url } : "",

        ...obj,
        ...obj2,
        ...obj4,

        // Redirect Link
        homeBannerLinkType: data?.content?.home_banner?.main_banner?.redirect_link?.link_type || '',
        homeBannerLink: data?.content?.home_banner?.main_banner?.redirect_link?.link || "",

        fullWidthLinkType: data?.content?.full_width_banner?.redirect_link?.link_type || "",
        fullWidthLink: data?.content?.full_width_banner?.redirect_link?.link || "",

        twoBanner1LinkType: data?.content?.two_column_banners?.banner_1?.redirect_link?.link_type || '',
        twoBanner1Link: data?.content?.two_column_banners?.banner_1?.redirect_link?.link || '',

        twoBanner2LinkType: data?.content?.two_column_banners?.banner_2?.redirect_link?.link_type || '',
        twoBanner2Link: data?.content?.two_column_banners?.banner_2?.redirect_link?.link || '',

        delivery1LinkType: data?.content?.delivery_banners?.banner_1?.redirect_link?.link_type || '',
        delivery1Link: data?.content?.delivery_banners?.banner_1?.redirect_link?.link || '',

        delivery2LinkType: data?.content?.delivery_banners?.banner_2?.redirect_link?.link_type || '',
        delivery2Link: data?.content?.delivery_banners?.banner_2?.redirect_link?.link || '',
    }
}

export default HomePage5InitialValue
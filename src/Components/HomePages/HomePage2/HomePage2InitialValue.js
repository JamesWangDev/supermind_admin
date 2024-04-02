const HomePage2InitialValue = (data) => {
    let obj = {}
    data?.content?.featured_banners?.banners.length > 0 &&
        data?.content?.featured_banners?.banners.forEach((elem, index) => {
            elem.image_url ? obj[`featureBannerImage${index}`] = { original_url: elem.image_url } : ''
            elem?.redirect_link ? obj[`featureRedirectLinkType${index}`] = elem?.redirect_link?.link_type : ""
            elem?.redirect_link ? obj[`featureRedirectLink${index}`] = elem?.redirect_link?.link : ""
            return obj
        })
    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,

        // Images 
        homeMainBannerImage: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } : "",
        homeMainSubBanner1Image: data?.content?.home_banner?.sub_banner_1?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_1?.image_url } : "",
        homeMainSubBanner2Image: data?.content?.home_banner?.sub_banner_2?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_2?.image_url } : "",
        categoriesIconImage: data?.content?.categories_icon_list?.image_url ? { original_url: data?.content?.categories_icon_list?.image_url } : "",
        couponImage: data?.content?.coupons?.image_url ? { original_url: data?.content?.coupons?.image_url } : "",
        mainContentRightBanner1Image: data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.image_url ? { original_url: data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.image_url } : "",
        mainContentRightBanner2Image: data?.content?.main_content?.sidebar?.right_side_banners?.banner_2?.image_url ? { original_url: data?.content?.main_content?.sidebar?.right_side_banners?.banner_2?.image_url } : "",
        fullWidthImage: data?.content?.full_width_banner?.image_url ? { original_url: data?.content?.full_width_banner?.image_url } : "",
        newsLetterImage: data?.content?.news_letter?.image_url ? { original_url: data?.content?.news_letter?.image_url } || '' : '',
        ...obj,

        // Multiselect Variables
        mainLeftProduct1: data?.content?.main_content?.section1_products?.product_ids || [],
        mainLeftProduct2: data?.content?.main_content?.section2_slider_products?.product_ids || [],
        mainContentProduct2ProductIds: data?.content?.main_content?.section2_slider_products?.product_slider_2?.product_ids || [],
        mainContentSection3ProductIds: data?.content?.main_content?.section3_products?.product_ids || [],
        mainContentSection4ProductIds: data?.content?.main_content?.section4_products?.product_ids || [],

        sliderProduct1: data?.content?.slider_products?.product_slider_1?.product_ids || [],
        sliderProduct2: data?.content?.slider_products?.product_slider_2?.product_ids || [],
        sliderProduct3: data?.content?.slider_products?.product_slider_3?.product_ids || [],
        sliderProduct4: data?.content?.slider_products?.product_slider_4?.product_ids || [],

        categoryIconList: data?.content?.categories_icon_list?.category_ids || [],

        // Redirect Link
        homeBannerLinkType: data?.content?.home_banner?.main_banner?.redirect_link?.link_type || '',
        homeBannerLink: data?.content?.home_banner?.main_banner?.redirect_link?.link || "",

        homeSubBanner1LinkType: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link_type || '',
        homeSubBanner1Link: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link || '',

        homeSubBanner2LinkType: data?.content?.home_banner?.sub_banner_2?.redirect_link?.link_type || '',
        homeSubBanner2Link: data?.content?.home_banner?.sub_banner_2?.redirect_link?.link || '',

        couponBannerLinkType: data?.content?.coupons?.redirect_link?.link_type || "",
        couponBannerLink: data?.content?.coupons?.redirect_link?.link || "",

        mainRightBanner1LinkType: data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.redirect_link?.link_type || "",
        mainRightBanner1Link: data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.redirect_link?.link || "",

        mainRightBanner2LinkType: data?.content?.main_content?.sidebar?.right_side_banners?.banner_2?.redirect_link?.link_type || "",
        mainRightBanner2Link: data?.content?.main_content?.sidebar?.right_side_banners?.banner_2?.redirect_link?.link || "",

        fullWidthLinkType: data?.content?.full_width_banner?.redirect_link?.link_type || "",
        fullWidthLink: data?.content?.full_width_banner?.redirect_link?.link || "",
    }
}

export default HomePage2InitialValue
const HomePage1InitialValue = (data) => {
    let obj = {}
    data?.content?.featured_banners?.banners.length > 0 &&
        data?.content?.featured_banners?.banners.forEach((elem, index) => {
            elem.image_url ? obj[`featureBannerImage${index}`] = { original_url: elem.image_url } : '';
            elem?.redirect_link ? obj[`featureRedirectLinkType${index}`] = elem?.redirect_link?.link_type : ""
            elem?.redirect_link ? obj[`featureRedirectLink${index}`] = elem?.redirect_link?.link : ""
            return obj
        })
    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,

        // Redirect Link
        homeBannerLinkType: data?.content?.home_banner?.main_banner?.redirect_link?.link_type || '',
        homeBannerLink: data?.content?.home_banner?.main_banner?.redirect_link?.link || "",

        homeSubBanner1LinkType: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link_type || '',
        homeSubBanner1Link: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link || '',

        homeSubBanner2LinkType: data?.content?.home_banner?.sub_banner_2?.redirect_link?.link_type || '',
        homeSubBanner2Link: data?.content?.home_banner?.sub_banner_2?.redirect_link?.link || '',

        mainLeftBanner1LinkType: data?.content?.main_content?.sidebar?.left_side_banners?.banner_1?.redirect_link?.link_type || "",
        mainLeftBanner1Link: data?.content?.main_content?.sidebar?.left_side_banners?.banner_1?.redirect_link?.link || "",

        mainLeftBanner2LinkType: data?.content?.main_content?.sidebar?.left_side_banners?.banner_2?.redirect_link?.link_type || "",
        mainLeftBanner2Link: data?.content?.main_content?.sidebar?.left_side_banners?.banner_2?.redirect_link?.link || "",

        mainRight3LinkType1: data?.content?.main_content?.section3_two_column_banners?.banner_1?.redirect_link?.link_type || "",
        mainRight3Link1: data?.content?.main_content?.section3_two_column_banners?.banner_1?.redirect_link?.link || "",

        mainRight3LinkType2: data?.content?.main_content?.section3_two_column_banners?.banner_2?.redirect_link?.link_type || "",
        mainRight3Link2: data?.content?.main_content?.section3_two_column_banners?.banner_2?.redirect_link?.link || "",

        mainRight6LinkType1: data?.content?.main_content?.section6_two_column_banners?.banner_1?.redirect_link?.link_type || "",
        mainRight6Link1: data?.content?.main_content?.section6_two_column_banners?.banner_1?.redirect_link?.link || "",

        mainRight6LinkType2: data?.content?.main_content?.section6_two_column_banners?.banner_2?.redirect_link?.link_type || "",
        mainRight6Link2: data?.content?.main_content?.section6_two_column_banners?.banner_2?.redirect_link?.link || "",

        mainRight8LinkType: data?.content?.main_content?.section8_full_width_banner?.redirect_link?.link_type || "",
        mainRight8Link: data?.content?.main_content?.section8_full_width_banner?.redirect_link?.link || "",

        // Multiselect Values
        product_ids: data?.content?.main_content?.sidebar?.sidebar_products?.product_ids || [],
        mainRightBannerProductIds: data?.content?.main_content?.section4_products?.product_ids || [],
        mainRight1TabProductIds: data?.content?.main_content?.section1_products?.product_ids || [],
        mainRight7TabProductIds: data?.content?.main_content?.section7_products?.product_ids || [],
        mainRightContentBlog: data?.content?.main_content?.section9_featured_blogs?.blog_ids || [],
        mainLeftCategory: data?.content?.main_content?.sidebar?.categories_icon_list?.category_ids || [],

        // images
        homeBannerMainImage: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } : "",
        homeBannerSubBanner1Image: data?.content?.home_banner?.sub_banner_1?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_1?.image_url } : "",
        homeBannerSubBanner2Image: data?.content?.home_banner?.sub_banner_2?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_2?.image_url } : "",
        mainLeftBanner1: data?.content?.main_content?.sidebar?.left_side_banners?.banner_1?.image_url ? { original_url: data?.content?.main_content?.sidebar?.left_side_banners?.banner_1?.image_url } : "",
        mainLeftBanner2: data?.content?.main_content?.sidebar?.left_side_banners?.banner_2?.image_url ? { original_url: data?.content?.main_content?.sidebar?.left_side_banners?.banner_2?.image_url } : "",
        newsLetterImage: data?.content?.news_letter?.image_url ? { original_url: data?.content?.news_letter?.image_url } : "",

        section2CategoryImage: data?.content?.main_content?.section2_categories_list?.image_url ? { original_url: data?.content?.main_content?.section2_categories_list?.image_url } : "",
        section3Banner1: data?.content?.main_content?.section3_two_column_banners?.banner_1?.image_url ? { original_url: data?.content?.main_content?.section3_two_column_banners?.banner_1?.image_url } : "",
        section3Banner2: data?.content?.main_content?.section3_two_column_banners?.banner_2?.image_url ? { original_url: data?.content?.main_content?.section3_two_column_banners?.banner_2?.image_url } : "",
        section5CouponsImage: data?.content?.main_content?.section5_coupons?.image_url ? { original_url: data?.content?.main_content?.section5_coupons?.image_url } : "",
        section6_twocolumnBanner1: data?.content?.main_content?.section6_two_column_banners?.banner_1?.image_url ? { original_url: data?.content?.main_content?.section6_two_column_banners?.banner_1?.image_url } : "",
        section6_twocolumnBanner2: data?.content?.main_content?.section6_two_column_banners?.banner_2?.image_url ? { original_url: data?.content?.main_content?.section6_two_column_banners?.banner_2?.image_url } : "",
        section8_VegitableImage: data?.content?.main_content?.section8_full_width_banner?.image_url ? { original_url: data?.content?.main_content?.section8_full_width_banner?.image_url } : "",
        mainContentSidebarCategoryImage: data?.content?.main_content?.sidebar?.categories_icon_list?.image_url ? { original_url: data?.content?.main_content?.sidebar?.categories_icon_list?.image_url } : "",
        ...obj,
    }
}
export default HomePage1InitialValue
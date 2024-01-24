const HomePage6InitialValue = (data) => {
    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,

        // MultiSelect Variables
        productListProductIds: data?.content?.product_list_1?.product_ids || [],

        section1Products: data?.content?.main_content?.section1_products?.product_ids || [],

        leftCategory2: data?.content?.main_content?.section2_categories_icon_list?.category_ids || [],
        sidebarCategory1: data?.content?.main_content?.sidebar?.categories_icon_list?.category_ids || [],

        mainContentProductIds: data?.content?.main_content?.section4_products?.product_ids || [],

        mainContentRightSidebarProductIds: data?.content?.main_content?.sidebar?.sidebar_products?.product_ids || [],

        // Images 
        homeBannerImage1: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } : "",

        homeBannerImage2: data?.content?.home_banner?.sub_banner_1?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_1?.image_url } : "",

        mainContentLeftCategoryImage: data?.content?.main_content?.section2_categories_icon_list?.image_url ? { original_url: data?.content?.main_content?.section2_categories_icon_list?.image_url } : "",

        mainContentLeftBannerImage: data?.content?.main_content?.section3_two_column_banners?.banner_1?.image_url ? { original_url: data?.content?.main_content?.section3_two_column_banners?.banner_1?.image_url } : "",

        mainContentLeftBannerImage2: data?.content?.main_content?.section3_two_column_banners?.banner_2?.image_url ? { original_url: data?.content?.main_content?.section3_two_column_banners?.banner_2?.image_url } : "",

        mainContentRightBanner: data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.image_url ? { original_url: data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.image_url } : "",

        fullWidthImage: data?.content?.full_width_banner?.image_url ? { original_url: data?.content?.full_width_banner?.image_url } : "",

        newsLetterImage: data?.content?.news_letter?.image_url ? { original_url: data?.content?.news_letter?.image_url } || '' : '',

        // Redirect Link
        homeBannerLinkType: data?.content?.home_banner?.main_banner?.redirect_link?.link_type || '',
        homeBannerLink: data?.content?.home_banner?.main_banner?.redirect_link?.link || "",

        homeSubBanner1LinkType: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link_type || '',
        homeSubBanner1Link: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link || '',

        mainLeftBanner1LinkType: data?.content?.main_content?.section3_two_column_banners?.banner_1?.redirect_link?.link_type || "",
        mainLeftBanner1Link: data?.content?.main_content?.section3_two_column_banners?.banner_1?.redirect_link?.link || "",

        mainLeftBanner2LinkType: data?.content?.main_content?.section3_two_column_banners?.banner_2?.redirect_link?.link_type || "",
        mainLeftBanner2Link: data?.content?.main_content?.section3_two_column_banners?.banner_2?.redirect_link?.link || "",

        mainRightBannerLinkType: data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.redirect_link?.link_type || "",
        mainRightBannerLink: data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.redirect_link?.link || "",

        fullWidthLinkType: data?.content?.full_width_banner?.redirect_link?.link_type || "",
        fullWidthLink: data?.content?.full_width_banner?.redirect_link?.link || "",
    }
}

export default HomePage6InitialValue
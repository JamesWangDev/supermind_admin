const HomePage4InitialValue = (data) => {
    let obj = {}
    data?.content?.value_banners?.banners.length > 0 &&
        data?.content?.value_banners?.banners.forEach((elem, index) => {
            elem.image_url ? obj[`featureBannerImage${index}`] = { original_url: elem.image_url } : ''
            elem?.redirect_link ? obj[`valueBannerLinkType${index}`] = elem?.redirect_link?.link_type : ""
            elem?.redirect_link ? obj[`valueBannerLink${index}`] = elem?.redirect_link?.link : ""
            return obj
        })

    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,

        // MultiSelect Variables
        categoryIconList: data?.content?.categories_image_list?.category_ids || [],
        categoryProduct: data?.content?.categories_products?.category_ids || [],
        productList1Product: data?.content?.products_list_1?.product_ids || [],
        featureBlogSelect: data?.content?.featured_blogs?.blog_ids || [],
        sliderProduct1: data?.content?.slider_products?.product_slider_1?.product_ids || [],
        sliderProduct2: data?.content?.slider_products?.product_slider_2?.product_ids || [],
        sliderProduct3: data?.content?.slider_products?.product_slider_3?.product_ids || [],
        sliderProduct4: data?.content?.slider_products?.product_slider_4?.product_ids || [],

        // Images
        homeBannerBackgroungImage: data?.content?.home_banner?.bg_image_url ? { original_url: data?.content?.home_banner?.bg_image_url } : "",

        homeBannerMainImage: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } : "",

        homeBannerSub1Image: data?.content?.home_banner?.sub_banner_1?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_1?.image_url } : "",

        homeBannerSub2Image: data?.content?.home_banner?.sub_banner_2?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_2?.image_url } : "",

        homeBannerSub3Image: data?.content?.home_banner?.sub_banner_3?.image_url ? { original_url: data?.content?.home_banner?.sub_banner_3?.image_url } : "",

        categoryProductImage: data?.content?.categories_image_list?.image_url ? { original_url: data?.content?.categories_image_list?.image_url } : "",

        twoColumnBanner1Image: data?.content?.two_column_banners?.banner_1?.image_url ? { original_url: data?.content?.two_column_banners?.banner_1?.image_url } : "",

        twoColumnBanner2Image: data?.content?.two_column_banners?.banner_2?.image_url ? { original_url: data?.content?.two_column_banners?.banner_2?.image_url } : "",

        fullWidthImage: data?.content?.full_width_banner?.image_url ? { original_url: data?.content?.full_width_banner?.image_url } : "",

        newsLetterBgImage: data?.content?.news_letter?.bg_url ? { original_url: data?.content?.news_letter?.bg_url } : "",
        newsLetterImage: data?.content?.news_letter?.image_url ? { original_url: data?.content?.news_letter?.image_url } : "",

        ...obj,

        // Redirect Link
        homeBannerLinkType: data?.content?.home_banner?.main_banner?.redirect_link?.link_type || '',
        homeBannerLink: data?.content?.home_banner?.main_banner?.redirect_link?.link || "",

        homeSubBanner1LinkType: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link_type || '',
        homeSubBanner1Link: data?.content?.home_banner?.sub_banner_1?.redirect_link?.link || '',

        homeSubBanner2LinkType: data?.content?.home_banner?.sub_banner_2?.redirect_link?.link_type || '',
        homeSubBanner2Link: data?.content?.home_banner?.sub_banner_2?.redirect_link?.link || '',

        homeSubBanner3LinkType: data?.content?.home_banner?.sub_banner_3?.redirect_link?.link_type || '',
        homeSubBanner3Link: data?.content?.home_banner?.sub_banner_3?.redirect_link?.link || '',

        twoBanner1LinkType: data?.content?.two_column_banners?.banner_1?.redirect_link?.link_type || '',
        twoBanner1Link: data?.content?.two_column_banners?.banner_1?.redirect_link?.link || '',

        twoBanner2LinkType: data?.content?.two_column_banners?.banner_2?.redirect_link?.link_type || '',
        twoBanner2Link: data?.content?.two_column_banners?.banner_2?.redirect_link?.link || '',

        fullWidthLinkType: data?.content?.full_width_banner?.redirect_link?.link_type || "",
        fullWidthLink: data?.content?.full_width_banner?.redirect_link?.link || "",
    }
}

export default HomePage4InitialValue
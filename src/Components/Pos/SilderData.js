export const TopCategorySlider = (CategoryData) => {
    return {
        arrows: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 940,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                },
            }
        ],
    }
}
import { RiAccountBoxLine, RiBankCardLine, RiBankLine, RiRecordCircleLine, RiCheckboxCircleLine, RiCloseCircleLine, RiCreativeCommonsNcLine, RiEarthLine, RiFileListLine, RiGoogleFill, RiImageLine, RiLineChartLine, RiMailOpenLine, RiMailUnreadLine, RiMoneyEuroBoxLine, RiPaypalLine, RiPercentLine, RiPhoneLockLine, RiPieChartLine, RiRadioButtonLine, RiRefundLine, RiSecurePaymentLine, RiSettingsLine, RiToolsLine, RiTruckLine, RiWallet3Fill, RiFacebookCircleLine, RiGoogleLine, RiAlertLine, RiFileList2Line, RiShoppingBasketLine, RiLayoutBottom2Line, RiLayoutTop2Line, RiContactsLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbTruckDelivery } from 'react-icons/tb'
import basicSeller from '../../public/assets/images/theme-option/seller/basic.png'
import classicSeller from '../../public/assets/images/theme-option/seller/classic.png'
import basicSellerStore from "../../public/assets/images/theme-option/seller/basic-details.png"
import classicSellerStore from "../../public/assets/images/theme-option/seller/classic-details.png"
import header1 from "../../public/assets/images/theme-option/header/01.jpg"
import header2 from "../../public/assets/images/theme-option/header/02.jpg"
import header3 from "../../public/assets/images/theme-option/header/03.jpg"
import header4 from "../../public/assets/images/theme-option/header/5.jpg"
import header01 from "../../public/assets/images/theme-option/header/1.jpg"
import header02 from "../../public/assets/images/theme-option/header/2.jpg"
import header03 from "../../public/assets/images/theme-option/header/3.jpg"
import header04 from "../../public/assets/images/theme-option/header/05.jpg"
import product01 from "../../public/assets/images/theme-option/product/01.jpg"
import product02 from "../../public/assets/images/theme-option/product/02.jpg"
import product03 from "../../public/assets/images/theme-option/product/04.jpg"
import product04 from "../../public/assets/images/theme-option/product/07.jpg"
import blog01 from "../../public/assets/images/theme-option/shop/01.jpg"
import blog02 from "../../public/assets/images/theme-option/shop/02.jpg"
import blogStore1 from "../../public/assets/images/theme-option/shop/01.jpg"
import blogStore2 from "../../public/assets/images/theme-option/shop/08.jpg"
import blogStore3 from "../../public/assets/images/theme-option/shop/09.jpg"
import themeOption1 from "../../public/assets/images/theme-option/shop/10.jpg"
import themeOption2 from "../../public/assets/images/theme-option/shop/11.jpg"
import themeOption3 from "../../public/assets/images/theme-option/shop/03.jpg"
import themeOption4 from "../../public/assets/images/theme-option/shop/04.jpg"
import themeOption5 from "../../public/assets/images/theme-option/shop/05.jpg"
import themeOption6 from "../../public/assets/images/theme-option/shop/06.jpg"
import themeOption7 from "../../public/assets/images/theme-option/shop/07.jpg"

export const ProductTabTitleListData = [
  { title: "General", icon: <RiFileListLine />, inputs: ["name", "description", "short_description", 'is_picture', "greetings", "product_thumbnail_id", "categories"] },
  { title: "Personality & Limits", icon: <RiFileListLine />, inputs: ["personality_desc", "res_length", "is_use_username", "conversation_limits", "llm_prompt"] },
  { title: "PromptAndModels", icon: <RiFileListLine />, inputs: ["prompts", "gpt_model"] },
  { title: "Add Action Superpowers", icon: <RiFileListLine />, inputs: [] },
  { title: "Add Knowledge Superpowers", icon: <RiFileListLine />, inputs: ["superpowers"] },
  { title: "Add UI Superpowers", icon: <RiFileListLine />, inputs: [] },
  { title: "Payments and Pricing", icon: <RiFileListLine />, inputs: [] },
  { title: "Publish Website", icon: <RiFileListLine />, inputs: [] }
];

export const KnowledgeSuperPowerTabTitleListData = [
  { title: "General", icon: <RiSettingsLine />, inputs: ["name", "description", "short_description", 'description', "store_id"] },
  { title: "Add Knowledge", icon: <RiImageLine />, inputs: ["always_knowledges", "library_knowledges"] },
];

export const CreateActionTabTitleListData = [
  { title: "Add API", icon: <RiFileListLine />, inputs: []},
  { title: "Add New Function", icon: <RiFileListLine />, inputs: []}
];

export const ActionSuperPowerTabTitleListData = [
  { title: "General", icon: <RiSettingsLine />, inputs: ["name", "description", "short_description", 'description', "store_id"] },
  { title: "Add Actions", icon: <RiImageLine />, inputs: ["actions"] }
];

export const UISuperPowerTabTitleListData = [
  { title: "General", icon: <RiSettingsLine />, inputs: ["name", "description", "short_description", 'description', "store_id"] },
  { title: "Add UI Functions", icon: <RiImageLine />, inputs: ["uis"] }
];

export const CouponTabTitleListData = [
  { title: "General", icon: <RiSettingsLine />, inputs: ["code", "type", "amount", "status", "is_expired"] },
  { title: "Restriction", icon: <RiCloseCircleLine />, inputs: ["products", "exclude_products", "min_spend", "max_spend"] },
  { title: "Usage", icon: <RiPieChartLine />, inputs: ["is_unlimited", "usage_per_coupon", "usage_per_customer"] },
];

export const SettingTabTitleListData = [
  { title: "General", icon: <RiSettingsLine /> },
  { title: "Activation", icon: <RiRadioButtonLine /> },
  { title: "WalletPoints", icon: <RiWallet3Fill /> },
  { title: "EmailConfiguration", icon: <RiMailOpenLine /> },
  { title: "VendorCommission", icon: <RiPercentLine /> },
  { title: "Refund", icon: <RiRefundLine /> },
  { title: "Newsletter", icon: <RiMailUnreadLine /> },
  { title: "Delivery", icon: <TbTruckDelivery /> },
  { title: "PaymentMethods", icon: <RiBankCardLine /> },
  { title: "Analytics", icon: <RiLineChartLine /> },
  { title: "ReCaptcha", icon: <RiGoogleFill /> },
  { title: "Maintenance", icon: <RiAlertLine /> },
];

export const ThemeOptionTabTitleListData = [
  { title: "General", icon: <RiSettingsLine /> },
  { title: "Header", icon: <RiLayoutTop2Line /> },
  { title: "Footer", icon: <RiLayoutBottom2Line /> },
  { title: "CollectionLayout", icon: <RiShoppingBasketLine /> },
  { title: "ProductLayout", icon: <RiShoppingBasketLine /> },
  { title: "Blog", icon: <RiFileList2Line /> },
  { title: "Seller", icon: <RiFileList2Line /> },
  { title: "AboutUs", icon: <RiContactsLine /> },
  { title: "ContactPage", icon: <RiContactsLine /> },
  { title: "404ErrorPage", icon: <RiAlertLine /> },
  { title: "Seo", icon: <RiEarthLine /> },
];

export const SettingPaymentMethodTab = [
  { key:"PaypalProvider", title: "Paypal",  inputs: ["site_title", "site_tagline", "default_timezone", "default_currency", "default_language", "min_order_amount", "front_site_langauge_direction", "admin_site_langauge_direction", "store_prefix", "copyright"] },
  { key:"StripeProvider", title: "Stripe",  inputs: ["catalog_enable", "maintenance", "vendor_activation", "product_auto_approve", "wallet_enable", "coupon_enable", "stock_product_hide"] },
  { key:"CcAvenueProvider", title: "Ccavenue",  inputs: ["catalog_enable", "maintenance", "vendor_activation", "product_auto_approve", "wallet_enable", "coupon_enable", "stock_product_hide"] },
  { key:"RazorpayProvider", title: "Razorpay",  inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"] },
  { key:"CashOnDeliveryProvider", title: "COD",  inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"] },
  { key:"MollieProvider", title: "Mollie",  inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"] },
  { key:"InstaMojoProvider", title: "Instamojo",  inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"] },
  { key:"PhonepeProvider", title: "Phonepe",  inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"] },
];

export const settingAnalyticsTab = [
  { title: "FacebookPixel", icon: <RiFacebookCircleLine /> },
  { title: "GoogleAnalytics", icon: <RiGoogleLine /> }
]

export const HeaderOption = [
  { id: 1, title: "Header 1", value: 'basic_header', dummyImg: header1, realImg: header01 },
  { id: 2, title: "Header 2", value: 'classic_header', dummyImg: header2, realImg: header02 },
  { id: 3, title: "Header 3", value: 'standard_header', dummyImg: header3, realImg: header03 },
  { id: 4, title: "Header 4", value: 'minimal_header', dummyImg: header4, realImg: header04 },
]

export const FooterUseFulLink = [
  { value: 'home', name: 'Home' },
  { value: 'collections', name: 'Collections' },
  { value: 'about-us', name: 'About Us' },
  { value: 'blogs', name: 'Blogs' },
  { value: 'offer', name: 'Offer' },
  { value: 'search', name: 'Search' }]

export const CollectionLayoutOption = [
  { id: 1, value: "collection_category_slider", title: "Collectioncategoryslider", img: themeOption1 },
  { id: 2, value: "collection_category_sidebar", title: "CollectionCategorySidebar", img: themeOption2 },
  { id: 3, value: "collection_banner", title: "CollectionBanner", img: themeOption3 },
  { id: 4, value: "collection_left_sidebar", title: "CollectionLeftSidebar", img: themeOption4 },
  { id: 5, value: "collection_list", title: "CollectionList", img: themeOption5 },
  { id: 6, value: "collection_right_sidebar", title: "CollectionRightSidebar", img: themeOption6 },
  { id: 7, value: "collection_offcanvas_filter", title: "CollectionTopFilter", img: themeOption7 }
]
export const ProductLayoutOption = [
  { id: 1, value: "product_images", title: "ProductImage", img: product01 },
  { id: 2, value: "product_thumbnail", title: "ProductThumbnail", img: product02 },
  { id: 3, value: "product_slider", title: "ProductSlider", img: product03 },
  { id: 4, value: "product_sticky", title: "ProductSticky", img: product04 }
]
export const BlogStyleOption = [
  { value: "grid_view", title: "GridView", img: blog01 },
  { value: "list_view", title: "ListView", img: blog02 },
]
export const BlogTypeOption = [
  { value: 'left_sidebar', title: 'LeftSidebar', img: blogStore1 },
  { value: 'right_sidebar', title: 'RightSidebar', img: blogStore2 },
  { value: 'no_sidebar', title: 'NoSidebar', img: blogStore3 }
]

export const AccountTab = [
  { title: "ProfileSetting", icon: <RiAccountBoxLine /> },
  { title: "ChangePassword", icon: <RiPhoneLockLine /> },
  { title: "Get paid", icon: <RiMoneyDollarCircleLine /> },
]

export const PaymentDetailTab = [
  { title: "Bank", icon: <RiBankLine /> },
  { title: "Paypal", icon: <RiPaypalLine /> }
]

export const HomePage1SettingTitle = [
  { title: "HomeBanner", icon: <RiRecordCircleLine /> },
  { title: "FeaturesBanner", icon: <RiRecordCircleLine /> },
  { title: "MainContent", icon: <RiRecordCircleLine /> },
  { title: "NewsLetter", icon: <RiRecordCircleLine /> }
];

export const ThemeOneHomeHorizontalTab = [
  { title: "MainBanner" }, { title: "SubBanner1" }, { title: "SubBanner2" }
]

export const ThemeOneMainHorizontalTab = [
  { title: "LeftSidebar" }, { title: "RightContent" }
]
export const ThemeOneMainHorizontalTab2 = [
  { title: "LeftContent" }, { title: "RightSidebar" }
]

export const ThemeSixMainHorizontalTab = [
  { title: "LeftContent" }, { title: "RightSidebar" }
]

export const HomePage3SetttingTitle = [
  { title: "HomeBanner", icon: <RiRecordCircleLine /> },
  { title: "CategoriesIconList", icon: <RiRecordCircleLine /> },
  { title: "Coupons", icon: <RiRecordCircleLine /> },
  { title: "ProductList1", icon: <RiRecordCircleLine /> },
  { title: "OfferBanner", icon: <RiRecordCircleLine /> },
  { title: "ProductList2", icon: <RiRecordCircleLine /> },
  { title: "ProductBundles", icon: <RiRecordCircleLine /> },
  { title: "SliderProducts", icon: <RiRecordCircleLine /> },
  { title: "FeaturesBlogs", icon: <RiRecordCircleLine /> },
  { title: "NewsLetter", icon: <RiRecordCircleLine /> }
]

export const ThemeThreeHomeHorizontalTab = [
  { title: "MainBanner" }, { title: "SubBanner1" }
]

export const HomePage2SettingTab = [
  { title: "HomeBanner", icon: <RiRecordCircleLine /> },
  { title: "CategoriesIconList", icon: <RiRecordCircleLine /> },
  { title: "Coupons", icon: <RiRecordCircleLine /> },
  { title: "FeaturedBanner", icon: <RiRecordCircleLine /> },
  { title: "MainContent", icon: <RiRecordCircleLine /> },
  { title: "FullWidthBanner", icon: <RiRecordCircleLine /> },
  { title: "SliderProducts", icon: <RiRecordCircleLine /> },
  { title: "NewsLetter", icon: <RiRecordCircleLine /> }
]

export const MainRightSidebarBannerTab = [
  { title: 'Banner1' }, { title: 'Banner2' }
]

export const SliderProduct9Title = [
  { title: 'Banner' }, { title: 'Slider' }
]

export const ProductWithDealTab = [
  { title: 'ProductList' }, { title: 'DealofDays' }
]

export const HomePage4SettingTitle = [
  { title: "HomeBanner", icon: <RiRecordCircleLine /> },
  { title: "CategoriesImageList", icon: <RiRecordCircleLine /> },
  { title: "ValueBanner", icon: <RiRecordCircleLine /> },
  { title: "CategoriesProduct", icon: <RiRecordCircleLine /> },
  { title: "TwoColumnBanner", icon: <RiRecordCircleLine /> },
  { title: "SliderProducts", icon: <RiRecordCircleLine /> },
  { title: "FullWidthBanner", icon: <RiRecordCircleLine /> },
  { title: "ProductList", icon: <RiRecordCircleLine /> },
  { title: "FeaturesBlogs", icon: <RiRecordCircleLine /> },
  { title: "NewsLetter", icon: <RiRecordCircleLine /> }
]

export const HomePage5SettingTitle = [
  { title: "HomeBanner", icon: <RiRecordCircleLine /> },
  { title: "FeaturedBanner", icon: <RiRecordCircleLine /> },
  { title: "CategoriesImageList", icon: <RiRecordCircleLine /> },
  { title: "ProductList1", icon: <RiRecordCircleLine /> },
  { title: "BankWalletOffer", icon: <RiRecordCircleLine /> },
  { title: "ProductWithDeals", icon: <RiRecordCircleLine /> },
  { title: "FullWidthBanner", icon: <RiRecordCircleLine /> },
  { title: "ProductList2", icon: <RiRecordCircleLine /> },
  { title: "ProductList3", icon: <RiRecordCircleLine /> },
  { title: "TwoColumnBanner", icon: <RiRecordCircleLine /> },
  { title: "ProductList4", icon: <RiRecordCircleLine /> },
  { title: "ProductList5", icon: <RiRecordCircleLine /> },
  { title: "DeliveryBanners", icon: <RiRecordCircleLine /> },
  { title: "ProductList6", icon: <RiRecordCircleLine /> },
  { title: "ProductList7", icon: <RiRecordCircleLine /> },
  { title: "FeaturesBlogs", icon: <RiRecordCircleLine /> },
];

export const HomePage7SettingTitle = [
  { title: "HomeBanner", icon: <RiRecordCircleLine /> },
  { title: "MainContent", icon: <RiRecordCircleLine /> }
];

export const HomePage8SettingTitle = [
  { title: "MainContent", icon: <RiRecordCircleLine /> }
];

export const HomePage6SettingTitle = [
  { title: "HomeBanner", icon: <RiRecordCircleLine /> },
  { title: "ServiceBanner", icon: <RiRecordCircleLine /> },
  { title: "MainContent", icon: <RiRecordCircleLine /> },
  { title: "FullWidthBanner", icon: <RiRecordCircleLine /> },
  { title: "ProductList", icon: <RiRecordCircleLine /> },
  { title: "NewsLetter", icon: <RiRecordCircleLine /> },
]

export const HomePage9SettingTitle = [
  { title: "HomeBanner", icon: <RiRecordCircleLine /> },
  { title: "CategoriesIconList", icon: <RiRecordCircleLine /> },
  { title: "ProductList1", icon: <RiRecordCircleLine /> },
  { title: "ColumnBanner", icon: <RiRecordCircleLine /> },
  { title: "SliderProduct", icon: <RiRecordCircleLine /> },
  { title: "CouponBanner", icon: <RiRecordCircleLine /> },
  { title: "ProductList2", icon: <RiRecordCircleLine /> },
  { title: "ProductList3", icon: <RiRecordCircleLine /> },
  { title: "NewsLetter", icon: <RiRecordCircleLine /> },
]

export const SellerDashboardTitles = [
  { title: "About" },
  { title: "Services" },
  { title: "Steps" },
  { title: "Selling" }
]
export const AboutUsTabTitle = [
  { title: "About" },
  { title: "Clients" },
  { title: "Team" },
  { title: "Testimonial" },
  { title: "Blog" }
]

export const SellerAboutStore = [
  { value: 'basic_store', title: 'BasicStore', img: basicSeller },
  { value: 'classic_store', title: 'ClassicStore', img: classicSeller },
]
export const SellerSetailsStore = [
  { value: 'basic_store_details', title: 'BasicStoreDetails', img: basicSellerStore },
  { value: 'classic_store_details', title: 'ClassicStoreDetails', img: classicSellerStore },
]

export const redirectOptions = [
  { id: 'product', name: "Product" },
  { id: 'collection', name: "Collection" },
  { id: 'external_url', name: "External Link" },
]

export const topStoreOption = [{
  value: 'today',
  name: 'Today',
},
{
  value: 'last_week',
  name: 'Last Week',
},
{
  value: 'last_month',
  name: 'Last Month',
},
{
  value: 'this_year',
  name: 'This Year',
}];

export const variantStyle = [
  { id: 'rectangle', name: 'Rectangle' },
  { id: 'circle', name: 'Circle' },
  { id: 'radio', name: 'Radio' },
  { id: 'dropdown', name: 'Dropdown' },
  { id: 'image', name: 'Image' },
  { id: 'color', name: 'Color' }
];
// authentication
export const login = "/backend/login";
export const register = "register";
export const forgotPassword = "forgot-password";
export const verifyToken = "verify-token";
export const updatePassword = "update-password";
export const LogoutAPI = "/logout";

// self data (get)
export const selfData = "/self";
export const updateProfile = "/updateProfile";
export const updateProfilePassword = "/updatePassword";

//roles api
export const role = "role";

//users api
export const user = "user";
export const UserImportAPI = "user/csv/import";
export const UserExportAPI = "user/csv/export";

// prompts api
export const prompt = "prompt";
export const PromptImportAPI = "prompt/csv/import";
export const PromptExportAPI = "prompt/csv/export";

// attributes api
export const attribute = "attribute";
export const AttributeImportAPI = "attribute/csv/import";
export const AttributeExportAPI = "attribute/csv/export";

// tags api
export const tag = "/tag";
export const TagImportAPI = "tag/csv/import";
export const TagExportAPI = "tag/csv/export";

// Categories api
export const Category = "/category";
export const CategoryImportAPI = "category/csv/import";
export const CategoryExportAPI = "category/csv/export";

// themes api
export const theme = "/theme";

// store api
export const store = "/store";

// country api
export const country = "/country";

// state api
export const state = "/state";

// blog api
export const blog = "/blog";

// tax api
export const tax = "/tax";

// coupon api
export const coupon = "/coupon";

// product api
export const product = "/product";
export const Approved = '/approve'

// shipping api
export const shipping = "/shipping";

// shippingRule api
export const shippingRule = "/shippingRule";

// setting api
export const setting = "/backend/settings";
export const updateSetting = "/settings";

// setting api
export const checkout = "/checkout";

// attachment api
export const attachment = "/attachment";
export const createAttachment = "/attachment";
export const attachmentDelete = "/attachment/deleteAll";

// Commissions
export const commissions = '/commissionHistory';

// Currency
export const currency = '/currency';

// Wallet
export const UserTransations = '/wallet/consumer';
export const WalletCredit = '/credit/wallet';
export const WalletDebit = '/debit/wallet';

// Notifications
export const NotificationsAPI = "/notifications";
export const MarkAsRead = NotificationsAPI + '/markAsRead';

// Vendor Wallet
export const VendorTransations = '/wallet/vendor';
export const VendorWalletCredit = '/credit/vendorWallet';
export const VendorWalletDebit = '/debit/vendorWallet';

// Points
export const PointUserTransations = '/points/consumer';
export const PointCredit = '/credit/points';
export const PointDebit = '/debit/points';

// Theme Option
export const ThemeOptions = "/themeOptions"

// Payment Details
export const PaymentAccount = '/paymentAccount';

// Pages
export const PagesAPI = '/page';

// Orders
export const OrderAPI = '/order';
export const OrderStatusAPI = '/orderStatus'

// Reviews
export const ReviewAPI = '/review'

// FAQ
export const FaqAPI = '/faq'

// Home Pages
export const HomePageAPI = '/home'

// Withdrawal
export const WithdrawRequestAPI = '/withdrawRequest'

// Refund
export const RefundAPI = '/refund';

// ADD TO CART
export const AddtoCartAPI = '/cart';

// Address API
export const AddressAPI = "/address"

// Badges
export const BadgeApi = '/badge'

// Badges
export const VendorSettingAPI = '/updateStoreProfile'

// Dashboard API
export const StatisticsCountAPI = '/statistics/count'
export const DashboardChartAPI = "/dashboard/chart"

// Question And Answer
export const QuestionNAnswerAPI = "/question-and-answer"

// ChatGPT API endpoint
export const ChatGPTAPI = "https://api.openai.com/v1/chat/completions"

// AnyScale API endpoint
export const AnyScaleAPI = "https://api.endpoints.anyscale.com/v1/chat/completions"
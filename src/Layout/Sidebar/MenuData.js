import { RiArticleLine, RiCoinsLine, RiContactsLine, RiCoupon2Line, RiCurrencyFill, RiExchangeDollarFill, RiHomeLine, RiImageLine, RiListUnordered, RiPagesLine, RiPercentLine, RiQuestionnaireLine, RiRefund2Line, RiSettings3Line, RiStore2Line, RiStore3Line, RiTruckLine, RiWalletLine, RiWindowLine } from "react-icons/ri";

const MENUITEMS = [
  {
    title: "Dashboard",
    displayTitle: "Dashboard",
    icon: <RiHomeLine />,
    path: "/dashboard",
    type: "link"
  },
  {
    title: "Users",
    displayTitle: "Users",
    icon: <RiContactsLine />,
    type: "sub",
    children: [
      { title: "AddUser", path: "/user/create", displayTitle: "AddUser", permission: ["user.create"] },
      { title: "AllUsers", path: "/user", displayTitle: "AllUsers", permission: ["user.index"] },
      { title: "Role", path: "/role", displayTitle: "Role", permission: ["role.index"] },
    ],
  },
  {
    title: "Stores",
    displayTitle: "Stores",
    icon: <RiContactsLine />,
    type: "sub",
    children: [
      { title: "AddStore", path: "/store/create", displayTitle: "AddStore", permission: ["store.create"] },
      { title: "AllStores", path: "/store", displayTitle: "AllStores", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["store.index"] },
      { title: "Wallet", path: "/vendor_wallet", displayTitle: "Wallets", permission: ["vendor_wallet.index"] },
      { title: "CommissionHistory", path: "/commission_history", displayTitle: "Commission History", permission: ["commission_history.index"] },
      { title: "PaymentDetails", path: "/payment_account", displayTitle: "Payment Details", permission: ["payment_account.create"] },
      { title: "Withdrawal", displayTitle: "Withdrawal", path: "/withdraw_request", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["withdraw_request.index"] },
    ],
  },
  {
    title: "Supermind Backend",
    displayTitle: "Supermind Backend",
    icon: <RiStore3Line />,
    path: "/supermind_backend",
    permission: ["supermind_backend.index"],
    type: "link"
  },
  {
    title: "Superminds",
    displayTitle: "Superminds",
    icon: <RiStore3Line />,
    type: "sub",
    children: [
      { title: "AddProduct", path: "/product/create", displayTitle: "Add Product", permission: ["product.create"] },
      { title: "AllProducts", path: "/product", displayTitle: "All Product", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["product.create"] },
      { title: "Prompts", path: "/prompt", displayTitle: "All Prompts", permission: ["prompt.index", "prompt.create"] },
      { title: "Categories", path: "/category", displayTitle: "Categories", permission: ["category.index"] },
    ],
  },
  {
    title: "ActionSuperPowers",
    displayTitle: "ActionSuperPowers",
    icon: <RiStore3Line />,
    type: "sub",
    children: [
      { title: "CreateActionSuperPower", path: "/action-superpower/create", displayTitle: "CreateActionSuperPower", permission: ["action-superpower.create"] },
      { title: "AllActionSuperPowers", path: "/action-superpower", displayTitle: "AllActionSuperPowers", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["action-superpower.index"] },
      { title: "CreateActions", path: "/action/create", displayTitle: "CreateActions", permission: ["action.create"] },
      { title: "AllActions", path: "/action", displayTitle: "AllActions", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["action.create"] },
      { title: "CreateProcedures", path: "/procedure/create", displayTitle: "CreateProcedures", permission: ["procedure.create"] },
      { title: "AllProcedures", path: "/procedure", displayTitle: "AllProcedures", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["procedure.index"] },
    ]
  },
  {
    title: "KnowledgeSuperPowers",
    displayTitle: "KnowledgeSuperPowers",
    icon: <RiStore3Line />,
    type: "sub",
    children: [
      { title: "CreateKnowledgeSuperPower", path: "/knowledge-superpower/create", displayTitle: "CreateKnowledgeSuperPower", permission: ["knowledge-superpower.create"] },
      { title: "AllKnowledgeSuperPowers", path: "/knowledge-superpower", displayTitle: "AllKnowledgeSuperPowers", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["knowledge-superpower.index"] },
      { title: "CreateKnowledgeBases", path: "/knowledge", displayTitle: "CreateKnowledgeBases", permission: ["knowledge-superpower.create"] },
      { title: "AllKnowledgeBases", path: "", displayTitle: "AllKnowledgeBases", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: [] },
    ]
  },
  {
    title: "UISuperPowers",
    displayTitle: "UISuperPowers",
    icon: <RiStore3Line />,
    type: "sub",
    children: [
      { title: "CreateUISuperPower", path: "/ui-superpower/create", displayTitle: "CreateUISuperPower", permission: ["ui-superpower.create"] },
      { title: "AllUISuperPowers", path: "/ui-superpower", displayTitle: "AllUISuperPowers", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["ui-superpower.index"] },
      { title: "CreateUIFunctions", path: "", displayTitle: "CreateUIFunctions", permission: [] },
      { title: "AllUIFunctions", path: "", displayTitle: "AllUIFunctions", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: [] },
    ]
  },
  // {
  //   title: "Superpowers",
  //   displayTitle: "Superpowers",
  //   icon: <RiStore3Line />,
  //   type: "sub",
  //   children: [
  //     { title: "AddSuperpower", path: "/superpower/create", displayTitle: "Add Superpower", permission: ["superpower.create"] },
  //     { title: "AllSuperPowers", path: "/superpower", displayTitle: "All Superpowers", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["superpower.create"] },
  //     { title: "CreateActions", path: "/action/create", displayTitle: "Create Superpower", permission: ["action.create"] },
  //     { title: "AllActions", path: "/action", displayTitle: "All Actions", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["action.create"] },
  //     { title: "AddKnowledge", path: "/knowledge", displayTitle: "Add Knowledge", permission: ["superpower.create"] },
  //     // { title: "Categories", path: "/category", displayTitle: "Categories", permission: ["category.index"] },
  //     // { title: "Tags", path: "/tag", displayTitle: "All Tag", permission: ["tag.index", "tag.create"] },
  //     // { title: "Q&A", path: "/qna", displayTitle: "All Tag", permission: ["question_and_answer.index", "question_and_answer.create"] },
  //   ],
  // },
  {
    title: "Models",
    displayTitle: "Models",
    icon: <RiStore3Line />,
    type: "sub",
    children: [
      { title: "AddModel", path: "/gptmodel/create", displayTitle: "AddModel", permission: ["gptmodel.create"] },
      { title: "AllModels", path: "/gptmodel", displayTitle: "AllModels", permission: ["gptmodel.index"] },
      { title: "AddTrainingData", path: "/gptmodel/create", displayTitle: "AddTrainingData", permission: ["gptmodel.create"] },
      { title: "CreateTrainingData", path: "/gptmodel/create", displayTitle: "CreateTrainingData", permission: ["gptmodel.create"] },
    ],
  },
  // {
  //   title: "CustomModels",
  //   displayTitle: "CustomModels",
  //   icon: <RiStore3Line />,
  //   path: "/gptmodel",
  //   type: "link",
  //   permission: ["gptmodel.index", "gptmodel.create"]
  // },
  // {
  //   title: "Orders",
  //   displayTitle: "Orders",
  //   icon: <RiListUnordered />,
  //   type: "sub",
  //   children: [
  //     { title: "AllOrders", path: "/order", displayTitle: "All Orders", permission: ["order.index"] },
  //     { title: "CreateOrder", path: "/order/create", displayTitle: "Create Order", permission: ["order.create"] }],
  // },
  {
    title: "Media",
    displayTitle: "Media",
    icon: <RiImageLine />,
    path: "/attachment",
    permission: ["attachment.index", "attachment.create"],
    type: "link"
  },
  {
    title: "Blog",
    displayTitle: "Blog",
    icon: <RiArticleLine />,
    type: "sub",
    children: [
      { title: "AllBlogs", path: "/blog", displayTitle: "All Blog", permission: ["blog.index"], },
      { title: "Categories", path: "/blog/category", displayTitle: "Category", permission: ["category.index", "category.create"], },
      { title: "Tags", path: "/blog/tag", displayTitle: "Tags", permission: ["tag.index", "tag.create"] },
    ],
  },
  // {
  //   title: "Pages",
  //   displayTitle: "Pages",
  //   icon: <RiPagesLine />,
  //   path: "/page", permission: ["page.index"],
  //   type: "link"
  // },
  // {
  //   title: "Taxes",
  //   displayTitle: "Taxes",
  //   icon: <RiPercentLine />,
  //   path: "/tax", permission: ["tax.index"],
  //   type: "link"
  // },

  // {
  //   title: "Shipping",
  //   displayTitle: "Shipping",
  //   icon: <RiTruckLine />,
  //   path: "/shipping",
  //   permission: ["shipping.index"],
  //   type: "link"
  // },
  // {
  //   title: "Coupons",
  //   displayTitle: "Coupons",
  //   icon: <RiCoupon2Line />,
  //   path: "/coupon",
  //   permission: ["coupon.index"],
  //   type: "link"
  // },
  // {
  //   title: "Currencies",
  //   displayTitle: "Currency",
  //   icon: <RiCurrencyFill />,
  //   path: "/currency",
  //   permission: ["currency.index"],
  //   type: "link"
  // },
  {
    title: "Points",
    displayTitle: "Point",
    icon: <RiCoinsLine />,
    path: "/point",
    permission: ["point.index"],
    type: "link"
  },
  {
    title: "Wallet",
    displayTitle: "Wallet",
    icon: <RiWalletLine />,
    path: "/wallet",
    permission: ["wallet.index"],
    type: "link"
  },
  // {
  //   title: "Refund",
  //   displayTitle: "Refund",
  //   icon: <RiExchangeDollarFill />,
  //   path: "/refund",
  //   permission: ["refund.index"],
  //   badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0,
  //   type: "link"
  // },
  {
    title: "Reviews",
    displayTitle: "Reviews",
    icon: <RiRefund2Line />,
    path: "/review",
    permission: ["review.index"],
    type: "link"
  },
  {
    title: "FAQ's",
    displayTitle: "FAQ's",
    icon: <RiQuestionnaireLine />,
    path: "/faq",
    permission: ["faq.index"],
    type: "link"
  },
  {
    title: "StoreFront",
    displayTitle: "Store Front",
    icon: <RiWindowLine />,
    type: "sub",
    children: [
      { title: "Themes", path: "/theme", displayTitle: "Theme", permission: ["theme.index"], },
      { title: "ThemeOptions", path: "/theme_option", displayTitle: "Theme Option", permission: ["theme_option.index"], }
    ],
  },
  {
    title: "Settings",
    displayTitle: "Settings",
    icon: <RiSettings3Line />,
    path: "/setting",
    permission: ["setting.index"],
    type: "link"
  }
];

export default MENUITEMS;

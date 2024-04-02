import { RiArticleLine, RiContactsLine, RiCoupon2Line, RiListOrdered, RiSettings3Line, RiStore3Line, RiWindowLine } from "react-icons/ri";

export const QuickLinksData = [
    {
      title: 'AddUser',
      path: '/user/create',
      icon: <RiContactsLine />
    },
    {
      title: 'AddProduct',
      path: '/product/create',
      icon: <RiStore3Line />
    },
    {
      title: 'AddCoupon',
      path: '/coupon/create',
      icon: <RiCoupon2Line />
    },
    {
      title: 'AddBlog',
      path: '/blog/create',
      icon: <RiArticleLine />
    },
    {
      title: 'AllOrders',
      path: '/order',
      icon: <RiListOrdered />
    },
    {
      title: 'SiteSettings',
      path: '/setting',
      icon: <RiSettings3Line />
    },
    {
      title: 'ThemeSettings',
      path: '/theme-option',
      icon: <RiWindowLine />
    }
  ]
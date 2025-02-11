import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";


const uniqueID = ()=>{
  return "id" + Math.random().toString(16).slice(2);
}


export type Menu = {
  id?: string,
  title?: string,
  icon?: any,
  href?: string,
  navlabel?: boolean,
  subheader?: string,
}


const Menuitems:Menu [] = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueID(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  // {
  //   navlabel: true,
  //   subheader: "Utilities",
  // },
  // {
  //   id: uniqueID(),
  //   title: "Typography",
  //   icon: IconTypography,
  //   href: "/utilities/typography",
  // },
  // {
  //   id: uniqueID(),
  //   title: "Shadow",
  //   icon: IconCopy,
  //   href: "/utilities/shadow",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueID(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueID(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueID(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueID(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
  {
    navlabel: true,
    subheader: "Payment",
  },
  {
    id: uniqueID(),
    title: "Offer",
    icon: IconAperture,
    href: "/payment/offer",
  },
  // {
  //   id: uniqueID(),
  //   title: "Plan",
  //   icon: IconAperture,
  //   href: "/payment/plan",
  // },
  {
    navlabel: true,
    subheader: "Customer",
  },
  {
    id: uniqueID(),
    title: "Manager",
    icon: IconAperture,
    href: "/customer",
  },
  {
    id: uniqueID(),
    title: "Guide",
    icon: IconAperture,
    href: "/guide",
  },
];

const MenuCustomerItems: Menu[] = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueID(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Payment",
  },
  {
    id: uniqueID(),
    title: "Offer",
    icon: IconAperture,
    href: "/payment/offer",
  },
  
  {
    navlabel: true,
    subheader: "Customer",
  },
  {
    id: uniqueID(),
    title: "Guide",
    icon: IconAperture,
    href: "/guide",
  },
];


export default Menuitems;
export {MenuCustomerItems};
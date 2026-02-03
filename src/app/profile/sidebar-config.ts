import { SidebarItem } from "@/components/wrapper/sidebar/sidebar";

export const profileSidebarItems: SidebarItem[] = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "My payments",
    href: "/profile/wallet/payments",
  },
  {
    label: "Top up balance",
    href: "/profile/wallet/top-up",
  },
  {
    label: "Removed lots",
    href: "/profile/wallet/removed-lots",
  },
];

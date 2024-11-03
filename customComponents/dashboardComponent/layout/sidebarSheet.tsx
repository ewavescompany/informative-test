import Link from "next/link";
import React from "react";
import {
  Home,
  Layers3,
  Lightbulb,
  Package2,
  Newspaper,
  Fingerprint,
  Eye,
  Signature,
  Users,
  ShieldCheck,
  Menu,
  Mails,
  Settings,
} from "lucide-react";
import Cookies from "js-cookie"; // Import the js-cookie library
import { SidebarLink } from "../links/sidebarLink";
import { DropdownNavItem } from "@/customComponents/layoutComponents/dropdownNavItem";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Assuming you're using ShadCN's Sheet component
import { useTranslations } from "next-intl";

const SidebarSheet: React.FC = () => {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("sidebar");
  return (
    <>
      {/* Button to toggle the sheet (for mobile view) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        {/* The actual sheet content for the navigation menu */}
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span>Acme Inc</span>
            </Link>
            <DropdownNavItem
              icon={Home}
              label={t("home")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/video-section`, // Use locale from cookies
                  label: t("video_section"),
                },
                {
                  href: `/${locale}/admin/dashboard/stats-section`, // Use locale from cookies
                  label: t("stats_section"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Newspaper}
              label={t("blogs")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/blogs`,
                  label: t("show_blogs"),
                }, // Use locale from cookies
                {
                  href: `/${locale}/admin/dashboard/blogs/add-blogs`, // Use locale from cookies
                  label: t("add_blogs"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Fingerprint}
              label={t("portfolios")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/portfolio`, // Use locale from cookies
                  label: t("show_portfolio"),
                },
                {
                  href: `/${locale}/admin/dashboard/portfolio/add-portfolios`, // Use locale from cookies
                  label: t("add_portfolio"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Layers3}
              label={t("services")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/service`,
                  label: t("show_services"),
                }, // Use locale from cookies
                {
                  href: `/${locale}/admin/dashboard/service/add-services`, // Use locale from cookies
                  label: t("add_services"),
                },
              ]}
            />
            <DropdownNavItem
              icon={Users}
              label={t("teams")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/team`,
                  label: t("show_team"),
                }, // Use locale from cookies
                {
                  href: `/${locale}/admin/dashboard/team/add-teams`, // Use locale from cookies
                  label: t("add_teams"),
                },
              ]}
            />
            <DropdownNavItem
              icon={ShieldCheck}
              label={t("testimonials")}
              items={[
                {
                  href: `/${locale}/admin/dashboard/testimonials`, // Use locale from cookies
                  label: t("show_testimonials"),
                },
                {
                  href: `/${locale}/admin/dashboard/testimonials/add-testimonial`, // Use locale from cookies
                  label: t("add_testimonials"),
                },
              ]}
            />
            <SidebarLink
              href={`/${locale}/admin/dashboard/about-us`} // Use locale from cookies
              icon={Signature}
              label={t("about_us")}
            />
            <SidebarLink
              href={`/${locale}/admin/dashboard/mission`}
              icon={Lightbulb}
              label={t("mission")}
            />{" "}
            {/* Use locale from cookies */}
            <SidebarLink
              href={`/${locale}/admin/dashboard/vission`}
              icon={Eye}
              label={t("vision")}
            />{" "}
            {/* Use locale from cookies */}
            <SidebarLink
              href={`/${locale}/admin/dashboard/contact-messages`}
              icon={Mails}
              label={t("contact_message")}
            />{" "}
            {/* Use locale from cookies */}
            <SidebarLink
              href={`/${locale}/admin/dashboard/settings`} // Use locale from cookies
              icon={Settings}
              label={t("settings")}
            />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Static sidebar for larger screens */}
    </>
  );
};

export default SidebarSheet;

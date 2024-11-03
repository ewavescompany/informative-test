"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Youtube, Twitter, Instagram } from "lucide-react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("navbar");
  // Function to handle scroll event
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  // Add scroll event listener on mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full h-fit min-h-20 px-8 sm:px-20 flex flex-row items-center text-graywhite gap-10 fixed transition-all duration-300 z-50 shadow-md ${
        scrollPosition > 50 ? "bg-grayblack" : "bg-grayblack/50"
      }`}
    >
      {/* <Image
        src={exampleImage}
        alt="logo"
        className="max-w-24 max-h-24 h-full w-full"
      /> */}
      <h2 className="text-2xl">Company logo</h2>
      <div className="flex flex-row gap-3 ">
        <Link href={"/"} className="text-base font-semibold">
          {t("home")}
        </Link>
        <Link
          href={`/${locale}/client/about-us`}
          className="text-base font-semibold"
        >
          {t("about_us")}
        </Link>
        <Link
          href={`/${locale}/client/services`}
          className="text-base font-semibold"
        >
          {t("services")}
        </Link>
        <Link
          href={`/${locale}/client/contact-us`}
          className="text-base font-semibold"
        >
          {t("contact_us")}
        </Link>
        <Link
          href={`/${locale}/client/portfolio`}
          className="text-base font-semibold"
        >
          {t("portfolio")}
        </Link>
        <Link
          href={`/${locale}/client/blogs`}
          className="text-base font-semibold"
        >
          {t("blogs")}
        </Link>
      </div>
      <div
        className={`w-fit flex flex-row gap-3 ${
          locale === "en" ? "flex-row ml-auto" : "flex-row-reverse mr-auto"
        }`}
      >
        <Link
          className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit"
          href={"/home"}
        >
          <Facebook size={20} />
        </Link>

        <Link
          className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit"
          href={"/home"}
        >
          <Youtube size={20} />
        </Link>
        <Link
          className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit"
          href={"/home"}
        >
          <Twitter size={20} />
        </Link>
        <Link
          className="lg:text-lg text-base text-graywhite font-medium flex flex-row gap-2 items-center justify-center w-fit"
          href={"/home"}
        >
          <Instagram size={20} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

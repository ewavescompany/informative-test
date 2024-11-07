"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Youtube, Twitter, Instagram } from "lucide-react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import Image from "next/image";

function Navbar({ logo }: { logo: string }) {
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
      <div className="p-1 w-48 h-20">
        <Link href={"/"}>
          {logo ? (
            <Image
              src={logo}
              width={200}
              height={200}
              alt="Company Logo"
              className="max-w-48 max-h-24 h-full w-full object-cover"
            />
          ) : (
            <h2 className="text-white font-semibold text-xl">Company Logo</h2>
          )}
        </Link>
      </div>
      {/* Navigation Links */}
      <div className="flex flex-row gap-4 ">
        <Link href={"/"} className="text-base font-semibold">
          {t("home")}
        </Link>
        {/* <Link
          href={`/${locale}/client/about-us`}
          className="text-base font-semibold"
        >
          {t("about_us")}
        </Link> */}
        <Link
          href={`/${locale}/client/services`}
          className="text-base font-semibold"
        >
          {t("services")}
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
        <Link
          href={`/${locale}/client/contact-us`}
          className="text-base font-semibold"
        >
          {t("contact_us")}
        </Link>
      </div>
      <div
        className={`w-fit flex flex-row gap-3 ${
          locale === "en" ? "flex-row ml-auto" : "flex-row-reverse mr-auto"
        }`}
      >
        <Link href={"/home"} className="lg:text-lg text-base text-graywhite">
          <Facebook size={20} />
        </Link>
        <Link href={"/home"} className="lg:text-lg text-base text-graywhite">
          <Youtube size={20} />
        </Link>
        <Link href={"/home"} className="lg:text-lg text-base text-graywhite">
          <Twitter size={20} />
        </Link>
        <Link href={"/home"} className="lg:text-lg text-base text-graywhite">
          <Instagram size={20} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

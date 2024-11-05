"use client";

import { useRouter } from "next/navigation"; // Update this import
import SlideComponent from "../reavelAnimation/slideComponent";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
import { ArrowUpRight, Send } from "lucide-react";
import bentoImage from "../../public/bento1.png";
import bentoImage1 from "../../public/robotics.png";
import bgUrl from "../../public/Services-How-BG.webp";
import Image from "next/image";

function BentoGrids() {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("bentoGrids");
  const router = useRouter();

  return (
    <div className="min-h-[80vh] h-full w-full grid xl:grid-cols-2 grid-cols-1 gap-5 overflow-hidden">
      <SlideComponent dir="left">
        <div
          onClick={() => router.push("/client/about-us")}
          className="cursor-pointer dotbg w-full h-full xl:min-h-full min-h-[300px] bg-grayblack relative aspect-auto lg:aspect-video  text-graywhite overflow-hidden  rounded-2xl md:p-8 p-4 flex flex-col gap-3"
        >
          <h3 className="md:text-lg text-base uppercase animate-slideInDown">
            {t("future_focused")}
          </h3>
          <Image
            className="w-full h-full absolute object-cover top-0 bottom-0 left-0 right-0"
            alt="mission"
            src={bgUrl}
          />
          <h1 className="lg:text-5xl md:text-3xl text-lg font-medium z-10">
            {t("revolutionizing")}
          </h1>
          <Image
            src={bentoImage}
            alt="logo"
            fill
            className={`${
              locale === "en" ? "mr-auto" : "ml-auto"
            } xl:max-w-[60%] xl:max-h-[60%] max-h-[80%] max-w-[50%] bottom-1 mt-auto  absolute aspect-square`}
          />
          <Link
            href={"/client/about-us"}
            className="z-10 md:text-lg text-base mt-auto border-graywhite border-2 hover:border-graywhite/50 hover:text-graywhite/50 bg-transparent duration-500 shadow-md w-fit p-2 rounded-xl animate-slideInLeft "
          >
            {t("explore_future")}
          </Link>
        </div>
      </SlideComponent>
      <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-5 min-h-full">
        <SlideComponent className="col-span-2 w-full" dir="down">
          <div
            onClick={() => router.push("/client/blogs")}
            className="cursor-pointer w-full h-full xl:min-h-full min-h-[300px] dotbg bg-[#D7D8DC] text-grayblack rounded-2xl flex flex-col justify-between md:p-8 p-4 gap-3 overflow-hidden"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <h3 className="md:text-lg text-base uppercase animate-slideInDown ">
                {t("world_of_hearing")}
              </h3>
              <Link
                href={"/client/blogs"}
                className="hover:scale-150 duration-500"
              >
                <ArrowUpRight className="md:text-2xl text-lg text-grayblack" />
              </Link>
              <Image
                src={bentoImage1}
                alt="logo"
                fill
                className={`${
                  locale === "en" ? "mr-auto" : "ml-auto"
                } xl:max-h-[80%] lg:max-w-[50%] md:max-h-[90%] max-h-[60%] max-w-[40%] bottom-1 right-1 mt-auto  absolute aspect-square`}
              />
            </div>
            <h1 className="lg:text-4xl md:text-3xl text-xl font-medium animate-slideInUp">
              {t("view_blog")}
            </h1>
          </div>
        </SlideComponent>
        <SlideComponent
          className="w-full h-full md:col-span-1 col-span-2"
          dir="left"
        >
          <div
            onClick={() => router.push("/client/blogs")}
            className="cursor-pointer w-full h-full bg-[#D7D8DC] dotbg text-grayblack rounded-2xl flex flex-col justify-between md:p-8 p-4 gap-3 overflow-hidden"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <h3 className="text-base uppercase animate-slideInDown">
                {t("discover")} <br />
                {t("our_history")}
              </h3>
              <Link
                href={"/client/blogs"}
                className="hover:scale-150 duration-500"
              >
                <ArrowUpRight className="md:text-2xl text-lg text-grayblack" />
              </Link>
            </div>
            <h1 className="lg:text-4xl md:text-3xl text-xl font-medium animate-slideInUp">
              {t("about_us")}
            </h1>
          </div>
        </SlideComponent>
        <SlideComponent
          className="w-full h-full md:col-span-1 col-span-2"
          dir="right"
        >
          <div
            onClick={() => router.push("/client/contact-us")}
            className="cursor-pointer w-full h-full bg-grayblack text-graywhite rounded-2xl flex flex-col justify-between md:p-8 p-4 gap-3 relative overflow-hidden"
          >
            <Image
              className="w-full h-full absolute object-cover top-0 bottom-0 left-0 right-0"
              alt="mission"
              src={bgUrl}
            />
            <div className="w-full flex flex-row justify-between items-center">
              <h3 className="text-base uppercase animate-slideInDown">
                {t("have_some")} <br />
                {t("questions")}
              </h3>
              <Link
                href={"/client/contact-us"}
                className="hover:scale-150 duration-500 z-[1]"
              >
                <Send className="md:text-2xl text-lg text-graywhite" />
              </Link>
            </div>
            <h1 className="lg:text-4xl md:text-3xl text-xl font-medium animate-slideInUp">
              {t("contact_us")}
            </h1>
          </div>
        </SlideComponent>
      </div>
    </div>
  );
}

export default BentoGrids;

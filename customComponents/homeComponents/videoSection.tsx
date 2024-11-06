"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import SlideComponent from "../reavelAnimation/slideComponent";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { settings } from "@/interfaces/dashboardInterface";
import { videosPath } from "@/constants/urls";

interface videoSectionInterface {
  settings: settings;
}

function VideoSection({ settings }: videoSectionInterface) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("HomePage");

  return (
    <div className="w-full h-screen relative grid lg:grid-cols-2 grid-cols-1">
      <video
        className="object-cover w-full h-full absolute top bottom-0 left-0 right-0"
        loop
        muted
        autoPlay
        src={`${videosPath}${settings.hero_video}`}
      />
      <div className="w-full h-full flex flex-col z-10 lg:text-left text-center overflow-hidden">
        <div className="flex flex-col gap-4 justify-center xl:py-[20%] px-[10%] lg:py-[20%] w-full h-full overflow-hidden">
          <div className="flex flex-col gap-4 overflow-hidden">
            <SlideComponent dir="down">
              <h2
                className={`md:text-3xl lg:text-6xl text-2xl font-semibold text-graywhite ${
                  locale === "en" ? "text-left" : "text-right"
                }`}
              >
                {locale === "en"
                  ? settings.hero_title_en
                  : settings.hero_title_ar}
              </h2>
            </SlideComponent>
            <SlideComponent dir="up">
              <h4
                className={`lg:text-xl md:text-lg text-base font-semibold text-graywhite ${
                  locale === "en" ? "text-left" : "text-right"
                }`}
              >
                {locale === "en"
                  ? settings.hero_description_en
                  : settings.hero_description_ar}
              </h4>
            </SlideComponent>
          </div>

          <div className="flex flex-row gap-3 overflow-hidden lg:mx-0 mx-auto">
            <SlideComponent dir="up">
              <Button
                className="w-fit border-graywhite border-2 text-graywhite hover:text-grayblack"
                size={"default"}
                variant={"ghost"}
              >
                {t("more_about_us")}
              </Button>
            </SlideComponent>
            <SlideComponent dir="down">
              <Button
                className="w-fit border-graywhite border-2 text-grayblack hover:text-graywhite hover:bg-transparent animate-slideInDown"
                size={"default"}
                variant={"secondary"}
              >
                {t("contact_us")}
              </Button>
            </SlideComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSection;

"use client";
import React from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import SlideComponent from "../reavelAnimation/slideComponent";

function AboutusVideoSection({
  title1,
  title2,
  descriptionEn,
  descriptionAr,
}: {
  title1: string;
  title2: string;
  descriptionEn: string;
  descriptionAr: string;
}) {
  const t = useTranslations("aboutus");
  const locale = Cookies.get("NEXT_LOCALE") || "en";

  return (
    <div className="w-full h-[50vh] relative flex flex-col items-center justify-center gap-3">
      <video
        className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[1]"
        loop
        muted
        autoPlay
        src="/aboutus/aboutUsVideo.mp4" // Use relative URL path
      />
      <div className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[2] bg-grayblack/80"></div>
      <h1 className="w-fit h-fit capitalize flex flex-col items-center justify-center gap-3 md:text-3xl lg:text-5xl text-2xl font-semibold text-graywhite z-[3] ">
        <div className="w-full h-full flex flex-row items-center justify-center">
          <SlideComponent dir="down">
            <span className="">{title1 && t(title1)}</span>
          </SlideComponent>
        </div>
        <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden">
          <SlideComponent dir="up">
            <span className="">{title2 && t(title2)}</span>
          </SlideComponent>
        </div>
      </h1>
      <p className="font-medium text-graywhite z-[3] xl:text-lg md:text-base text-sm xl:max-w-[900px] md:max-w-[600px] sm:max-w-[400px] text-center">
        {locale === "en" ? descriptionEn : descriptionAr}
      </p>
    </div>
  );
}

export default AboutusVideoSection;

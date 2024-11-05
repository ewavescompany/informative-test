"use client";
import React from "react";
import SlideComponent from "@/customComponents/reavelAnimation/slideComponent";
import Cookies from "js-cookie";
import { imagesPath } from "@/constants/urls";
function PortfolioHeader({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  image,
}: {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
}) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  return (
    <div className="w-full h-[100vh] relative flex flex-col items-start justify-end gap-3 overflow-hidden px-8 py-16">
      <div className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[2] bg-grayblack/80"></div>
      <img
        src={`${imagesPath}portfolios/${image}`}
        alt="blog img"
        className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[1]"
      />
      <h1 className="w-fit h-fit capitalize flex flex-row items-center justify-center gap-3 md:text-3xl lg:text-6xl text-2xl font-semibold text-graywhite z-[3]">
        <SlideComponent dir="down">
          <span className="">{locale === "en" ? titleEn : titleAr}</span>
        </SlideComponent>
      </h1>
      <p className="font-medium text-graywhite z-[3] xl:text-lg md:text-base text-sm xl:max-w-[900px] md:max-w-[600px] sm:max-w-[400px] text-center">
        {locale === "en" ? descriptionEn : descriptionAr}
      </p>
    </div>
  );
}

export default PortfolioHeader;

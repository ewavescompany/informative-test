"use client";
import React from "react";
import SlideComponent from "../reavelAnimation/slideComponent";
import { vissionInterface } from "@/interfaces/clientInterface";
import { imagesPath } from "@/constants/urls";
import Cookies from "js-cookie";
function Vission({ vission }: { vission: vissionInterface }) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 items-center justify-center overflow-hidden">
      <div className="xl:col-span-2 md:col-span-1 col-span-1 w-full h-full dotbg flex items-center justify-center">
        <SlideComponent dir="left">
          <img
            className="w-full h-full"
            alt="vision"
            src={`${imagesPath}vision/${vission?.image}`}
          />
        </SlideComponent>
      </div>
      <div className="flex flex-col gap-3 items-start overflow-hidden">
        <SlideComponent dir="down">
          <h4 className="lg:text-6xl text-3xl font-medium capitalize text-center text-grayblack">
            {locale === "en" ? vission?.title_en : vission?.title_ar}
          </h4>
        </SlideComponent>
        <SlideComponent dir="left">
          <h5 className="md:text-xl text-lg font-medium text-center text-gray-500">
            {locale === "en" ? vission?.sub_title_en : vission?.sub_title_ar}
          </h5>
        </SlideComponent>
        <SlideComponent dir="up">
          <p className=" md:text-lg text-base w-full font-medium">
            {locale === "en"
              ? vission?.description_en
              : vission?.description_ar}
          </p>
        </SlideComponent>
      </div>
    </div>
  );
}

export default Vission;

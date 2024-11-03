import React from "react";
import SlideComponent from "../reavelAnimation/slideComponent";
import { imagesPath } from "@/constants/urls";
import { useTranslations } from "next-intl";

function LeftDirectionService({
  title,
  describition,
  imgUrl,
}: {
  title: string;
  describition: string;
  imgUrl: string;
}) {
  const t = useTranslations("services");
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-10 overflow-hidden">
      <div className="w-full h-full flex flex-col gap-3 justify-center overflow-hidden">
        <SlideComponent dir="down">
          <h5 className=" text-base font-medium text-gray-500">
            {t("service")}
          </h5>
        </SlideComponent>
        <SlideComponent dir="left">
          <h4 className="text-grayblack lg:text-5xl text-3xl font-medium">
            {title}
          </h4>
        </SlideComponent>
        <SlideComponent dir="up">
          <p className="text-gray-500 xl:text-lg text-base font-medium ">
            {describition}
          </p>
        </SlideComponent>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center dotbg minibg overflow-hidden">
        <SlideComponent dir="up">
          <img
            className=" max-w-[300px] max-h-[300px] rounded-3xl"
            alt="service"
            src={`${imagesPath}services/${imgUrl}`}
          />
        </SlideComponent>
      </div>
    </div>
  );
}

export default LeftDirectionService;

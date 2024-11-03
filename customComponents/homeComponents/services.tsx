import React from "react";
import ServiceCard from "../servicesComponents/serviceCard";
import SlideComponent from "../reavelAnimation/slideComponent";
import { useTranslations } from "next-intl";

function Services() {
  const t = useTranslations("services");
  return (
    <div className="flex flex-col lg:gap-10 gap-5 items-center justify-center">
      <h3 className="lg:text-6xl flex flex-col gap-3 text-3xl font-medium capitalize text-center text-grayblack overflow-hidden">
        <SlideComponent dir="down">{t("What services")}</SlideComponent>
        <SlideComponent dir="up">{t("we give")}</SlideComponent>
      </h3>
      <div className="grid xl:grid-cols-2 lg:grid-cols-2  grid-cols-1 gap-5 min-h-[80vh] w-full overflow-hidden">
        <SlideComponent dir="left">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="right">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="left">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="right">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="left">
          <ServiceCard />
        </SlideComponent>
        <SlideComponent dir="right">
          <ServiceCard />
        </SlideComponent>
      </div>
    </div>
  );
}

export default Services;

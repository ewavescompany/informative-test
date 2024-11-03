"use client";
import Image from "next/image";
import React from "react";
import bgUrl from "../../public/Services-How-BG.webp";
import SlideComponent from "../reavelAnimation/slideComponent";
import { statsInterface } from "@/interfaces/clientInterface";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
function Stats({ stats }: { stats: statsInterface }) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("stats");
  return (
    <div className="z-[-1] relative grid lg:grid-cols-2 grid-cols-1 overflow-hidden w-full h-full px-8 sm:px-20 lg:px-28 lg:py-14 py-4 sm:py-10 bg-grayblack/90 rounded-2xl min-h-[30vh] lg:gap-10 gap-5">
      <Image
        className="w-full h-full absolute object-cover top-0 bottom-0 left-0 right-0"
        alt="mission"
        src={bgUrl}
      />
      <div className="flex flex-col gap-3 h-full w-full">
        <SlideComponent dir="down">
          <span className="text-gray-500 sm:text-xl text-lg font-medium">
            {t("stats")}
          </span>
        </SlideComponent>
        <h3 className="text-graywhite lg:text-5xl md:text-2xl sm:text-xl text-lg font-medium">
          <SlideComponent dir="left">
            {locale === "en" ? stats.title_en : stats?.title_ar}
          </SlideComponent>
        </h3>
        <SlideComponent dir="up">
          <p className="text-graywhite/80 text-base font-medium">
            {locale === "en" ? stats.sub_title_en : stats?.sub_title_ar}
          </p>
        </SlideComponent>
      </div>
      <div className="grid grid-cols-2 gap-3 h-full w-full overflow-hidden">
        <StatCard
          value={`${stats.stat1}${t("K")}`}
          indicator="+"
          description={t("Businesses served")}
        />
        <StatCard
          value={stats.stat2}
          indicator="%"
          description={t("Average increase in engagement")}
        />
        <StatCard
          value={stats.stat3}
          indicator="+"
          description={t("Countries reached")}
        />
        <StatCard
          value={`${stats.stat4}${t("M")}`}
          indicator="+"
          description={t("Campaigns launched annually")}
        />
      </div>
    </div>
  );
}

export default Stats;

function StatCard({
  value,
  indicator,
  description,
}: {
  value: string;
  indicator: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1 justify-center overflow-hidden">
      <SlideComponent dir="down">
        <h5 className="text-[#F7A600] lg:text-5xl md:text-3xl text-2xl flex flex-row items-center font-medium">
          <span className="uppercase">{value}</span>
          <span className="text-graywhite lg:text-3xl md:text-xl text-lg">
            {indicator}
          </span>
        </h5>
      </SlideComponent>
      <SlideComponent dir="up">
        <p className="text-graywhite">{description}</p>
      </SlideComponent>
    </div>
  );
}

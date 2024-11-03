"use client";
import Link from "next/link";
import React from "react";
import SlideComponent from "../reavelAnimation/slideComponent";
import { teamsInterface } from "@/interfaces/clientInterface";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { TeamMember } from "@/interfaces/dashboardInterface";
import { imagesPath } from "@/constants/urls";
interface teamSectionInterface {
  team: teamsInterface[];
}

function TeamSection({ team }: teamSectionInterface) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("team");
  return (
    <div className="flex flex-col overflow-hidden w-full h-full px-0 sm:px-5 lg:px-8 lg:py-14 py-4 sm:py-10 lg:gap-10 gap-5">
      <div className="flex flex-col items-center gap-3 minibg overflow-hidden">
        <SlideComponent dir="down">
          <h4 className="text-grayblack md:text-xl text-lg font-medium">
            {t("Team")}
          </h4>
        </SlideComponent>

        <h3 className="lg:text-4xl md:text-2xl text-xl font-medium capitalize text-center text-gray-500">
          <SlideComponent dir="right">
            {t("Driven by expertise")}
          </SlideComponent>
          <SlideComponent dir="left">{t("united by vision")}</SlideComponent>
        </h3>
        <SlideComponent dir="down">
          <p className="text-grayblack/90 text-sm font-medium max-w-[400px] text-center">
            {t("team_description")}
          </p>
        </SlideComponent>
        <SlideComponent dir="up">
          <Link
            href={`/${locale}/about-us`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            {t("Learn more")}
          </Link>
        </SlideComponent>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {team.map((member: TeamMember, index: number) => (
          <div className="w-full h-full overflow-hidden" key={index}>
            <SlideComponent dir="up" triggerOnce>
              <TeamCard
                imgUrl={`${imagesPath}team/${member.image}`}
                name={locale === "en" ? member?.name_en : member?.name_ar}
                title={
                  locale === "en" ? member?.position_en : member?.position_ar
                }
              />
            </SlideComponent>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamSection;

function TeamCard({
  imgUrl,
  name,
  title,
}: {
  imgUrl: string; // Change from string to StaticImageData
  name: string;
  title: string;
}) {
  return (
    <div className="flex flex-col ">
      <img
        src={imgUrl}
        width={100}
        height={100}
        className="aspect-square w-full border-2 border-white rounded-lg mb-3 shadow-md hover:shadow-lg duration-1000"
        alt="team member"
      />
      <span className="text-lg text-grayblack capitalize font-medium">
        {name}
      </span>
      <span className="text-lg text-gray-500 capitalize font-medium">
        {title}
      </span>
    </div>
  );
}

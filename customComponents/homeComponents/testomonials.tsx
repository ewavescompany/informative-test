"use client";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import SlideComponent from "../reavelAnimation/slideComponent";
import { useTranslations } from "next-intl";
import { testimonialsInterface } from "@/interfaces/clientInterface";
import { imagesPath } from "@/constants/urls";

function Testomonials({
  testimonials,
}: {
  testimonials: testimonialsInterface[];
}) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("testimonials");
  console.log(testimonials);
  return (
    <div className="flex relative flex-col overflow-hidden w-full h-full  px-0 sm:px-5 lg:px-8 lg:pb-14 pb-4 sm:pb-10 lg:gap-10 gap-5">
      <div className="flex flex-col items-center gap-3 minibg">
        <SlideComponent dir="down">
          <h4 className="text-grayblack md:text-xl text-lg font-medium">
            {t("testimonials")}
          </h4>
        </SlideComponent>
        <h3 className="lg:text-4xl md:text-2xl text-xl font-medium capitalize text-center text-gray-500">
          <SlideComponent dir="right">{t("what_our_users")}</SlideComponent>
          <SlideComponent dir="left">
            {t("said_about_our_company")}
          </SlideComponent>
        </h3>
        <SlideComponent dir="up">
          <Link
            href={"/about-us"}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            {t("learn_more")}
          </Link>
        </SlideComponent>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {testimonials.map((testimonial: testimonialsInterface, index) => (
          <div className="w-full h-full overflow-hidden" key={index}>
            <SlideComponent dir="up" triggerOnce>
              <TestomonialsCard
                testomonial={
                  locale === "ar"
                    ? testimonial.message_ar
                    : testimonial.message_en
                }
                name={testimonial.name}
                company={testimonial.company}
                userUrl={`${imagesPath}testimonials/${testimonial.image}`}
              />
            </SlideComponent>
          </div>
        ))}
      </div>
      <div className="testomonialsfadebg absolute bottom-0 left-0 right-0 w-full"></div>
    </div>
  );
}

export default Testomonials;

function TestomonialsCard({
  testomonial,
  name,
  userUrl,
  company,
}: {
  testomonial: string;
  name: string;
  userUrl: string;
  company: string;
}) {
  return (
    <div className="flex flex-col gap-5 bg-white aspect-video rounded-2xl p-4 shadow-md hover:shadow-lg duration-1000 border-2 border-graywhite">
      <p className="text-grayblack">
        {'"'}
        {testomonial}
        {'"'}
      </p>
      <div className="flex flex-row items-center gap-3 mt-auto">
        <img
          src={userUrl}
          className="rounded-full w-10 h-10"
          alt="user image"
        />
        <div className="flex flex-col ">
          <span className="text-grayblack capitalize font-medium text-lg">
            {name}
          </span>
          <span className="text-gray-500 capitalize">{company}</span>
        </div>
      </div>
    </div>
  );
}

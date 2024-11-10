"use client";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SlideComponent from "../reavelAnimation/slideComponent";
import { blogsInterface } from "@/interfaces/clientInterface";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { formatDate } from "@/utility/generic";
import { imagesPath } from "@/constants/urls";
import { useRouter } from "next/navigation";

function BlogSection({ blogs }: { blogs: blogsInterface[] }) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  const t = useTranslations("blogs");

  return (
    <div className="flex relative flex-col overflow-hidden w-full h-full px-0 sm:px-5 lg:px-8 lg:pb-14 pb-4 sm:pb-10 lg:gap-10 gap-5">
      <div className="flex flex-col items-center gap-3 minibg">
        <SlideComponent dir="down">
          <h4 className="text-grayblack md:text-xl font-medium">
            {t("blogs")}
          </h4>
        </SlideComponent>

        <h3 className="lg:text-4xl md:text-2xl text-xl font-medium capitalize text-center text-gray-500">
          <SlideComponent dir="right">{t("shared_experiance")}</SlideComponent>
          <SlideComponent dir="left">{t("from_our_company")}</SlideComponent>
        </h3>
        <SlideComponent dir="up">
          <Link
            href={"/blogs"}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            {t("read_more")}
          </Link>
        </SlideComponent>
      </div>

      <div className="w-full h-full overflow-hidden">
        <Swiper
          className="mySwiper"
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1.25 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
            1440: { slidesPerView: 4.5 },
          }}
        >
          {blogs.map((blog: blogsInterface, index: number) => (
            <SwiperSlide key={index} className="w-full h-full overflow-hidden">
              <BlogCard
                blogId={blog.id}
                index={index}
                blogImgUrl={`${imagesPath}blogs/${blog.image}`}
                title={locale === "ar" ? blog.title_ar : blog.title_en}
                describition={
                  locale === "ar" ? blog.description_ar : blog.description_en
                }
                date={`${t("added")} ${formatDate(blog.created_at)}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BlogSection;

function BlogCard({
  blogId,
  blogImgUrl,
  title,
  describition,
  date,
  index,
}: {
  blogId: number;
  blogImgUrl: string;
  title: string;
  describition: string;
  date: string;
  index: number;
}) {
  const router = useRouter();

  return (
    <SlideComponent delay={index * 100} dir="down">
      <div
        onClick={() => router.push(`/client/blogs/${blogId}`)}
        className="w-full h-full flex flex-col gap-2 cursor-pointer"
      >
        <img
          src={blogImgUrl}
          className="aspect-video w-full border-2 border-white rounded-lg shadow-md hover:shadow-lg duration-1000 object-cover"
          alt="blog thumbnail"
        />
        <h5 className="text-grayblack text-2xl font-medium">{title}</h5>
        <h5 className="text-gray-500 text-base">{describition}</h5>
        <span className="text-grayblack text-sm font-medium">{date}</span>
      </div>
    </SlideComponent>
  );
}

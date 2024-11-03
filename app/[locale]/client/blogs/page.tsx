import AboutusVideoSection from "@/customComponents/aboutUsComponent/aboutusVideoSection";
import MainBlogCard from "@/customComponents/blogComponents/mainBlogCard";
import { blogsInterface } from "@/interfaces/clientInterface";
import { getBlogs } from "@/requests/generic/getBlogs";
import React from "react";

async function page() {
  const blogsRes = await getBlogs();
  console.log(blogsRes);
  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10">
      <AboutusVideoSection
        title1="articles"
        title2="stories and news"
        descriptionEn="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        descriptionAr="اكتشف كنز من المواد المهنية المصممة بعناية لتقديم لك معرفة كاملة عن أحدث الاتجاهات."
      />
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center">
        {blogsRes?.data.map((blog: blogsInterface, index: number) => (
          <MainBlogCard blog={blog} key={index} />
        ))}
      </div>
    </div>
  );
}

export default page;

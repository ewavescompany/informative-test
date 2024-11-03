import BlogHeader from "@/customComponents/blogComponents/blogHeader";
import RelatedBlogs from "@/customComponents/blogComponents/relatedBlogs";
import React from "react";
import { fetchBlogById } from "@/requests/generic/fetchBlogById";

export default async function page({ params }: { params: { id: string } }) {
  const blog = await fetchBlogById(params.id);
  console.log(blog);
  return (
    <div className="min-h-screen w-full h-full flex flex-col gap-10 pt-20 bg">
      <div className="w-full h-full px-8 sm:px-20 py-4 sm:py-10 md:py-24 flex flex-col gap-10 items-center justify-center ">
        <div className="w-full h-full flex flex-col gap-10 xl:max-w-5xl lg:max-w-3xl max-w-full">
          <BlogHeader blog={blog} />
          <RelatedBlogs />
        </div>
      </div>
    </div>
  );
}

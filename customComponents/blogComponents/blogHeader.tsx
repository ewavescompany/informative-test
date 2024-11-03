import React from "react";
import "react-quill/dist/quill.snow.css";
import { blogsInterface } from "@/interfaces/clientInterface";
import Cookies from "js-cookie";
import { formatDateForPortfolio } from "@/utility/generic";
import { imagesPath } from "@/constants/urls";
function BlogHeader({ blog }: { blog: blogsInterface }) {
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <span className="text-gray-500 uppercase font-medium text-sm">
        {locale === "en" ? blog.tags_en : blog.tags_ar}
      </span>
      <h4 className="text-grayblack xl:text-5xl lg:text-4xl text-3xl font-bold">
        {locale === "en" ? blog.title_en : blog.title_ar}
      </h4>
      <div className="w-fit flex flex-row gap-5 items-center justify-center font-medium">
        <h5>{formatDateForPortfolio(blog.created_at)}</h5>
      </div>
      <div className="w-full h-full overflow-hidden rounded-2xl max-h-[60vh]">
        <img
          src={`${imagesPath}blogs/${blog.image}`}
          alt="blog img"
          className="hover:scale-125 duration-500 object-cover w-full h-full"
        />
      </div>
      <p className=" font-medium">
        {locale === "en" ? blog.description_en : blog.description_ar}
      </p>
      <div
        className="w-full h-full ql-editor"
        dangerouslySetInnerHTML={{
          __html: locale === "en" ? blog.content_en : blog.content_ar,
        }}
      />
    </div>
  );
}

export default BlogHeader;

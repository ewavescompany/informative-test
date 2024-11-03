import React from "react";
import RelatedBlogCard from "./relatedBlogCard";

function RelatedBlogs() {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h4 className="text-3xl font-medium">Related Blogs</h4>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <RelatedBlogCard />
        <RelatedBlogCard />
        <RelatedBlogCard />
      </div>
    </div>
  );
}

export default RelatedBlogs;

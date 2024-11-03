import React from "react";
import Image from "next/image";
import imgUrl from "../../public/services/service1.jpg";
function RelatedBlogCard() {
  return (
    <div className="w-full h-full flex flex-col gap-3 xl:max-w-5xl lg:max-w-3xl max-w-full">
      <div className="w-full h-full overflow-hidden rounded-2xl max-h-[60vh]">
        <Image
          src={imgUrl}
          alt="blog img"
          className="hover:scale-125 duration-500 object-cover"
        />
      </div>
      <span className="text-gray-500 uppercase font-medium text-sm">
        marketing, technology
      </span>
      <h4 className="text-grayblack text-xl font-bold">
        A quick guide to picking the right branding agency for your rebrand
      </h4>
      <div className="w-fit flex flex-row gap-5 items-center justify-center font-medium text-sm">
        <h5>August 21, 2023</h5>
        <h5>Luke Jacobs</h5>
      </div>
      <p className="text-gray-500">
        When evaluating potential agencies, consider their expertise in various
        aspects of branding and design.
      </p>
    </div>
  );
}

export default RelatedBlogCard;

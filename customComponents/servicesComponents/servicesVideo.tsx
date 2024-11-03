import React from "react";

import ServicesSwiper from "./servicesSwiper";
function ServicesVideo() {
  return (
    <div className="w-full h-screen relative  gap-3">
      <video
        className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 z-[-1] blur-[3px]"
        loop
        muted
        autoPlay
        src={"services/servicesVideo.mp4"}
      />
      <div className="object-cover w-full h-full absolute top bottom-0 left-0 right-0 bg-grayblack/80"></div>

      <ServicesSwiper />
    </div>
  );
}

export default ServicesVideo;

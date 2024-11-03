"use client";
import Image from "next/image";
import React from "react";
import bgUrl from "../../public/Services-How-BG.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { imagesPath } from "@/constants/urls";
import { PortfolioImages } from "@/interfaces/dashboardInterface";
interface PortfolioGallaryProps {
  images: PortfolioImages[];
}
function PortfolioGallary({ images }: PortfolioGallaryProps) {
  return (
    <div className="w-full h-full xl:min-h-[80vh] lg:min-h-[50vh] md:min-h-[40vh] min-h-[30vh] bg-grayblack relative flex">
      <Image
        className="w-full h-full absolute object-cover top-0 bottom-0 left-0 right-0"
        alt="mission"
        src={bgUrl}
      />
      <Swiper
        className="mySwiper w-full absolute top-0 bottom-0 right-0 left-0 z-[2] h-[80%] my-auto"
        modules={[Autoplay]}
        centeredSlides={true}
        autoplay={{ delay: 3000 }} // Set a delay of 3 seconds
        loop={true} // Enable looping of slides
        slidesPerView={3}
        spaceBetween={30}
      >
        {images.map((image: PortfolioImages, index: number) => (
          <SwiperSlide key={index} className="w-full h-full">
            <img
              className="w-full h-full aspect-square rounded-2xl object-cover"
              alt="mission"
              src={`${imagesPath}portfolios/slider/${image.image}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PortfolioGallary;

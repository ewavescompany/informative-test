"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SlideComponent from "../reavelAnimation/slideComponent";
import Image from "next/image";
import imgUrl from "../../public/asterisk.png";
function ServicesSwiper() {
  return (
    <Swiper
      className="mySwiper w-full h-full min-h-screen absolute top-0 bottom-0 right-0 left-0"
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{ delay: 5000 }} // Set a delay of 3 seconds
      loop={true} // Enable looping of slides
    >
      <Image
        src={imgUrl}
        width={200}
        height={200}
        alt="astics"
        className="animate-spin z-[3] absolute duration-[8000] top-24 right-0"
      />
      <Image
        src={imgUrl}
        width={100}
        height={100}
        alt="astics"
        className="animate-spin z-[3] absolute duration-[8000] bottom-0 left-0"
      />
      <SwiperSlide className="w-full h-full min-h-screen relative">
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full h-full">
          <div className="flex flex-col items-center justify-center py-8 sm:py-auto px-8 sm:px-20 z-[3]">
            <h1 className="lg:text-left text-center w-fit my-auto flex flex-col justify-center gap-3 md:text-3xl xl:text-8xl lg:text-6xl text-2xl font-semibold text-graywhite h-fit overflow-hidden">
              <SlideComponent dir="down">
                <span>Software development</span>
              </SlideComponent>
              <SlideComponent dir="up">
                <span className="ml-auto">Services</span>
              </SlideComponent>
              <div className="lg:hidden block">
                <SlideComponent dir="up">
                  <h5 className="font-medium text-graywhite xl:text-lg md:text-base text-sm ">
                    At eWaves, we specialize in AI, web, and mobile development,
                    delivering innovative software solutions that drive business
                    growth. Our focus is on leveraging cutting-edge technology
                    to enhance digital presence and streamline marketing
                    strategies. We’re committed to helping businesses transform
                    through smart, data-driven solutions tailored to their
                    needs.
                  </h5>
                </SlideComponent>
              </div>
            </h1>
          </div>
          <div className="w-full h-full lg:flex hidden flex-col items-end justify-end py-8 sm:py-20 px-8 sm:px-20 z-[3] overflow-hidden">
            <SlideComponent dir="up">
              <h5 className="font-medium text-graywhite xl:text-lg md:text-base text-sm ">
                At eWaves, we specialize in AI, web, and mobile development,
                delivering innovative software solutions that drive business
                growth. Our focus is on leveraging cutting-edge technology to
                enhance digital presence and streamline marketing strategies.
                We’re committed to helping businesses transform through smart,
                data-driven solutions tailored to their needs.
              </h5>
            </SlideComponent>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="w-full h-full min-h-screen">
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full h-full">
          <div className="flex flex-col items-center justify-center py-8 sm:py-auto px-8 sm:px-20 z-[3]">
            <h1 className="lg:text-left text-center w-fit my-auto flex flex-col justify-center gap-3 md:text-3xl xl:text-8xl lg:text-6xl text-2xl font-semibold text-graywhite h-fit overflow-hidden">
              <SlideComponent dir="down">
                <span>Software development</span>
              </SlideComponent>
              <SlideComponent dir="up">
                <span className="ml-auto">Services</span>
              </SlideComponent>
              <div className="lg:hidden block">
                <SlideComponent dir="up">
                  <h5 className="font-medium text-graywhite xl:text-lg md:text-base text-sm ">
                    At eWaves, we specialize in AI, web, and mobile development,
                    delivering innovative software solutions that drive business
                    growth. Our focus is on leveraging cutting-edge technology
                    to enhance digital presence and streamline marketing
                    strategies. We’re committed to helping businesses transform
                    through smart, data-driven solutions tailored to their
                    needs.
                  </h5>
                </SlideComponent>
              </div>
            </h1>
          </div>
          <div className="w-full h-full lg:flex hidden flex-col items-end justify-end py-8 sm:py-20 px-8 sm:px-20 z-[3] overflow-hidden">
            <SlideComponent dir="up">
              <h5 className="font-medium text-graywhite xl:text-lg md:text-base text-sm ">
                At eWaves, we specialize in AI, web, and mobile development,
                delivering innovative software solutions that drive business
                growth. Our focus is on leveraging cutting-edge technology to
                enhance digital presence and streamline marketing strategies.
                We’re committed to helping businesses transform through smart,
                data-driven solutions tailored to their needs.
              </h5>
            </SlideComponent>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="w-full h-full min-h-screen">
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full h-full">
          <div className="flex flex-col items-center justify-center py-8 sm:py-auto px-8 sm:px-20 z-[3]">
            <h1 className="lg:text-left text-center w-fit my-auto flex flex-col justify-center gap-3 md:text-3xl xl:text-8xl lg:text-6xl text-2xl font-semibold text-graywhite h-fit overflow-hidden">
              <SlideComponent dir="down">
                <span>Software development</span>
              </SlideComponent>
              <SlideComponent dir="up">
                <span className="ml-auto">Services</span>
              </SlideComponent>
              <div className="lg:hidden block">
                <SlideComponent dir="up">
                  <h5 className="font-medium text-graywhite xl:text-lg md:text-base text-sm ">
                    At eWaves, we specialize in AI, web, and mobile development,
                    delivering innovative software solutions that drive business
                    growth. Our focus is on leveraging cutting-edge technology
                    to enhance digital presence and streamline marketing
                    strategies. We’re committed to helping businesses transform
                    through smart, data-driven solutions tailored to their
                    needs.
                  </h5>
                </SlideComponent>
              </div>
            </h1>
          </div>
          <div className="w-full h-full lg:flex hidden flex-col items-end justify-end py-8 sm:py-20 px-8 sm:px-20 z-[3] overflow-hidden">
            <SlideComponent dir="up">
              <h5 className="font-medium text-graywhite xl:text-lg md:text-base text-sm ">
                At eWaves, we specialize in AI, web, and mobile development,
                delivering innovative software solutions that drive business
                growth. Our focus is on leveraging cutting-edge technology to
                enhance digital presence and streamline marketing strategies.
                We’re committed to helping businesses transform through smart,
                data-driven solutions tailored to their needs.
              </h5>
            </SlideComponent>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default ServicesSwiper;

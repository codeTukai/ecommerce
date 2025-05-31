import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Button from "@mui/material/Button";

const HomeBannerV2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      modules={[EffectFade, Navigation, Pagination,Autoplay]}
      className="mySwiper"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden relative">
          <img
            src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-1.jpg"
            alt="Banner 1"
            className="w-full object-cover h-[400px] md:h-[500px]"
          />

          <div
            className={`info absolute top-0 ${
              activeIndex === 0
                ? "right-0 opacity-100"
                : "-right-[100%] opacity-0"
            } w-[50%] h-full z-50 p-8 flex items-center flex-col justify-center transition-all duration-700 bg-black/30 backdrop-blur-sm text-white`}
          >
            <h4 className="text-[18px] font-medium w-full text-left mb-3">
              Big Saving Days Sale
            </h4>
            <h2 className="text-[35px] font-bold w-full">
              Women Solid Round Yellow T-Shirt
            </h2>
            <h3 className="flex items-center gap-3 text-[18px] font-medium w-full text-left mt-3 mb-3">
              Starting At Only
              <span className="text-amber-600 text-[30px] font-bold">
                $59.00
              </span>
            </h3>
            <Button
              variant="contained"
              className="!bg-orange-500 hover:!bg-orange-600 text-white px-6 py-2 rounded-full transition duration-300 normal-case"
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden relative">
          <img
            src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-2.jpg"
            alt="Banner 2"
            className="w-full object-cover h-[400px] md:h-[500px]"
          />

          <div
            className={`info absolute top-0 ${
              activeIndex === 1
                ? "right-0 opacity-100"
                : "-right-[100%] opacity-0"
            } w-[50%] h-full z-50 p-8 flex items-center flex-col justify-center transition-all duration-700 bg-black/30 backdrop-blur-sm text-white`}
          >
            <h4 className="text-[18px] font-medium w-full text-left mb-3">
              Big Saving Days Sale
            </h4>
            <h2 className="text-[35px] font-bold w-full">
              Buy Modern Chair In Black Color
            </h2>
            <h3 className="flex items-center gap-3 text-[18px] font-medium w-full text-left mt-3 mb-3">
              Starting At Only
              <span className="text-amber-600 text-[30px] font-bold">
                $99.00
              </span>
            </h3>
            <Button
              variant="contained"
              className="!bg-orange-500 hover:!bg-orange-600 text-white px-6 py-2 rounded-full transition duration-300 normal-case"
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeBannerV2;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import BannerBoxV2 from "../BannerBoxV2";

const AdsBannerslider = ({ items = 3 }) => {
  const banners = [
    "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg",
    "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg",
    "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg",
    "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg",
    "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-1.jpg",
  ];

  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        modules={[Navigation]}
        navigation
        className="smlBtn"
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <BannerBoxV2 info="left" image={img} link="/" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsBannerslider;

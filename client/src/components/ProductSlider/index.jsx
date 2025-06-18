import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductItem from "../ProductItem";

const ProductSlider = ({ items = 5 }) => {
  const slides = Array.from({ length: items });

  return (
    <div className="ProductSlider py-3">
      <Swiper
        slidesPerView={items}
        spaceBetween={16}
        navigation
        modules={[Navigation]}
        className="mySwiper"
      >
        {slides.map((_, index) => (
          <SwiperSlide key={`product-slide-${index}`}>
            <ProductItem />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;

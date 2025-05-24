import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ProductItem from "../Productitem";

const ProductSLider = (props) => {
  return (
    <div className="ProductSlider py-3">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>

         <ProductItem/>

        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSLider;

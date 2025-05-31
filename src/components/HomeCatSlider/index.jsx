import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
  return (
    <>
      <div className="homeCatSlider pt-4 py-8">
        <div className="">
          <Swiper
            slidesPerView={8}
            spaceBetween={10} //10
            modules={[Navigation]}
            navigation={true}
            className="mySwiper"
          >
            <SwiperSlide>
              <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525218436_ele.png" className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Electronics</h3>
              </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png " className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110" />
                <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
              </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525239704_foot.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Footwear</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525231018_bag.png" className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110" />
                <h3 className="text-[15px] font-[500] mt-3">Bags</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525255799_beauty.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Beauty Product</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525286186_jw.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525286186_jw.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525286186_jw.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525286186_jw.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525286186_jw.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525286186_jw.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525286186_jw.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://api.spicezgold.com/download/file_1734525286186_jw.png"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
              </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeCatSlider;

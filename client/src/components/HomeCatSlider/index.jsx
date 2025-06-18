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
                <img src="https://th.bing.com/th/id/OIP.6J93ERgucxkp2eM7naG3MwHaE8?w=263&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Gadgets</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://th.bing.com/th/id/OIP.tUhLbyycyWWOgtsJWbJFcAHaHa?w=165&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Toys</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://th.bing.com/th?q=Football+Soccer+Ball&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.1&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Sports</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://th.bing.com/th?q=Iph+15+Pro+Max&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.1&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Mobiles</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://th.bing.com/th/id/OIP.dhXXHL6nn0k2ozc4pJTRHwHaLG?w=186&h=279&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Food</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="https://th.bing.com/th/id/OIP.0NN23B1UV1tUpdN6TXv6jgHaHa?w=175&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">Furniture</h3>
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
            <Link to="/">
              <div className="items py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col gap-4">
                <img src="data:image/webp;base64,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"  className="w-[60px] h-24 object-contain transition-transform duration-300 hover:scale-110"/>
                <h3 className="text-[15px] font-[500] mt-3">GenZ Trends</h3>
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

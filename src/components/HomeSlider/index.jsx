import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeSlider = () => {
  return (
    <div className="w-full h-screen">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        className="w-full h-full"
        onSlideChange={() => console.log('Slide changed')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img
            src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
        </SwiperSlide>
        
        
      </Swiper>
    </div>
  );
};

export default HomeSlider;

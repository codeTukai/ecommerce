import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeSlider = () => {
  return (
    <div className='homeSlider py-8'>
      <div className='container'>
      
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        className="w-full h-full"
        onSlideChange={() => console.log('Slide changed')}
        onSwiper={(swiper) => console.log(swiper)}
        

        
      >
        <SwiperSlide>
          <div className='item rounded-[20px] overflow-hidden'></div>
          <img
            src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
        <div className='item rounded-[20px] overflow-hidden'>
          <img
            src="https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='item rounded-[20px] overflow-hidden'>
          <img
            src="https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='item rounded-[20px] overflow-hidden'>
          <img
            src="https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='item rounded-[20px] overflow-hidden'>
          <img
            src="https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='item rounded-[20px] overflow-hidden'>
          <img
            src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='item rounded-[20px] overflow-hidden'>
          <img
            src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg" // Replace with high-quality image
            alt="Banner Slide"
            loading="eager"
            className="w-full  object-cover"
          />
          </div>
        </SwiperSlide>
        
        
      </Swiper>
    </div>
      </div>



    
  );
};

export default HomeSlider;

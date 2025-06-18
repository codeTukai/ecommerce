import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export const ProductZoom = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderSml = useRef(null);
  const zoomSliderBig = useRef(null);

  const goto = (index) => {
    setSlideIndex(index);
    if (zoomSliderBig.current && zoomSliderBig.current.swiper) {
      zoomSliderBig.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="flex gap-3">
      {/* Thumbnail Slider */}
      <div className="slider w-[15%]">
        <Swiper
          ref={zoomSliderSml}
          direction={"vertical"}
          slidesPerView={5}
          spaceBetween={10}
          modules={[Navigation]}
          navigation={true}
          className="zoomProductSliderThumbs h-[500px] overflow-hidden"
        >
          {[
            "https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg",
            "https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg",
            "https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
          ].map((src, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group ${
                  slideIndex === idx ? "opacity-100" : "opacity-30"
                }`}
                onClick={() => goto(idx)}
              >
                <img
                  src={src}
                  alt={`Thumb ${idx}`}
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Zoom View */}
      <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md">
        <Swiper
          ref={zoomSliderBig}
          slidesPerView={1}
          spaceBetween={0}
          navigation={false}
          onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
        >
          {[
            "https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg",
            "https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg",
            "https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
          ].map((src, idx) => (
            <SwiperSlide key={idx}>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1.5}
                src={src}
                alt={`Zoom Image ${idx}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

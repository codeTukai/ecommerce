import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    image: "https://api.spicezgold.com/download/file_1734525218436_ele.png",
  },
  {
    name: "Fashion",
    image: "https://api.spicezgold.com/download/file_1734525204708_fash.png",
  },
  {
    name: "Footwear",
    image: "https://api.spicezgold.com/download/file_1734525239704_foot.png",
  },
  {
    name: "Bags",
    image: "https://api.spicezgold.com/download/file_1734525231018_bag.png",
  },
  {
    name: "Beauty Product",
    image: "https://api.spicezgold.com/download/file_1734525255799_beauty.png",
  },
  {
    name: "Jewellery",
    image: "https://api.spicezgold.com/download/file_1734525286186_jw.png",
  },
  {
    name: "Gadgets",
    image:
      "https://th.bing.com/th/id/OIP.6J93ERgucxkp2eM7naG3MwHaE8?w=263&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
  },
  {
    name: "Toys",
    image:
      "https://th.bing.com/th/id/OIP.tUhLbyycyWWOgtsJWbJFcAHaHa?w=165&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
  },
  {
    name: "Sports",
    image:
      "https://th.bing.com/th?q=Football+Soccer+Ball&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.1&pid=InlineBlock",
  },
  {
    name: "Mobiles",
    image:
      "https://th.bing.com/th?q=Iph+15+Pro+Max&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.1&pid=InlineBlock",
  },
  {
    name: "Food",
    image:
      "https://th.bing.com/th/id/OIP.dhXXHL6nn0k2ozc4pJTRHwHaLG?w=186&h=279&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
  },
  {
    name: "Furniture",
    image:
      "https://th.bing.com/th/id/OIP.0NN23B1UV1tUpdN6TXv6jgHaHa?w=175&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
  },
];

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider py-8 bg-gray-50">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 8 },
        }}
        className="categorySwiper px-4"
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <Link to={`/products/category/${cat.name.toLowerCase()}`}>
              <div className="bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 text-center flex flex-col items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-[60px] h-[60px] object-contain mb-3 transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-sm font-medium text-gray-700">{cat.name}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCatSlider;

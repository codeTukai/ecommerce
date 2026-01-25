import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Button from "@mui/material/Button";

const HomeBannerV2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/homeSlides/getSlides", {
          credentials: "include", // needed if backend uses cookies
        });
        const data = await res.json();
        console.log("Banner API Response:", data);

        // ✅ Your response stores banners inside "data"
        setBanners(data?.data || []);
      } catch (err) {
        console.error("Banner fetch error", err);
      }
    };
    fetchBanners();
  }, []);

  return (
    <Swiper
      loop
      spaceBetween={30}
      effect="fade"
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className="mySwiper"
    >
      {banners.length > 0 ? (
        banners.map((item, index) => (
          <SwiperSlide key={item._id || index}>
            <div className="item w-full rounded-md overflow-hidden relative">
              <img
                src={
                  item?.images?.[0] && item.images[0].trim() !== ""
                    ? item.images[0]
                    : "/placeholder.jpg"
                }
                alt={item?.bannerTitleName || "Banner"}
                className="w-full object-cover h-[400px] md:h-[500px]"
              />

              <div
                className={`info absolute top-0 ${
                  activeIndex === index
                    ? "right-0 opacity-100"
                    : "-right-[100%] opacity-0"
                } w-[50%] h-full z-50 p-8 flex items-center flex-col justify-center transition-all duration-700 bg-black/30 backdrop-blur-sm text-white`}
              >
                <h4 className="text-[18px] font-medium w-full text-left mb-3">
                  {item?.bannerTitleName || "Big Saving Days Sale"}
                </h4>
                <h2 className="text-[35px] font-bold w-full">
                  {item?.title || "Amazing Product"}
                </h2>
                <h3 className="flex items-center gap-3 text-[18px] font-medium w-full text-left mt-3 mb-3">
                  Starting At Only
                  <span className="text-amber-600 text-[30px] font-bold">
                    {item?.price ? `$${item.price}` : "$0.00"}
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
        ))
      ) : (
        <SwiperSlide>
          <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-200 text-gray-500">
            No banners available
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default HomeBannerV2;




// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
// import Button from "@mui/material/Button";
// import { fetchDataFromApi } from "../../../../admin/src/utils/api";

// const HomeBannerV2 = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     fetchDataFromApi("/api/homeSlides").then((res)=>{
//       setHomeSlidesData(res?.data)
//     })
//     fetchDataFromApi("/api/product/getAllProducts").then((res)=>{
//       setAllProductsData(res?.products)
//     })

//     fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res)=>{
//       setFeaturedProducts(res?.products)
//     })
//   }, []);

//   return (
//     <Swiper
//       loop
//       spaceBetween={30}
//       effect="fade"
//       navigation
//       pagination={{ clickable: true }}
//       autoplay={{ delay: 3000, disableOnInteraction: false }}
//       onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//       modules={[EffectFade, Navigation, Pagination, Autoplay]}
//       className="mySwiper"
//     >
//       {banners.length > 0 ? (
//         banners.map((item, index) => (
//           <SwiperSlide key={item._id || index}>
//             <div className="item w-full rounded-md overflow-hidden relative">
//               <img
//                 src={
//                   item?.images?.[0] && item.images[0].trim() !== ""
//                     ? item.images[0]
//                     : "/placeholder.jpg"
//                 }
//                 alt={item?.bannerTitleName || "Banner"}
//                 className="w-full object-cover h-[400px] md:h-[500px]"
//               />

//               <div
//                 className={`info absolute top-0 ${
//                   activeIndex === index
//                     ? "right-0 opacity-100"
//                     : "-right-[100%] opacity-0"
//                 } w-[50%] h-full z-50 p-8 flex items-center flex-col justify-center transition-all duration-700 bg-black/30 backdrop-blur-sm text-white`}
//               >
//                 <h4 className="text-[18px] font-medium w-full text-left mb-3">
//                   {item?.bannerTitleName || "Big Saving Days Sale"}
//                 </h4>
//                 <h2 className="text-[35px] font-bold w-full">
//                   {item?.title || "Amazing Product"}
//                 </h2>
//                 <h3 className="flex items-center gap-3 text-[18px] font-medium w-full text-left mt-3 mb-3">
//                   Starting At Only
//                   <span className="text-amber-600 text-[30px] font-bold">
//                     {item?.price ? `$${item.price}` : "$0.00"}
//                   </span>
//                 </h3>
//                 <Button
//                   variant="contained"
//                   className="!bg-orange-500 hover:!bg-orange-600 text-white px-6 py-2 rounded-full transition duration-300 normal-case"
//                 >
//                   SHOP NOW
//                 </Button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))
//       ) : (
//         <SwiperSlide>
//           <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-200 text-gray-500">
//             No banners available
//           </div>
//         </SwiperSlide>
//       )}
//     </Swiper>
//   );
// };

// export default HomeBannerV2;


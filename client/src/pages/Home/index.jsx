import React from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomecatSlider";
import { FaShippingFast } from "react-icons/fa";
import AdsBannerslider from "../../components/AdsBannerSlider";
import AdsBannersliderV2 from "../../components/AdsBannersliderV2";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSLider from "../../components/ProductSlider"; // ✅ Typo accepted if file is named like this

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import BlogItem from "../../components/BlogItem";
import HomeBannerV2 from "../../components/HomeBannerV2";
import BannerBoxV2 from "../../components/BannerBoxV2";
// import ProductSLider from "../../components/ProductSlider"; // ✅ Typo accepted if file is named like this


const Home = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider/>
      <section className="py-6">
        <div className="container flex items-center">
          <div className="part1 w-[70%]">
            <HomeBannerV2/>
          </div>

          <div className="part2 w-[30%] flex items-center justify-between gap-4 flex-col">
            <BannerBoxV2 info="left" image={"https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"}/>
            <BannerBoxV2 info="right" image={"https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"}/>
          </div>
        </div>
      </section>

      {/* Category Slider */}
      <HomeCatSlider />

      {/* Popular Products Section */}
      <section className="bg-white py-8">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="leftSec">
              <h2 className="text-[20px] font-semibold">Popular Products</h2>
              <p className="text-[14px]">
                Do not miss the current offers until the end of March
              </p>
            </div>

            <div className="rightSec w-full md:w-[55%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#ff5252",
                  },
                }}
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Footwear" />
                <Tab label="Bags" />
                <Tab label="Beauty Product" />
                <Tab label="Jewelry" />
                <Tab label="Watches" /> {/* ✅ Changed duplicate */}
              </Tabs>
            </div>
          </div>

          <ProductSLider items={5} />
        </div>
      </section>

      {/* Free Shipping Section */}
      <section className="py-16 pt-2 bg-white">
        <div className="container">
          <div className="w-[90%] mx-auto py-4 px-6 border-2 border-[#8f2727] flex flex-col md:flex-row items-center justify-between rounded-md mb-7 gap-4">
            <div className="col1 flex items-center gap-4">
              <FaShippingFast className="text-[50px] text-[#8f2727]" />
              <span className="text-[20px] font-semibold uppercase">
                Free Shipping
              </span>
            </div>

            <div className="col2 text-center md:text-left flex-1">
              <p className="font-medium text-[16px]">
                Free Delivery Now On Your First Three Orders over $199
              </p>
            </div>

            <p className="font-bold text-[24px] text-[#8f2727]">- Only $199*</p>
          </div>

          <AdsBannersliderV2 items={4}/>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Latest Products</h2>
          <ProductSLider items={6} />
          <AdsBannerslider items={3} />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Featured Products</h2>
          <ProductSLider items={6} />
          <AdsBannerslider items={3} />
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-5 pb-8 pt-0 bg-white bigSection">
        <div className="container">
          <h2 className="text-[20px] font-semibold mb-4">From The Blog</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="blogSlider"
          >
            <SwiperSlide key="blog-1">
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide key="blog-2">
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide key="blog-3">
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide key="blog-4">
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      
      
    </>
  );
};

export default Home;

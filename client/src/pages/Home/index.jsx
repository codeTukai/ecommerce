import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomecatSlider";
import { FaShippingFast } from "react-icons/fa";
import AdsBannerslider from "../../components/AdsBannerSlider";
import AdsBannersliderV2 from "../../components/AdsBannersliderV2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSlider from "../../components/ProductSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BlogItem from "../../components/BlogItem";
import HomeBannerV2 from "../../components/HomeBannerV2";
import BannerBoxV2 from "../../components/BannerBoxV2";
import ProductLoading from "../../components/productLoading";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";

const Home = () => {
  const { catData } = useContext(MyContext);

  const [value, setValue] = useState(0);
  const [productsByTab, setProductsByTab] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [allProductsData, setAllProductsData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (catData?.[newValue]) {
      filterByCatId(catData[newValue]);
    }
  };

  const filterByCatId = async (category) => {
    if (!category || productsByTab[category._id]) return;

    try {
      setLoadingProducts(true);
      const res = await fetch(
        `/api/product/getProductsByCategory?name=${category.name}`
      );
      const data = await res.json();
      setProductsByTab((prev) => ({
        ...prev,
        [category._id]: data.products || [],
      }));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    if (catData?.length) {
      filterByCatId(catData[0]); // load first tab products
    }

    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data || []);
    });

    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setAllProductsData(res?.products || []);
    });

    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setFeaturedProducts(res?.products || []);
    });
  }, [catData]);

  return (
    <>
      <HomeSlider slides={homeSlidesData} />

      {/* Category Slider */}
      <HomeCatSlider />

      {/* Popular Products */}
      <section className="bg-white py-8">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-[20px] font-semibold">Popular Products</h2>
              <p className="text-[14px]">
                Do not miss the current offers until the end of March
              </p>
            </div>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ "& .MuiTabs-indicator": { backgroundColor: "#ff5252" } }}
            >
              {catData?.map((cat) => (
                <Tab key={cat._id} label={cat.name} />
              ))}
            </Tabs>
          </div>

          {loadingProducts ? (
            <ProductLoading count={5} />
          ) : (
            <ProductSlider
              items={5}
              data={productsByTab[catData?.[value]?._id] || []}
            />
          )}
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-6">
        <div className="container flex items-center gap-4">
          <div className="part1 w-[70%]">
            <HomeBannerV2 />
          </div>
          <div className="part2 w-[30%] flex flex-col gap-6">
            <BannerBoxV2
              info="left"
              image="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
            />
            <BannerBoxV2
              info="right"
              image="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"
            />
          </div>
        </div>
      </section>

      {/* Free Shipping */}
      <section className="py-16 pt-2 bg-white">
        <div className="container">
          <div className="w-[90%] mx-auto py-4 px-6 border-2 border-[#8f2727] flex flex-col md:flex-row items-center justify-between rounded-md mb-7 gap-4">
            <div className="flex items-center gap-4">
              <FaShippingFast className="text-[50px] text-[#8f2727]" />
              <span className="text-[20px] font-semibold uppercase">
                Free Shipping
              </span>
            </div>
            <p className="font-medium text-[16px] text-center md:text-left flex-1">
              Free Delivery Now On Your First Three Orders over $199
            </p>
            <p className="font-bold text-[24px] text-[#8f2727]">- Only $199*</p>
          </div>
          <AdsBannersliderV2 items={4} />
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Latest Products</h2>
          {allProductsData.length === 0 ? (
            <ProductLoading count={6} />
          ) : (
            <ProductSlider items={6} data={allProductsData} />
          )}
          <AdsBannerslider items={3} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Featured Products</h2>
          {featuredProducts.length === 0 ? (
            <ProductLoading count={6} />
          ) : (
            <ProductSlider items={6} data={featuredProducts} />
          )}
          <AdsBannerslider items={3} />
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-5 pb-8 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold mb-4">From The Blog</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="blogSlider"
          >
            {[1, 2, 3, 4].map((i) => (
              <SwiperSlide key={`blog-${i}`}>
                <BlogItem />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Home;

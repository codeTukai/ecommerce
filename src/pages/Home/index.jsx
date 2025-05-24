import React from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomecatSlider";
import { FaShippingFast } from "react-icons/fa";
import AdsBannerslider from "../../components/AdsBannerSlider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSLider from "../../components/ProductSlider";

const Home = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />
      <HomeCatSlider />

      {/* Popular Products Section */}
      <section className="bg-white py-8">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="leftSec">
              <h3 className="text-[20px] font-semibold">Popular Products</h3>
              <p className="text-[14px]">Do not miss the current offers until the end of March</p>
            </div>

            <div className="rightSec w-full md:w-[55%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#ff5252',
                  },
                }}
              >
                <Tab label="Electronics" />
                <Tab label="Fashion" />
                <Tab label="Footwear" />
                <Tab label="Bags" />
                <Tab label="Beauty Product" />
                <Tab label="Jewellery" />
                <Tab label="Jewellery" />
               
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Free Shipping Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="w-[90%] mx-auto py-4 px-6 border-2 border-[#8f2727] flex flex-col md:flex-row items-center justify-between rounded-md mb-7 gap-4">
            <div className="col1 flex items-center gap-4">
              <FaShippingFast className="text-[50px] text-[#8f2727]" />
              <span className="text-[20px] font-semibold uppercase">Free Shipping</span>
            </div>

            <div className="col2 text-center md:text-left flex-1">
              <p className="font-medium text-[16px]">
                Free Delivery Now On Your First Three Orders over $199
              </p>
            </div>

            <p className="font-bold text-[24px] text-[#8f2727]">- Only $199*</p>
          </div>

          <AdsBannerslider items={4} />

          <ProductSLider items={5}/>
        </div>
      </section>
    </>
  );
};

export default Home;

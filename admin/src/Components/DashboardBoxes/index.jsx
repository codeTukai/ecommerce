import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FiGift } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";
import { HiOutlineChartPie } from "react-icons/hi";
import { BsBank } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";


const DashBoardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-5">
            <FiGift className="text-[40px] text-[#3872fa]"/>
            <div className="info w-[80%]">
              <h3>New Orders</h3>
              <b>1,390</b>
            </div>
            <IoStatsChart className="text-[50px] text-[#3872fa]"/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-5">
            <HiOutlineChartPie className="text-[40px] text-[#10b981]" />
            <div className="info w-[70%] ">
              <h3>Sales</h3>
              <b>$57,890</b>
            </div>
            <IoStatsChart className="text-[50px] text-[#10b981]"/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-5">
            <BsBank  className="text-[40px] text-[#7928ca]"/>
            <div className="info w-[70%] ">
              <h3>Revenue</h3>
              <b>12,990</b>
            </div>
            <IoStatsChart className="text-[50px] text-[#7928ca]"/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-5">
            <IoBagCheckOutline className="text-[40px] text-[#3872fa]" />
            <div className="info w-[70%] ">
              <h3>Total Products</h3>
              <b>1,390</b>
            </div>
            <IoStatsChart className="text-[50px] text-blue-600"/>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default DashBoardBoxes;

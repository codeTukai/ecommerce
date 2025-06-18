import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = ({ image, info = "left" }) => {
  return (
    <div className="bannerBoxV2 group w-full rounded-md overflow-hidden relative">
      <img
        src={image}
        alt="Banner"
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
      />

      <div
        className={`info absolute p-5 top-0 ${
          info === "left" ? "left-0 items-start text-left" : "right-0 items-end text-right"
        } w-[70%] h-full z-50 flex justify-center flex-col gap-2 bg-black/30 backdrop-blur-sm text-white`}
      >
        <h2 className="text-[18px] font-semibold">Samsung Gear VR Camera</h2>
        <span className="text-[20px] text-amber-500 font-semibold">$129.00</span>

        <div>
          <Link
            to="/"
            className="text-[16px] font-semibold underline hover:text-orange-500 transition duration-300"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;

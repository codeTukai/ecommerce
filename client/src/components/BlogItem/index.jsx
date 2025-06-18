import React from 'react';
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

const BlogItem = () => {
  return (
    <div className="blogItem group">
      {/* Image Section */}
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src="https://th.bing.com/th/id/OIP.WOY_4V6Z3t27HFBG-QvcvwHaFj?cb=iwc2&pid=ImgDet&w=181&h=135&c=7&dpr=1.1"
          className="w-full transition-all duration-300 group-hover:scale-105 group-hover:rotate-1"
          alt="blog image"
        />
        <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 text-[12px] font-[500] gap-1">
          <IoMdTime className="text-[16px]" />
          5 APRIL, 2025
        </span>
      </div>

      {/* Info Section */}
      <div className="info py-4">
        <h2 className="text-[15px] font-[600] text-black">
          <Link to="/" className="link">
            Nullam ullamcorper ornare molestie
          </Link>
        </h2>
        <p className="text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry....
        </p>

        {/* ✅ Fixed from <link> to <Link> */}
        <Link to="/" className="link font-[500] text-[14px] flex items-center gap-1 text-primary hover:underline">
          Read More <MdArrowForwardIos />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;

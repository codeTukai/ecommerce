import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";
import Rating from "@mui/material/Rating";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "@mui/material";

const MyListItems = (Props) => {


  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[15%] rounded-md overflow-hidden">
        <Link to="/product/7845" className="group">
          <img
            src="https://api.spicezgold.com/download/file_1734527564399_fytona-medium-laptop-backpack-light-weight-for-school-collage-office-tuition-and-picnic-waterproof-backpack-grey-25-l-product-images-rvyoumccae-0-202402141853.jpg"
            className="w-full group-hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <div className="info w-[85%] relative">
        <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all" />
        <span className="text-[13px]">Sangria</span>
        <h3 className="text-[15px]">
          <Link className="link">A-Line Kurti With Sharara & Dupatta</Link>
        </h3>

        <Rating name="size-small" defaultValue={4} size="small" readOnly />

       

        <div className="flex items-center gap-4 mt-2 g-2">
          <span className="price text-black text-[14px] font-[600]">
            $58.00
          </span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            $58.00
          </span>

          <span className="price text-primary text-[14px] font-[600]">
            55% OFF
          </span>
        </div>
        
        

        <Button className="btn-org btn-small">Add to Cart</Button>

      </div>
    </div>
  );
};

export default MyListItems;

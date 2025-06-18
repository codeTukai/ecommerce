import React, { useState } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { QtyBox } from "../QtyBox";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoGitCompare } from "react-icons/go";

const ProductDetailsComponent = () => {
  const [productActionIndex, setProductActionIndex] = useState(null);

  const sizes = ["S", "M", "L", "XL"];

  return (
    <section>
      <h1 className="text-[24px] font-[600] mb-2">
        Siril Poly Silk White & Beige Color Saree With Blouse Piece | Sarees for Women
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-[13px]">
          Brand: <span className="font-[500] text-black opacity-75">House of Chikankari</span>
        </span>

        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <span className="text-[13px] cursor-pointer">Review (5)</span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="line-through text-gray-500 text-[20px] font-[500]">$58.00</span>
        <span className="text-primary text-[20px] font-[600]">$58.00</span>
        <span className="text-[14px]">
          Available in stock: <span className="text-green-600 font-bold">147 Items</span>
        </span>
      </div>

      <p className="mt-3 pr-10 mb-5 text-sm text-gray-700">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1000s...
      </p>

      <div className="flex items-center gap-3">
        <span className="text-[16px]">Size:</span>
        <div className="flex items-center gap-1">
          {sizes.map((size, index) => (
            <Button
              key={size}
              className={`${productActionIndex === index ? "!bg-primary !text-white" : ""}`}
              onClick={() => setProductActionIndex(index)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-[14px] mt-5 mb-2 text-[#000]">
        Free Shipping (Est. Delivery Time 2-3 Days)
      </p>

      <div className="flex items-center gap-4 py-4">
        <div className="qtyBoxWrapper w-[70px]">
          <QtyBox />
        </div>

        <Button className="btn-org flex gap-2">
          <MdOutlineShoppingCart className="text-[22px]" /> Add to Cart
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 text-[15px] font-[500] cursor-pointer">
          <FaRegHeart className="text-[18px]" />
          Add to Wishlist
        </span>
        <span className="flex items-center gap-2 text-[15px] font-[500] cursor-pointer">
          <GoGitCompare className="text-[18px]" />
          Add to Compare
        </span>
      </div>
    </section>
  );
};

export default ProductDetailsComponent;

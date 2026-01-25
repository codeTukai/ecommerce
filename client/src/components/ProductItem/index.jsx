import React, { useContext } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { ProductModalContext } from "../../App";

const ProductItem = ({
  _id,
  name,
  brand,
  images = [],
  price,
  originalPrice,
  rating = 4,
  discount = 0,
}) => {
  const { setOpenProductDetailsModal } = useContext(ProductModalContext);

  return (
    <div className="productItem rounded-md overflow-hidden border border-black/10">
      <div className="group imgWrapper w-full h-[220px] overflow-hidden rounded-md relative">
        <Link to={`/product/${_id}`} className="block w-full h-full relative">
          <img
            src={images?.[1] || images?.[0] || "/placeholder.jpg"}
            className="w-full h-full object-cover transition-all duration-700"
            alt="Main Product"
          />
          <img
            src={images?.[0] || "/placeholder.jpg"}
            className="w-full h-full object-cover absolute top-0 left-0 opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700"
            alt="Hover Product"
          />
        </Link>

        {discount > 0 && (
          <span className="discount absolute top-2 left-2 z-50 bg-red-500 text-white rounded-lg px-2 py-[2px] text-xs font-medium">
            {discount}%
          </span>
        )}

        {/* Hover Icons */}
        <div className="actions absolute top-2 right-2 z-50 flex items-center gap-2 flex-col w-[50px] opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Tooltip title="Zoom" placement="left">
            <div
              onClick={() => setOpenProductDetailsModal(true)}
              className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <MdOutlineZoomOutMap className="text-[18px]" />
            </div>
          </Tooltip>

          <Tooltip title="Compare" placement="left">
            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
              <GoGitCompare className="text-[18px]" />
            </div>
          </Tooltip>

          <Tooltip title="Wishlist" placement="left">
            <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
              <FaRegHeart className="text-[18px]" />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="info p-4 bg-[#f1f1f1]">
        <h6 className="text-[15px] font-[400] text-gray-600">
          <Link to={`/product/${_id}`} className="hover:text-blue-600 transition-all">
            {brand || "Unknown Brand"}
          </Link>
        </h6>
        <h3 className="text-sm font-medium mt-1 mb-2 text-black line-clamp-2">
          <Link to={`/product/${_id}`} className="hover:text-blue-700 transition-all">
            {name}
          </Link>
        </h3>
        <Rating name="size-small" value={rating} size="small" readOnly />
        <div className="flex items-center gap-3 mt-2">
          {originalPrice && (
            <span className="line-through text-gray-500 text-sm font-medium">
              ₹{599}
            </span>
          )}
          <span className="text-red-500 font-semibold text-sm">₹{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

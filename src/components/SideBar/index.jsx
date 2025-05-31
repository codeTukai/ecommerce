import React, { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "../Sidebar/style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { FaAngleUp } from "react-icons/fa";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from "@mui/material/Rating";

export const Sidebar = () => {


  const [isOpenCategoryFilter, SetIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, SetIsOpenAvailFilter] = useState(true);
  const [isOpenSizeFilter, SetIsOpenSizeFilter] = useState(true);
  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Shop by Category
          <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]" onClick={() => SetIsOpenCategoryFilter(!isOpenCategoryFilter)}>
            {
              isOpenCategoryFilter == true ? <FaAngleUp /> : <FaAngleDown />
            }


          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel control={<Checkbox size="small" />} label="fashion" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Electronics" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Bags" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Footwear" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Groceries" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Beauty" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="wellness" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Jewellery" className="w-full" />
          </div>
        </Collapse>
      </div>



      <div className="box">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Availability
          <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]" onClick={() => SetIsOpenAvailFilter(!isOpenAvailFilter)}>
            {
              isOpenAvailFilter == true ? <FaAngleUp /> : <FaAngleDown />
            }


          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel control={<Checkbox size="small" />} label="Available (17)" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="In stock (10)" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Not available (9)" className="w-full" />

          </div>
        </Collapse>
      </div>


      <div className="box mt-3">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Size
          <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]" onClick={() => SetIsOpenSizeFilter(!isOpenSizeFilter)}>
            {
              isOpenSizeFilter == true ? <FaAngleUp /> : <FaAngleDown />
            }


          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel control={<Checkbox size="small" />} label="Small (7)" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Medium (3)" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="Large (11)" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="XL (8)" className="w-full" />
            <FormControlLabel control={<Checkbox size="small" />} label="XXL (12)" className="w-full" />

          </div>
        </Collapse>
      </div>


      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Filter by Price
        </h3>
        <RangeSlider />

        <div className="d-flex pt-2 pb-2 priceRange">
          <span className="text-[13px]">
            Form: <strong className="text-dark">Rs: {100}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            Form: <strong className="text-dark">Rs: {5000}</strong>
          </span>
        </div>
      </div>


      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Filter by Rating
        </h3>
        <div className="w-full">
         <Rating name="product-rating" defaultValue={5} size="small" readOnly />
        </div>
        <div className="w-full">
          <Rating name="product-rating" defaultValue={4} size="small" readOnly />
        </div>
        <div className="w-full">
          <Rating name="product-rating" defaultValue={3} size="small" readOnly />
        </div>
        <div className="w-full">
          <Rating name="product-rating" defaultValue={2} size="small" readOnly />
        </div>
        <div className="w-full">
         <Rating name="product-rating" defaultValue={1} size="small" readOnly />
        </div>



      </div>
    </aside>
  );
};
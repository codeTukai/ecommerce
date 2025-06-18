import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdDashboard, MdOutlineAddHomeWork } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";
import { TbCategory2 } from "react-icons/tb";
import { FaFirstOrder, FaAngleDown } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Collapse } from "react-collapse";
import { MyContext } from "../../App";

const Sidebar = () => {
  const [openHomeSlides, setOpenHomeSlides] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const context = useContext(MyContext);

  return (
    <div className="sidebar fixed top-0 left-0 bg-white h-full border-r border-[rgba(0,0,0,0.1)] py-1 px-1 overflow-y-auto">
      {/* Logo */}
      <div className="py-2 w-full flex justify-start">
        <Link to={"/"}>
          <img src="pattern.jpg" className="w-[130px]" alt="logo" />
        </Link>
      </div>

      {/* Navigation */}
      <ul className="mt-2 space-y-1">
        <li>
          <Link to="/">
            <Button className="w-full !capitalize !justify-start flex gap-3 !py-2 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] hover:bg-[#f1f1f1]">
              <MdDashboard className="text-[18px]" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </li>

        {/* Home Slides */}
        <li>
          <Button
            onClick={() => setOpenHomeSlides(!openHomeSlides)}
            className="w-full !capitalize !justify-start flex gap-3 !py-2 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] hover:bg-[#f1f1f1]"
          >
            <MdOutlineAddHomeWork className="text-[18px]" />
            <span>Home Slides</span>
            <span
              className="ml-auto w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300"
              style={{
                transform: openHomeSlides ? "rotate(180deg)" : "rotate(0)",
              }}
            >
              <FaAngleDown />
            </span>
          </Button>
          <Collapse isOpened={openHomeSlides}>
            <ul className="ml-6 mt-1">
             <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3"
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add Home Slide",
                    })
                  }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                  Add Home Slide
                </Button>
              </li>
                 <li className="w-full">

                <Link to={"/homeSlider/list"}>
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3"  
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                  Home Slider List
                </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        {/* Users */}
        <li>
          <Link to="/users">
            <Button className="w-full !capitalize !justify-start flex gap-3 !py-2 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] hover:bg-[#f1f1f1]">
              <LuUsers className="text-[20px]" />
              <span>Users</span>
            </Button>
          </Link>
        </li>

        {/* Products */}
        <li>
          <Button
            onClick={() => setOpenProducts(!openProducts)}
            className="w-full !capitalize !justify-start flex gap-3 !py-2 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] hover:bg-[#f1f1f1]"
          >
            <AiOutlineProduct className="text-[20px]" />
            <span>Products</span>
            <span
              className="ml-auto w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300"
              style={{
                transform: openProducts ? "rotate(180deg)" : "rotate(0)",
              }}
            >
              <FaAngleDown />
            </span>
          </Button>
          <Collapse isOpened={openProducts}>
            <ul className="ml-6 mt-1">
              <li className="w-full">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3"
onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add product",
                    })
                  }
                
                
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                  Product Upload
                </Button>
              </li>
             
              <li className="w-full">
                 <Link to={"/products"}>
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3 ">
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                  Product List
                </Button>
                </Link>
                
              </li>
              <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3"
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add product",
                    })
                  }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                  Product Upload
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        {/* Category */}
        <li>
          <Button
            onClick={() => setOpenCategory(!openCategory)}
            className="w-full !capitalize !justify-start flex gap-3 !py-2 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] hover:bg-[#f1f1f1]"
          >
            <TbCategory2 className="text-[20px]" />
            <span>Category</span>
            <span
              className="ml-auto w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300"
              style={{
                transform: openCategory ? "rotate(180deg)" : "rotate(0)",
              }}
            >
              <FaAngleDown />
            </span>
          </Button>
          <Collapse isOpened={openCategory}>
            <ul className="ml-6 mt-1">
               <li>
                <Link
                  to="/category/list">
                  <Button
                 className="!text-[rgba(147,41,41,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3"
                >
                 Category List
                 </Button>
                </Link>
              </li>

                <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3"
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add New Category",
                    })
                  }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                  Add a Category
                </Button>
              </li>
             
              <li className="w-full">
                <Link to={"/SubCategory/list"}>
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3"
                
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                  Sub-Category
                </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-medium  flex gap-3"
                 onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New  Sub Category",
              })
            }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                  Add a Sub-Category
                </Button>
              </li>
             
            </ul>
          </Collapse>
        </li>

        {/* Orders */}
        <li>
          <Link to="/orders">
            <Button className="w-full !capitalize !justify-start flex gap-3 !py-2 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] hover:bg-[#f1f1f1]">
              <FaFirstOrder className="text-[20px]" />
              <span>Orders</span>
            </Button>
          </Link>
        </li>

        {/* Logout */}
        <li>
          <Button className="w-full !capitalize !justify-start flex gap-3 !py-2 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] hover:bg-[#f1f1f1]">
            <RiLogoutCircleRLine className="text-[20px]" />
            <span>LogOut</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

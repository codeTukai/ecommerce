import Button from "@mui/material/Button";
import React, { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import CategoryPanel from "./CategoryPanel";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(!isOpenCatPanel);
  };

  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-start gap-8">
          <div className="col_1 w-[25%]">
            <Button
              onClick={openCategoryPanel}
              sx={{
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
                textTransform: "none", // Optional: disables uppercase
              }}
            >
              <RiMenu2Fill style={{ fontSize: "18px" }} />
              Categories
              <TfiAngleDown
                style={{
                  fontSize: "13px",
                  marginLeft: "auto",
                  fontWeight: "bold",
                }}
              />
            </Button>
          </div>

          <div className="col_2 w-[60%]">
            <ul className="flex items-center gap-3 nav">
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(16,14,14,0.5)] hover:!text-[#ff5252]">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-none relative group">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.5)] hover:!text-[#ff5252]">
                    Fashion
                  </Button>
                </Link>

                {/* Parent Submenu */}
                <div className="submenu absolute top-[120%] left-0 min-w-[200px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                  <ul>
                    {/* Men Submenu */}
                    <li className="list-none relative group w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                        Men
                      </Button>
                      <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30">
                        <ul>
                          {[
                            "T-Shirts",
                            "Shirts",
                            "Jeans",
                            "Shoes",
                            "Watches",
                            "Bags",
                          ].map((product, idx) => (
                            <li key={idx} className="list-none w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                                {product}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>

                    {/* Women Submenu */}
                    <li className="list-none relative group w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                        Women
                      </Button>
                      <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30">
                        <ul>
                          {[
                            "Kurtas",
                            "Tops",
                            "Sarees",
                            "Shoes",
                            "Handbags",
                            "Jewellery",
                          ].map((product, idx) => (
                            <li key={idx} className="list-none w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                                {product}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>

                    {/* Kids Submenu */}
                    <li className="list-none relative group w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                        Kids
                      </Button>
                      <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30">
                        <ul>
                          {["T-Shirts", "Shorts", "Sandals", "Caps"].map(
                            (product, idx) => (
                              <li key={idx} className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                                  {product}
                                </Button>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </li>

                    {/* Girls Submenu */}
                    <li className="list-none relative group w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                        Girls
                      </Button>
                      <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30">
                        <ul>
                          {["Dresses", "Leggings", "Hairbands", "Bags"].map(
                            (product, idx) => (
                              <li key={idx} className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                                  {product}
                                </Button>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </li>

                    {/* Boys Submenu */}
                    <li className="list-none relative group w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                        Boys
                      </Button>
                      <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30">
                        <ul>
                          {["Pants", "Shirts", "Sneakers", "Caps"].map(
                            (product, idx) => (
                              <li key={idx} className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                                  {product}
                                </Button>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.5)] hover:!text-[#ff5252]">
                    Electronics
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.5)] hover:!text-[#ff5252]">
                    Bags
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.5)] hover:!text-[#ff5252]">
                    Footwear
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.5)] hover:!text-[#ff5252]">
                    Sports
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.5)] hover:!text-[#ff5252]">
                    Groceries
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.5)] hover:!text-[#ff5252]">
                    Wellness
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.5)] hover:!text-[#ff5252]">
                    Jewellery
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col_3 w-[20%]">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <MdOutlineRocketLaunch className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* This is for category panel */}
      <CategoryPanel
        openCategoryPanel={openCategoryPanel}
        isOpenCatPanel={isOpenCatPanel}
      />
    </>
  );
};

export default Navigation;

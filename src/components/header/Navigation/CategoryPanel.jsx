import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaRegMinusSquare } from "react-icons/fa";

const CategoryPanel = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const openSubmenu = (index) => {
    setSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const openInnerSubmenu = (index) => {
    setInnerSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-2 text-[16px] font-[500] flex items-center justify-between">
        Shop BY Category
        <IoCloseSharp
          onClick={() => toggleDrawer(false)()}
          className="cursor-pointer text-[20px]"
        />
      </h3>

      <div className="scroll">
        <ul className="w-full">
          {/* Main Category Item */}
          <li className="list-none flex items-center relative">
            <Link to="/" className="w-full">
              <Button className="w-full text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Fashion
              </Button>
            </Link>

            {submenuIndex === 0 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            )}

            {/* First-level submenu */}
            {submenuIndex === 0 && (
              <ul className="submenu absolute top-[100%] left-0 w-full pl-3 bg-white z-10">
                <li className="list-item relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      Apparel
                    </Button>
                  </Link>

                  {innerSubmenuIndex === 0 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubmenu(0)}
                    />
                  ) : (
                    <FaRegSquarePlus
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubmenu(0)}
                    />
                  )}

                  {innerSubmenuIndex === 0 && (
                    <ul className="submenu absolute top-[100%] left-0 w-full pl-3 bg-white z-10">
                      {[
                        "Smart Tablet",
                        "Crape T-Shirt",
                        "Leather Watch",
                        "Rolling Diamond",
                      ].map((item, idx) => (
                        <li key={idx} className="list-item relative mb-1">
                          <Link
                            to="/"
                            className="link w-full text-left !px-3 transition text-[14px]"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Second-level submenu */}
                </li>
              </ul>
            )}
          </li>

          <li className="list-none flex items-center relative">
            <Link to="/" className="w-full">
              <Button className="w-full text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Outwear
              </Button>
            </Link>

            {submenuIndex === 1 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(1)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(1)}
              />
            )}

            {submenuIndex === 1 && (
              <ul className="submenu absolute top-[100%] left-0 w-full pl-3 bg-white z-10">
                <li className="list-item relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      Jackets
                    </Button>
                  </Link>

                  {innerSubmenuIndex === 1 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubmenu(1)}
                    />
                  ) : (
                    <FaRegSquarePlus
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubmenu(1)}
                    />
                  )}

                  {innerSubmenuIndex === 1 && (
                    <ul className="submenu absolute top-[100%] left-0 w-full pl-3 bg-white z-10">
                      {[
                        "Denim Jacket",
                        "Blazer",
                        "Raincoat",
                        "Leather Coat",
                      ].map((item, idx) => (
                        <li key={idx} className="list-item relative mb-1">
                          <Link
                            to="/"
                            className="link w-full text-left !px-3 transition text-[14px]"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </Box>
  );

  return (
    <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;

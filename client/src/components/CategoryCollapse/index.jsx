import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { FaRegMinusSquare } from "react-icons/fi";
import { FaRegSquarePlus } from "react-icons/fa6";

export const CategoryCollapse = () => {
     const [submenuIndex, setSubmenuIndex] = useState(null);
      const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

      const openSubmenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
        } else {
            setSubmenuIndex(index);
        }
      };

      const openInnerSubmenu = (index) => {
        if (innerSubmenuIndex === index) {
            setInnerSubmenuIndex(null);
        } else {
            setInnerSubmenuIndex(null);
        }
      };

      return (
        <><div className="scroll">
        <ul className="w-full">
          {/* Main Category Item */}
          <li className="list-none flex items-center relative flex-col">
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
        </>
    )
}
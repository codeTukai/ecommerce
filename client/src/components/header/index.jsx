import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoGitCompare } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { Avatar, Button } from "@mui/material";
import { FaRegCircleUser } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AiOutlineLogout } from "react-icons/ai";
import { fetchDataFromApi } from "../../utils/api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const cartItemCount = 4; // Replace with real cart data

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      if (res?.error === false) {
        context.setIsLogin(false);
        context.setUserData(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const userName = context?.userData?.name || "User";
  const userEmail = context?.userData?.email || "Email";



  return (
    <header className="bg-white">
      {/* Top strip */}
      <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="w-[50%]">
              <p className="text-[12px] font-[500]">
                Get up to 50% off new season styles, limited time offers
              </p>
            </div>
            <div className="flex items-center justify-end">
              <ul className="flex items-center gap-4">
                <li className="list-none">
                  <Link to="/help-center" className="text-[14px] font-[500]">
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link to="/order-tracking" className="text-[14px] font-[500]">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header py-4 border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between flex-wrap gap-y-3">
          {/* Logo */}
          <div className="w-[25%]">
            <Link to="/">
              <img
                src="/Easycart_logo_with_subtitle.jpg"
                alt="Easycart"
                className="w-[100px]"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="w-[40%]">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Right section */}
          <div className="w-[35%] flex items-center justify-end pl-7">
            <ul className="flex items-center gap-3">
              {!context.isLogin ? (
                <li className="list-none">
                  <Link to="/login" className="text-[15px] font-[500]">
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link to="/Register" className="text-[15px] font-[500]">
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  <Button
                    className="!text-[#000] flex items-center gap-3 cursor-pointer"
                    onClick={handleClick}
                  >
                    <div className="!w-[40px] !h-[40px] !min-w-[40px] rounded-full bg-[#f1f1f1] flex items-center justify-center">
                      <FaRegCircleUser className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </div>
                    <div className="info flex flex-col">
                      <h4 className="text-[14px] mb-0 capitalize text-left text-[rgba(0,0,0,0.6)] font-[500]">
                        {userName}
                      </h4>
                      <span className="text-[13px] text-left text-[rgba(0,0,0,0.6)]">
                        {userEmail}
                      </span>
                    </div>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to="/my-account" className="w-full block">
                      <MenuItem>
                        <FaRegCircleUser className="mr-2" /> My Account
                      </MenuItem>
                    </Link>
                    <Link to="/my-orders" className="w-full block">
                      <MenuItem>
                        <MdOutlineShoppingCart className="mr-2" /> Orders
                      </MenuItem>
                    </Link>
                    <Link to="/my-list" className="w-full block">
                      <MenuItem>
                        <FaRegHeart className="mr-2" /> My List
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={logout}>
                      <AiOutlineLogout className="mr-2" />
                      <span className="text-red-500 font-medium text-[14px]">
                        Log Out
                      </span>
                    </MenuItem>
                  </Menu>
                </>
              )}

              {/* Compare / Wishlist / Cart */}
              <li>
                <Tooltip title="Compare">
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={cartItemCount} color="secondary">
                      <GoGitCompare size={24} />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist">
                    <StyledBadge badgeContent={cartItemCount} color="secondary">
                      <FaRegHeart size={24} />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCartPanel(true)}
                  >
                    <StyledBadge badgeContent={cartItemCount} color="secondary">
                      <MdOutlineShoppingCart size={24} />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;

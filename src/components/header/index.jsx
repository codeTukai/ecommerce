import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoGitCompare } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from "./Navigation";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));
const Header = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Simulated cart items (replace with real data or context)
  const cartItemCount = 4;

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <header className="bg-white">
      {/* Top strip */}
      <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="coll w-[50%]">
              <p className="text-[12px] font-[500]">
                Get up to 50% off new season styles, limited time offers
              </p>
            </div>
            <div className="flex items-center justify-end">
              <ul className="flex items-center gap-4">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className = "text-[14px] font-[500] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="text-[14px] font-[500] transition"
                  >
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
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <div className="col1 w-[25%] ">
            <Link to="/">
              <img
                src="/Easycart_logo_with_subtitle.jpg"
                alt="Easycart"
                className="w-[150px]"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="col2 w-[45%]">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Right side (optional content) */}
          <div className="col3 w-[30%] flex items-center pl-7">
            <ul className="flex items-center gap-3">
              <li className="list-none">
                <Link
                  to="/login"
                  className="link transition text-[15px] font-[500]"
                >
                  Login
                </Link>{" "}
                | &nbsp;{" "}
                <Link
                  to="/Register"
                  className="link transition text-[15px] font-[500]"
                >
                  Register
                </Link>
              </li>
              <li>
              <Tooltip title="Compare">
              <IconButton aria-label="cart">
              <StyledBadge badgeContent={cartItemCount} color="secondary">
                <GoGitCompare size={24} />
              </StyledBadge>
            </IconButton>
            </Tooltip>
              </li>
              <li>
              <Tooltip title="Wishlist">
              <IconButton aria-label="cart">
              <StyledBadge badgeContent={cartItemCount} color="secondary">
                <FaRegHeart size={24} />
              </StyledBadge>
            </IconButton>
            </Tooltip>
              </li>
              <li>
              <Tooltip title="Cart">
              <IconButton aria-label="cart">
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

      <Navigation/>

    </header>
  );
};

export default Header;

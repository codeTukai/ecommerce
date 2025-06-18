import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { RiMenuFold4Line } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoMdNotificationsOutline } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { FaCircleUser } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

// Styled Badge for notifications
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

// Avatar component
const Avatar = ({ size = 35 }) => (
  <div
    className="rounded-full overflow-hidden cursor-pointer"
    style={{ width: `${size}px`, height: `${size}px` }}
  >
    <img
      src="https://th.bing.com/th/id/OIP.tY95ngxkRp1RDhbc4i3t3QHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
      className="w-full h-full object-cover"
      alt="profile"
    />
  </div>
);

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  // Menu Handlers
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };

  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };
  // const { isSidebarOpen, setisSidebarOpen } = useContext(MyContext);

  return (
    <header
      className={`w-full py-2 pr-7 bg-white shadow-md flex items-center justify-between transition-all duration-300 ${
        context.isSidebarOpen ? "pl-[260px]" : "pl-[70px]"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <div className="part1">
        <Button
          className="!w-[35px] !h-[35px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]"
          onClick={() => context.setisSidebarOpen(!context.isSidebarOpen)}
        >
          <RiMenuFold4Line className="text-[20px] text-[rgba(0,0,0,0.800)]" />
        </Button>
      </div>

      {/* Right-side icons */}
      <div className="part2 flex items-center justify-end gap-3">
        {/* Notifications */}
        <IconButton aria-label="notifications">
          <StyledBadge badgeContent={4} color="secondary">
            <IoMdNotificationsOutline className="text-[22px]" />
          </StyledBadge>
        </IconButton>

        {context.isLogin === true ? (
          <div className="relative">
            <div onClick={handleClickMyAcc} role="button" tabIndex={0}>
              <Avatar />
            </div>

            <Menu
              anchorEl={anchorMyAcc}
              open={openMyAcc}
              onClose={handleCloseMyAcc}
              onClick={handleCloseMyAcc}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* User Info */}
              <MenuItem className="!bg-white">
                <div className="flex items-center gap-3">
                  <Avatar />
                  <div className="info">
                    <h3 className="text-[15px] font-[500] leading-5">
                      Angileo Methewos
                    </h3>
                    <p className="text-[13px] font-[400] opacity-70">
                      adminq2@gmail.com
                    </p>
                  </div>
                </div>
              </MenuItem>

              <Divider />

              {/* Profile Option */}
              <MenuItem
                onClick={() => {
                  handleCloseMyAcc();
                  navigate("/profile");
                }}
                className="flex items-center gap-3"
              >
                <FaCircleUser />
                <span className="text-[16px]">Profile</span>
              </MenuItem>

              {/* Logout Option */}
              <MenuItem
                onClick={() => {
                  handleCloseMyAcc();
                  navigate("/logout");
                }}
                className="flex items-center gap-3"
              >
                <RiLogoutCircleRLine />
                <span className="text-[18px]">Sign Out</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
           <Button
            
            className="!rounded-full !px-6 !py-1 !text-white !bg-blue-600 hover:!bg-blue-700 transition-all"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

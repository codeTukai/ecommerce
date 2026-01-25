import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Icons
import { RiMenuFold4Line, RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

// Context
import { MyContext } from "../../App";
import AddProduct from "../../pages/Products/AddProduct";
import AddHomeSlide from "../../pages/HomeSliderBanners/AddHomeSlide";
import AddCategory from "../../pages/Category/addCategory";
import AddSubCategory from "../../pages/Category/addSubCategory";
// import EditProduct from "../../pages/Category/editProduct";



import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MdOutlineClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import EditProduct from "../../pages/Products/EditProduct";
import ProductDetails from "../../pages/Products/productDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Styled Badge for Notifications
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

// Avatar UI
const Avatar = ({ size = 35, src }) => (
  <div
    className="rounded-full overflow-hidden cursor-pointer"
    style={{ width: `${size}px`, height: `${size}px` }}
  >
    <img
      src={
        src ||
        "https://th.bing.com/th/id/OIP.tY95ngxkRp1RDhbc4i3t3QHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
      }
      alt="profile"
      className="w-full h-full object-cover"
    />
  </div>
);

const Header = () => {
  const context = useContext(MyContext);
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const navigate = useNavigate();

  // Menu Handlers
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };

  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    context.setisLogin(false);
    context.setUserData(null);
    navigate("/login");
  };

  const handleLoginClick = () => {
    console.log("Login button clicked");
    navigate("/login");
  };

  return (
    <>
      <header
        className={`w-full py-2 pr-7 bg-white shadow-md flex items-center justify-between transition-all duration-300 ${
          context.isSidebarOpen ? "pl-[260px]" : "pl-[70px]"
        } `}
      >
        {/* Sidebar Toggle */}
        <Button
          className="!w-[35px] !h-[35px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]"
          onClick={() => context.setisSidebarOpen(!context.isSidebarOpen)}
        >
          <RiMenuFold4Line className="text-[20px]" />
        </Button>

        {/* Right Side Icons */}
        <div className="flex items-center justify-end gap-3">
          {/* Notifications */}
          <IconButton>
            <StyledBadge badgeContent={4} color="secondary">
              <IoMdNotificationsOutline className="text-[22px]" />
            </StyledBadge>
          </IconButton>

          {/* Logged In Menu */}
          {context.isLogin === true ? (
            <div className="relative">
              <div
                onClick={handleClickMyAcc}
                role="button"
                tabIndex={0}
                aria-controls={openMyAcc ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMyAcc ? "true" : undefined}
              >
                <Avatar />
              </div>

              <Menu
                id="account-menu"
                anchorEl={anchorMyAcc}
                open={openMyAcc}
                onClose={handleCloseMyAcc}
                onClick={handleCloseMyAcc}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {/* User Info */}
                <MenuItem>
                  <div className="flex items-center gap-3">
                    <Avatar size={40} />
                    <div>
                      <h3 className="text-[15px] font-[500] leading-5">
                        {context?.userData?.name || "Admin User"}
                      </h3>
                      <p className="text-[13px] opacity-70">
                        {context?.userData?.email || "admin@domain.com"}
                      </p>
                    </div>
                  </div>
                </MenuItem>

                <Divider />

                {/* Profile */}
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

                {/* Logout */}
                <MenuItem
                  onClick={() => {
                    handleCloseMyAcc();
                    logout();
                  }}
                  className="flex items-center gap-3"
                >
                  <RiLogoutCircleRLine />
                  <span className="text-[16px]">Sign Out</span>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              onClick={handleLoginClick}
              className="!rounded-full !px-6 !py-1 !text-white !bg-blue-600 hover:!bg-blue-700"
            >
              Login
            </Button>
          )}
        </div>
      </header>

      <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={() => context?.setIsOpenFullScreenPanel({ open: false })}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => context?.setIsOpenFullScreenPanel({ open: false })}
              aria-label="close"
            >
              <MdOutlineClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-white">
                {context?.isOpenFullScreenPanel?.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>

        {context?.isOpenFullScreenPanel?.model === "Add Product" && (
          <AddProduct />
        )}
        {context?.isOpenFullScreenPanel?.model === "Add Home Slide" && (
          <AddHomeSlide />
        )}
        {["Add New Category", "Edit Category"].includes(
          context?.isOpenFullScreenPanel?.model
        ) && <AddCategory />}
        {context?.isOpenFullScreenPanel?.model === "Add New  Sub Category" && (
          <AddSubCategory />
        )}

        {context.isOpenFullScreenPanel?.open &&
          context.isOpenFullScreenPanel?.model === "Edit Product" && (
            <EditProduct />
          )}
        {context.isOpenFullScreenPanel?.open &&
          context.isOpenFullScreenPanel?.model === "Product Details" && (
            <ProductDetails />
          )}
      </Dialog>
    </>
  );
};

export default Header;

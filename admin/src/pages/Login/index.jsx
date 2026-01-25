import React, { useState, useContext, useEffect } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { Logout, Person } from "@mui/icons-material";

import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formFields, setFormFields] = useState({ email: "", password: "" });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  // Menu handlers
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    context.setUserData(null);
    context.setisLogin(false);
    context.alertBox("success", "Logged out");
    handleMenuClose();
  };

  const handleProfileClick = () => {
    navigate("/");
    handleMenuClose();
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const forgotPassword = async () => {
    if (!formFields.email) {
      context.alertBox("error", "Please enter email ID");
      return;
    }

    try {
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgot-password");

      const res = await postData("/api/user/forgot-password", {
        email: formFields.email,
      });

      if (!res.error) {
        context.alertBox("success", res.message);
        navigate("/verify");
      } else {
        context.alertBox("error", res.message || "Something went wrong");
      }
    } catch (error) {
      context.alertBox("error", "Something went wrong");
    }
  };

  const handleClickGoogle = () => {
    setLoadingGoogle(true);
    setTimeout(() => {
      context.setisLogin(true);
      context.alertBox("success", "Signed in with Google");
      context.fetchUserDetails?.();
    }, 1000);
  };

  const handleClickFb = () => {
    setLoadingFb(true);
    setTimeout(() => {
      context.setisLogin(true);
      context.alertBox("success", "Signed in with Facebook");
      context.fetchUserDetails?.();
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formFields;

    if (!email || !password) {
      context.alertBox("error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await postData("/api/user/login", formFields);

      if (!res?.error) {
        context.alertBox("success", res.message || "Login successful");

        localStorage.setItem("accessToken", res.data?.accesstoken);
        localStorage.setItem("refreshToken", res.data?.refreshToken);

        context.setisLogin(true);
        await context.fetchUserDetails?.(); // Fetch but don't navigate yet
      } else {
        context.alertBox("error", res.message || "Login failed");
      }
    } catch (err) {
      context.alertBox("error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Auto redirect after login + userData ready
  useEffect(() => {
    if (context.isLogin && context.userData?._id) {
      navigate("/");
    }
  }, [context.isLogin, context.userData]);

  return (
    <section className="bg-white min-h-screen relative">
      {/* Header */}
      <header className="fixed w-full top-0 left-0 px-4 py-3 flex justify-between items-center z-50 bg-white shadow-sm">
        <Link to={"/"}>
          <img src="/pattern.jpg" className="w-[130px]" alt="logo" />
        </Link>
        {context?.isLogin ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                src={
                  context.userData?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 3,
                sx: { width: 250, mt: 1.5, borderRadius: 2 },
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <div className="px-4 py-3">
                <Typography fontWeight="bold">
                  {context.userData?.name || "Admin User"}
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                  {context.userData?.email || "admin@domain.com"}
                </Typography>
              </div>
              <Divider />
              <MenuItem onClick={handleProfileClick}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sign Out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <div className="flex gap-2">
            <NavLink to={"/login"}>
              <Button className="!rounded-full flex gap-2 !px-5">
                <CiLogin className="text-[18px]" /> Login
              </Button>
            </NavLink>
            <NavLink to={"/sign-up"}>
              <Button className="!rounded-full flex gap-1 !px-5">
                <FaRegUser className="text-[15px]" /> Sign Up
              </Button>
            </NavLink>
          </div>
        )}
      </header>

      {/* Background */}
      <img
        src="/pattern.jpg"
        alt=""
        className="w-full fixed top-0 left-0 opacity-5 z-0"
      />

      {/* Login Card */}
      <div className="loginBox w-[45%] min-h-[450px] mx-auto mt-28 relative z-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <img src="/icon.webp" className="w-[150px] mx-auto" alt="icon" />
        </div>
        <h1 className="text-center text-[28px] font-[800] mt-4 leading-9">
          Welcome Back! <br /> Sign in with your credentials
        </h1>

        {/* Social Login */}
        <div className="flex justify-center gap-4 mt-5">
          <Button
            onClick={handleClickGoogle}
            variant="outlined"
            className="!text-[16px] !capitalize !px-5"
            disabled={loadingGoogle}
          >
            {loadingGoogle ? <CircularProgress size={20} /> : "Google"}
            <FcGoogle className="ml-2" />
          </Button>
          <Button
            onClick={handleClickFb}
            variant="outlined"
            className="!text-[16px] !capitalize !px-5"
            disabled={loadingFb}
          >
            {loadingFb ? <CircularProgress size={20} /> : "Facebook"}
            <IoLogoFacebook className="ml-2 text-blue-700" />
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6 gap-3">
          <span className="w-[100px] h-[1px] bg-gray-300"></span>
          <span className="text-[14px] font-medium">Admin Login</span>
          <span className="w-[100px] h-[1px] bg-gray-300"></span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-5">
            <TextField
              name="email"
              type="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              value={formFields.email}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-5 relative">
            <TextField
              name="password"
              type={isShowPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              fullWidth
              value={formFields.password}
              onChange={onChangeInput}
            />
            <Button
              type="button"
              className="!absolute top-[10px] right-[10px] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <IoEye className="text-[20px]" />
              ) : (
                <IoEyeOff className="text-[20px]" />
              )}
            </Button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <span
              onClick={forgotPassword}
              className="text-[15px] font-semibold cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          <Button
            type="submit"
            fullWidth
            className="btn-blue btn-lg"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : "Login"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;

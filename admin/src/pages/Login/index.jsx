import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";

import { MyContext } from "../../App"; // ✅ adjust path as needed
import { postData } from "../../utils/api"; // ✅ adjust path if different

const Login = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [isShowpassword, setIsShowpassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formFields, setFormsFields] = useState({
    email: "",
    password: "",
  });

  const handleClickGoogle = () => {
    alert("Google login is not implemented yet");
    // setLoadingGoogle(true);
    // setTimeout(() => {
    //   context?.setisLogin(true);
    //   navigate("/");
    // }, 1000);
  };

  const handleClickFb = () => {
    alert("Facebook login is not implemented yet");
    // setLoadingFb(true);
    // setTimeout(() => {
    //   context?.setisLogin(true);
    //   navigate("/");
    // }, 1000);
  };

  const forgotPassword = () => {
    alert("OTP Sent");
    navigate("/verify");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.email || !formFields.password) {
      context?.alertBox("error", "Please enter email and password");
      return;
    }

    try {
      const res = await postData("/api/user/login", formFields);

      if (res?.error !== true && res?.data?.accesstoken) {
        context?.alertBox("success", res.message);

        setFormsFields({ email: "", password: "" });

        localStorage.setItem("accessToken", res.data.accesstoken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        context?.setisLogin(true);
        context?.refreshUserData?.();
        navigate("/");
      } else {
        context?.alertBox("error", res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      context?.alertBox("error", "Something went wrong");
    }
  };

  return (
    <section className="bg-[#fff] min-h-screen relative">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50 bg-white shadow-sm">
        <Link to={"/"}>
          <img src="pattern.jpg" className="w-[130px]" alt="logo" />
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to={"/login"}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] flex gap-2 !px-5">
              <CiLogin className="text-[18px]" /> Login
            </Button>
          </NavLink>

          <NavLink to={"/sign-up"}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] flex gap-1 !px-5">
              <FaRegUser className="text-[15px]" /> Sign Up
            </Button>
          </NavLink>
        </div>
      </header>

      {/* Background */}
      <img
        src="/pattern.jpg"
        className="w-full fixed top-0 left-0 opacity-5 z-0"
        alt=""
      />

      {/* Login Form */}
      <div className="loginBox card w-[45%] min-h-[450px] mx-auto mt-28 relative z-50 p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <img src="icon1.webp" className="w-[150px] mx-auto" alt="icon" />
        </div>
        <h1 className="text-center text-[28px] font-[800] mt-4 leading-9">
          Welcome Back! <br /> Sign in with your credentials
        </h1>

        {/* Social Login */}
        <div className="flex items-center justify-center w-full mt-5 gap-4">
          <Button
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle className="[20px]" />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !text-[16px] !py-2 !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            Sign in with Google
          </Button>
          <Button
            size="small"
            onClick={handleClickFb}
            endIcon={<IoLogoFacebook className="[20px]" />}
            loading={loadingFb}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !text-[16px] !py-2 gap-2 !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            Sign in with Facebook
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6 gap-3">
          <span className="w-[100px] h-[1px] bg-gray-300"></span>
          <span className="text-[14px] font-[500]">
            Or, sign in with your email
          </span>
          <span className="w-[100px] h-[1px] bg-gray-300"></span>
        </div>

        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <TextField
              type="email"
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              value={formFields.email}
              onChange={(e) =>
                setFormsFields({ ...formFields, email: e.target.value })
              }
            />
          </div>

          <div className="mb-5 relative">
            <TextField
              type={isShowpassword ? "text" : "password"}
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={formFields.password}
              onChange={(e) =>
                setFormsFields({ ...formFields, password: e.target.value })
              }
            />
            <Button
              type="button"
              className="!absolute top-[10px] right-[10px] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
              onClick={() => setIsShowpassword(!isShowpassword)}
            >
              {isShowpassword ? (
                <IoEye className="text-[20px] opacity-75" />
              ) : (
                <IoEyeOff className="text-[20px] opacity-75" />
              )}
            </Button>
          </div>

          <div className="flex justify-between items-center mb-3">
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
              className="text-[15px] font-[600] cursor-pointer hover:underline"
              onClick={forgotPassword}
            >
              Forgot Password?
            </span>
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full">
            Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;

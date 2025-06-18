import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { IoEye, IoEyeOff, IoLogoFacebook } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";

import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [isShowpassword, setIsShowpassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formFields, setFormsFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validValue = Object.values(formFields).every((el) => el);

  const forgotPassword = () => {
    if (!formFields.email) {
      context.openAlertBox("error", "Please enter email id");
      return;
    }

    context.openAlertBox("success", `OTP sent to ${formFields.email}`);
    localStorage.setItem("userEmail", formFields.email);
    localStorage.setItem("actionType", "forgot-password");

    postData("/api/user/forgot-password", {
      email: formFields.email,
    }).then((res) => {
      if (res?.error === false) {
        context.openAlertBox("success", res.message);
        navigate("/verify");
      } else {
        context.openAlertBox("error", res.message);
      }
    });
  };

  const handleClickGoogle = () => {
    setLoadingGoogle(true);
    setTimeout(() => {
      context.setIsLogin(true);
      context.openAlertBox("success", "Signed in with Google");
      context.refreshUserData?.(); // Optional if defined
      navigate("/");
    }, 1000);
  };

  const handleClickFb = () => {
    setLoadingFb(true);
    setTimeout(() => {
      context.setIsLogin(true);
      context.openAlertBox("success", "Signed in with Facebook");
      context.refreshUserData?.(); // Optional if defined
      navigate("/");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.email) {
      context.openAlertBox("error", "Please enter email id");
      return;
    }
    if (!formFields.password) {
      context.openAlertBox("error", "Please enter password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await postData("/api/user/login", formFields);
      if (res?.error !== true) {
        context.openAlertBox("success", res.message);
        setFormsFields({ email: "", password: "" });

        localStorage.setItem("accessToken", res.data?.accesstoken);
        localStorage.setItem("refreshToken", res.data?.refreshToken);

        context.setIsLogin(true);
        context.refreshUserData?.(); // Call to refetch user info
        navigate("/");
      } else {
        context.openAlertBox("error", res.message || "Login failed");
      }
    } catch (error) {
      context.openAlertBox("error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white min-h-screen relative">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-4 py-3 flex items-center justify-between z-50 bg-white shadow-sm">
        <Link to="/">
          <img src="/pattern.jpg" className="w-[130px]" alt="logo" />
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/login">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] flex gap-2 !px-5">
              <CiLogin className="text-[18px]" /> Login
            </Button>
          </NavLink>
          <NavLink to="/sign-up">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] flex gap-1 !px-5">
              <FaRegUser className="text-[15px]" /> Sign Up
            </Button>
          </NavLink>
        </div>
      </header>

      {/* Background */}
      <img src="/pattern.jpg" className="fixed top-0 left-0 w-full opacity-5 z-0" alt="" />

      {/* Login Card */}
      <div className="loginBox card w-[45%] min-h-[450px] mx-auto mt-28 relative z-50 p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <img src="/icon1.webp" className="w-[150px] mx-auto" alt="icon" />
        </div>
        <h1 className="text-center text-[28px] font-extrabold mt-4 leading-9">
          Welcome Back! <br /> Sign in with your credentials
        </h1>

        <div className="flex items-center justify-center mt-5 gap-4">
          <Button
            size="small"
            onClick={handleClickGoogle}
            variant="outlined"
            disabled={loadingGoogle}
            className="!text-[16px] !py-2 !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            {loadingGoogle ? <CircularProgress size={20} /> : <>
              <FcGoogle className="mr-2 text-[20px]" />
              Sign in with Google
            </>}
          </Button>

          <Button
            size="small"
            onClick={handleClickFb}
            variant="outlined"
            disabled={loadingFb}
            className="!text-[16px] !py-2 gap-2 !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            {loadingFb ? <CircularProgress size={20} /> : <>
              <IoLogoFacebook className="mr-2 text-[20px]" />
              Sign in with Facebook
            </>}
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6 gap-3">
          <span className="w-[100px] h-[1px] bg-gray-300"></span>
          <span className="text-[14px] font-[500]">Or, sign in with your email</span>
          <span className="w-[100px] h-[1px] bg-gray-300"></span>
        </div>

        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-5">
            <TextField
              type="email"
              id="email"
              name="email"
              value={formFields.email}
              disabled={isLoading}
              label="Email Address"
              variant="outlined"
              className="w-full"
              onChange={onChangeInput}
              autoComplete="new-email"
            />
          </div>

          <div className="mb-5 relative">
            <TextField
              type={isShowpassword ? "text" : "password"}
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={formFields.password}
              disabled={isLoading}
              onChange={onChangeInput}
              autoComplete="new-password"
            />
            <Button
              type="button"
              className="!absolute top-[10px] right-[10px] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
              onClick={() => setIsShowpassword(!isShowpassword)}
            >
              {isShowpassword ? <IoEye className="text-[20px] opacity-75" /> : <IoEyeOff className="text-[20px] opacity-75" />}
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

          <div className="flex items-center w-full mt-3 mb-3">
            <Button
              type="submit"
              disabled={!validValue || isLoading}
              className="btn-org btn-lg w-full flex gap-3"
            >
              {isLoading ? <CircularProgress color="inherit" size={20} /> : "Login"}
            </Button>
          </div>

          <p className="text-center">
            Not Registered?{" "}
            <Link to="/sign-up" className="link text-[14px] font-[600] text-primary">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;

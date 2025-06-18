import Button from "@mui/material/Button";
import React, { useState,  } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import TextField from "@mui/material/TextField";
import { IoEye, IoEyeOff } from "react-icons/io5";


const forgotPassword = () => {
  const [isShowpassword, setIsShowpassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formFields, setFormsFields] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();



  const forgotPassword = () => {
    alert("OTP Sent");
    navigate("/verify");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.email && formFields.password) {
      context.setisLogin(true);
      navigate("/");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <section className="bg-white w-full h-full relative">
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

      <img
        src="/pattern.jpg"
        className="w-full fixed top-0 left-0 opacity-5 z-0"
        alt=""
      />

      <div className="loginBox card w-[45%] min-h-[450px] mx-auto mt-28 relative z-50 p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <img src="icon1.webp" className="w-[150px] mx-auto" alt="icon" />
        </div>
        <h1 className="text-center text-[28px] font-[800] mt-4 leading-9">
          Having trouble to sign in? <br />
          Reset your password
        </h1>

        <br />

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <TextField
              type="email"
              id="email"
              label="Email Id"
              variant="outlined"
              fullWidth
              value={formFields.email}
              onChange={(e) =>
                setFormsFields({ ...formFields, email: e.target.value })
              }
            />
          </div>
          <div className="form-group w-full mb-5 relative">
            <TextField
              type={showNewPassword ? "text" : "password"}
              id="new_password"
              label="New Password"
              variant="outlined"
              className="w-full"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="!absolute top-[10px] right-[10px] z-[10] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
            >
              {showNewPassword ? (
                <IoEye className="text-[20px] opacity-75" />
              ) : (
                <IoEyeOff className="text-[20px] opacity-75" />
              )}
            </Button>
          </div>

          <div className="form-group w-full mb-5 relative">
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              label="Confirm Password"
              variant="outlined"
              className="w-full"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="!absolute top-[10px] right-[10px] z-[10] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
            >
              {showConfirmPassword ? (
                <IoEye className="text-[20px] opacity-75" />
              ) : (
                <IoEyeOff className="text-[20px] opacity-75" />
              )}
            </Button>
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full">
            Reset Password
          </Button>

          <br />
          <br />

          <div className="flex text-center items-center justify-center gap-4">
            <span className="text-center flex items-center justify-center gap-4">
              <span>Don't want to reset?</span>
              <Link
                to={"/forgot-password"}
                className="text-blue-500 font-[700] text-[15px] hover:underline hover:text-gray-700"
              >
                Sign In?
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default forgotPassword;

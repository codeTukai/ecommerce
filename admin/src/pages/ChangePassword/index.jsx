import Button from "@mui/material/Button";
import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("resetToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      context.alertBox("error", "Reset token missing. Please verify OTP again.");
      navigate("/forgot-password");
      return;
    }

    if (!newPassword || !confirmPassword) {
      context.alertBox("error", "Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      context.alertBox("error", "Passwords do not match.");
      return;
    }

    const res = await postData("/api/user/forgot-password", {
      token,
      newPassword,
    });

    if (res?.error) {
      context.alertBox("error", res.message || "Password reset failed.");
    } else {
      context.alertBox("success", res.message || "Password reset successfully.");
      setNewPassword("");
      setConfirmPassword("");
      localStorage.removeItem("resetToken");
      localStorage.removeItem("userEmail");
      navigate("/login");
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
          <img src="icon.webp" className="w-[150px] mx-auto" alt="icon" />
        </div>
        <h1 className="text-center text-[28px] font-[800] mt-4 leading-9">
          Welcome Back! <br />
          Please change your password
        </h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="form-group w-full mb-5 relative">
            <TextField
              type={showNewPassword ? "text" : "password"}
              id="new_password"
              label="New Password"
              variant="outlined"
              className="w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="!absolute top-[10px] right-[10px] z-[10] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
            >
              {showNewPassword ? <IoEye /> : <IoEyeOff />}
            </Button>
          </div>

          <div className="form-group w-full mb-5 relative">
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              label="Confirm Password"
              variant="outlined"
              className="w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="!absolute top-[10px] right-[10px] z-[10] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
            >
              {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
            </Button>
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;

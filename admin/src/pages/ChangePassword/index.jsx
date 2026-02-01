import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("resetToken");

  // ✅ Load verified email
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");

    if (!savedEmail || !token) {
      context.alertBox("error", "Session expired. Please verify OTP again.");
      navigate("/forgot-password");
      return;
    }

    setEmail(savedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      context.alertBox("error", "Passwords do not match");
      return;
    }

    try {
      const res = await postData("/api/user/reset-password", {
        token,
        password: newPassword,
      });

      if (res?.error) {
        context.alertBox("error", res.message || "Password reset failed");
      } else {
        context.alertBox("success", "Password changed successfully");
        localStorage.removeItem("resetToken");
        localStorage.removeItem("userEmail");
        navigate("/login");
      }
    } catch (err) {
      context.alertBox("error", "Something went wrong");
    }
  };

  return (
    <section className="bg-white w-full h-full relative">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50 bg-white shadow-sm">
        <Link to="/">
          <img src="pattern.jpg" className="w-[130px]" alt="logo" />
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/login">
            <Button className="!rounded-full !text-black flex gap-2 !px-5">
              <CiLogin /> Login
            </Button>
          </NavLink>

          <NavLink to="/sign-up">
            <Button className="!rounded-full !text-black flex gap-2 !px-5">
              <FaRegUser /> Sign Up
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

      {/* Card */}
      <div className="loginBox w-[420px] mx-auto mt-28 relative z-50 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-[22px] font-semibold mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <TextField
            type="email"
            label="Email"
            value={email}
            disabled
            fullWidth
            helperText="Email verified via OTP"
          />

          {/* New Password */}
          <TextField
            type={showNewPassword ? "text" : "password"}
            label="New Password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <IoEye /> : <IoEyeOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    edge="end"
                  >
                    {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Button */}
          <Button
            type="submit"
            fullWidth
            disabled={
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
            className="!mt-2"
          >
            CHANGE PASSWORD
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;

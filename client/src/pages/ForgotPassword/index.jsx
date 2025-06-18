import React, { useContext, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";

const ForgotPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("userEmail") || "";

  const [formFields, setFormFields] = useState({
    email: storedEmail,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const { email, password, confirmPassword } = formFields;
    const valid =
      email.trim() !== "" &&
      password.trim().length >= 6 &&
      confirmPassword.trim().length >= 6 &&
      password === confirmPassword;

    setIsFormValid(valid);
  }, [formFields]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formFields;

    if (!email || !password || !confirmPassword) {
      context.openAlertBox("error", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      context.openAlertBox("error", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      context.openAlertBox("error", "Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await postData("/api/user/reset-password", {
        email: email.trim(),
        newPassword: password.trim(),
        confirmPassword: confirmPassword.trim(),
      });

      if (response?.error === false) {
        context.openAlertBox("success", response.message || "Password reset successful.");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        navigate("/login");
      } else {
        context.openAlertBox("error", response?.message || "Reset failed.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      context.openAlertBox("error", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black font-semibold">
            Reset Password
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formFields.email}
                disabled={isLoading}
                onChange={handleInputChange}
              />
            </div>

            {/* New Password */}
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={showNewPassword ? "text" : "password"}
                label="New Password"
                variant="outlined"
                fullWidth
                name="password"
                value={formFields.password}
                disabled={isLoading}
                onChange={handleInputChange}
              />
              <Button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="!absolute top-[10px] right-[10px] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
              >
                {showNewPassword ? <IoEye /> : <IoEyeOff />}
              </Button>
            </div>

            {/* Confirm Password */}
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                value={formFields.confirmPassword}
                disabled={isLoading}
                onChange={handleInputChange}
              />
              <Button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="!absolute top-[10px] right-[10px] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
              >
                {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="btn-org btn-lg w-full flex gap-3"
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

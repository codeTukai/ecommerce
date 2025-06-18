import React, { useContext, useEffect, useState } from "react";
import OtpBox from "../../components/OtpBox";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(MyContext);

  // Load email from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      context.openAlertBox("error", "Email not found. Please try again.");
      navigate("/login");
    } else {
      setUserEmail(email);
    }
  }, [navigate, context]);

  // Handle OTP input
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  // Submit OTP for verification
  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      context.openAlertBox("error", "Please enter a valid 6-digit OTP");
      return;
    }

    const actionType = localStorage.getItem("actionType");
    const url =
      actionType === "forgot-password"
        ? "/api/user/verify-forgot-password-otp"
        : "/api/user/verifyEmail";

    setLoading(true);
    try {
      const res = await postData(url, { email: userEmail, otp });

      if (res?.error === false) {
        context.openAlertBox("success", res?.message || "OTP verified successfully");

        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");

        navigate(actionType === "forgot-password" ? "/forgot-password" : "/login");
      } else {
        context.openAlertBox("error", res?.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      context.openAlertBox("error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <div className="text-center flex items-center justify-center">
            <img src="/verify.png" width="80" alt="verify" />
          </div>
          <h3 className="text-center text-[18px] text-black mt-4 mb-1">Verify OTP</h3>
          <p className="text-center mt-0 mb-4">
            OTP sent to{" "}
            <span className="text-[#db1b1b] font-bold">{userEmail}</span>
          </p>

          <form onSubmit={verifyOTP}>
            <OtpBox length={6} onChange={handleOtpChange} />
            <div className="flex items-center justify-center mt-5 px-3">
              <Button
                type="submit"
                className="w-full btn-org btn-lg"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;

import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validValue = Object.values(formFields).every((el) => el.trim() !== "");

  // ✅ Alert wrapper
  const showAlert = (type, msg) => {
    if (context && typeof context.alertBox === "function") {
      context.alertBox(type, msg);
    } else {
      alert(`${type.toUpperCase()}: ${msg}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.name.trim() === "") {
      showAlert("error", "Please enter full name");
      return;
    }

    if (formFields.email.trim() === "") {
      showAlert("error", "Please enter email id");
      return;
    }

    if (formFields.password.trim() === "") {
      showAlert("error", "Please enter password");
      return;
    }

    setIsLoading(true);

    postData("/api/user/register", formFields).then((res) => {
      setIsLoading(false);
      if (res?.error !== true) {
        showAlert("success", res?.message || "Registered successfully");
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({ name: "", email: "", password: "" });
        navigate("/verify");
      } else {
        showAlert("error", res?.message || "Registration failed");
      }
    });
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Register with a new Account
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="name"
                name="name"
                label="Full Name"
                variant="outlined"
                className="w-full"
                value={formFields.name}
                disabled={isLoading}
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email Id"
                variant="outlined"
                className="w-full"
                value={formFields.email}
                disabled={isLoading}
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isShowPassword ? "text" : "password"}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                className="w-full"
                value={formFields.password}
                disabled={isLoading}
                onChange={onChangeInput}
              />
              <Button
                type="button"
                className="!absolute top-[10px] right-[10px] z-[50] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <IoEye className="text-[20px] opacity-75" />
                ) : (
                  <IoEyeOff className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={!validValue || isLoading}
                className="btn-org btn-lg w-full flex gap-3"
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Register"
                )}
              </Button>
            </div>

            <p className="text-center">
              Already have an account?{" "}
              <Link
                className="link text-[14px] font-[600] text-amber-700"
                to="/login"
              >
                Login
              </Link>
            </p>

            <p className="text-center font-[500] mt-4">
              Or Continue With Social Account
            </p>

            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black mt-2">
              <FcGoogle className="text-[20px]" />
              Login With Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

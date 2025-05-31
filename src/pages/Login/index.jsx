import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isShowpassword, setIsShowpassword] = useState(false);
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Login To Your Account
          </h3>

          <form className="w-full mt-5">
            <div className="form-group w-ful mb-5">
              <TextField
              
                type="input"
                id="email"
                label="Email Id"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="form-group w-full m-5">
              <TextField
                // type={isShowpassword === false ? `password` : `text`}
                id="password"
                label="password"
                variant="outlined"
                className="w-full"
              />
              <Button
                className="!absolute top-[10px] right-[10px] z-[50] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsShowpassword(!isShowpassword)}
              >
                {isShowpassword ? (
                  <IoEye className="text-[20px] opacity-75" />
                ) : (
                  <IoEyeOff className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <a className="link cursor-pointer text-[14px] font-[600]">Forgot Password?</a>

            <div className="flex item-center w-full mt-3 mb-3">

             <Button className="btn-org btn-lg w-full">Login</Button>
            </div>
            <p className="text-center">Not Registered?<Link className="link text-[14px] font-[600] text-amber-700" to="/register">Sign Up</Link></p>

            <p className="text-center font-[500]">Or Continue With Social Account</p>

            
              <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black"><FcGoogle className="text-[20px]"/> Login With Google</Button>
            
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

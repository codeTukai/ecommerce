import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import AccountSideBar from "../../components/AccountSideBar";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';
import { Collapse } from "react-collapse";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const [changePassword, setChangePassword] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) navigate("/");
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id) {
      setUserId(context.userData._id);
      setFormFields({
        name: context.userData.name,
        email: context.userData.email,
        mobile: context.userData.mobile
      });
      setChangePassword((prev) => ({
        ...prev,
        email: context.userData.email
      }));
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    if (["name", "email", "mobile"].includes(name)) {
      setFormFields(prev => ({ ...prev, [name]: value }));
    } else {
      setChangePassword(prev => ({ ...prev, [name]: value }));
    }
  };

  const validValue = Object.values(formFields).every(Boolean);
  const validValue2 = Object.values(changePassword).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.name || !formFields.email || !formFields.mobile) {
      context.alertBox("error", "All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await editData(`/api/user/${userId}`, formFields, { withCredentials: true });
      if (!res?.error) {
        context.alertBox("success", res?.data?.message);
      } else {
        context.alertBox("error", res?.data?.message);
      }
    } catch (err) {
      context.alertBox("error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = changePassword;

    if (!oldPassword || !newPassword || !confirmPassword) {
      context.alertBox("error", "Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      context.alertBox("error", "New password and confirm password do not match");
      return;
    }

    setIsLoading2(true);
    try {
      const res = await postData("/api/user/reset-password", changePassword, { withCredentials: true });
      if (!res?.error) {
        context.alertBox("success", res?.message);
        setChangePassword((prev) => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }));
      } else {
        context.alertBox("error", res?.message);
      }
    } catch (err) {
      context.alertBox("error", "Something went wrong");
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>

        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">My Profile</h2>
              <Button className="!ml-auto" onClick={() => setIsChangePasswordFormShow(!isChangePasswordFormShow)}>
                Change Password
              </Button>
            </div>
            <hr />
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              <div className="flex items-center mt-4 gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="mobile"
                    value={formFields.mobile}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <br />
              <div className="flex items-center gap-4">
                <Button type="submit" disabled={!validValue} className="btn-org btn-lg w-[150px]">
                  {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Update Profile'}
                </Button>
              </div>
            </form>
          </div>

          <Collapse isOpened={isChangePasswordFormShow}>
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Change Password</h2>
              </div>
              <hr />
              <form className="mt-8" onSubmit={handleSubmitChangePassword}>
                <div className="flex items-center gap-5">
                  <div className="w-[50%]">
                    <TextField
                      type="password"
                      label="Old Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="oldPassword"
                      value={changePassword.oldPassword}
                      onChange={onChangeInput}
                      disabled={isLoading2}
                    />
                  </div>
                  <div className="w-[50%]">
                    <TextField
                      type="password"
                      label="New Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="newPassword"
                      value={changePassword.newPassword}
                      onChange={onChangeInput}
                      disabled={isLoading2}
                    />
                  </div>
                </div>

                <div className="flex items-center mt-4 gap-5">
                  <div className="w-[50%]">
                    <TextField
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="confirmPassword"
                      value={changePassword.confirmPassword}
                      onChange={onChangeInput}
                      disabled={isLoading2}
                    />
                  </div>
                </div>

                <br />
                <div className="flex items-center gap-4">
                  <Button type="submit" disabled={!validValue2} className="btn-org btn-lg w-[200px]">
                    {isLoading2 ? <CircularProgress color="inherit" size={24} /> : 'Change Password'}
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { VscCloudUpload } from "react-icons/vsc";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { editData, uploadImage } from "../../utils/api";

const AccountSideBar = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.userData?.avatar) {
      setPreviews([context.userData.avatar]);
    }
  }, [context?.userData]);

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setUploading(true);
      const files = e.target.files;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (
          file &&
          (file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/png" ||
            file.type === "image/webp")
        ) {
          formData.append("avatar", file);
          
        } else {
          context.alertBox("error", "Only JPG, PNG, or WEBP images allowed.");
          setUploading(false);
          return;
        }
      }

      const res = await uploadImage(apiEndPoint, formData);
      setUploading(false);

      if (res?.data?.avtar) {
        setPreviews([res.data.avtar]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
  };

  return (
    <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
          {uploading ? (
            <CircularProgress color="inherit" />
          ) : previews.length > 0 ? (
            previews.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ))
          ) : (
            <img
              src="/user.jpg"
              alt="default avatar"
              className="w-full h-full object-cover"
            />
          )}

          <div className="overplay w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <VscCloudUpload className="text-white text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
              accept="image/*"
              name="avatar"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
            />
          </div>
        </div>

        <h3>{context?.userData?.name}</h3>
        <h6 className="text-[13px] font-[500]">{context?.userData?.email}</h6>
      </div>

      <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
        <li>
          <NavLink
            to="/my-account"
            className={({ isActive }) =>
              isActive ? "isActive block" : "block"
            }
          >
            <Button className="w-full !text-left !px-5 !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <FaRegCircleUser className="text-[15px]" />
              My Profile
            </Button>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/my-list"
            className={({ isActive }) =>
              isActive ? "isActive block" : "block"
            }
          >
            <Button className="w-full !text-left !px-5 !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <FaRegHeart className="text-[17px]" />
              My List
            </Button>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/my-order"
            className={({ isActive }) =>
              isActive ? "isActive block" : "block"
            }
          >
            <Button className="w-full !text-left !px-5 !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <MdOutlineShoppingCart className="text-[17px]" />
              My Orders
            </Button>
          </NavLink>
        </li>

        <li>
          <Button
            onClick={handleLogout}
            className="w-full !text-left !px-5 !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2"
          >
            <AiOutlineLogout className="text-[17px]" />
            Log Out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSideBar;

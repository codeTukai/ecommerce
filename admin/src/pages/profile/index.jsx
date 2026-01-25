import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { VscCloudUpload } from "react-icons/vsc";
import { MyContext } from "../../App";
import { editData, uploadImage } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address_details: "",
    avatar: "",
  });

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (context?.userData) {
      const { name, email, mobile, address_details, avatar } = context.userData;
      setForm({
        name: name || "",
        email: email || "",
        mobile: mobile || "",
        address_details: address_details || "",
        avatar: avatar || "",
      });
      setPreview(avatar || null);
    }
  }, [context?.userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!form.name || !form.email) {
      context.alertBox("error", "Name and Email are required");
      return;
    }

    setLoading(true);
    try {
      const res = await editData(`/api/user/${context.userData._id}`, form);
      if (!res?.error) {
        context.alertBox("success", res.message || "Profile updated successfully.");
        context.fetchUserDetails();
        setEditing(false);
        navigate("/"); // redirect after save
      } else {
        context.alertBox("error", res.message || "Failed to update profile.");
      }
    } catch (error) {
      context.alertBox("error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      context.alertBox("error", "Only JPG, PNG, and WEBP files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const res = await uploadImage("/api/user/user-avatar", formData);

      if (res?.avatar) {
        const newAvatar = res.avatar;
        setPreview(newAvatar);
        setForm((prev) => ({ ...prev, avatar: newAvatar }));

        await editData(`/api/user/${context.userData._id}`, {
          avatar: newAvatar,
        });

        context.setUserData({ ...context.userData, avatar: newAvatar });
        context.alertBox("success", "Avatar updated.");
      } else {
        context.alertBox("error", "Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      context.alertBox("error", "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-8 relative z-10">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="avatar"
              className="w-full h-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
              {uploading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <VscCloudUpload className="text-white text-lg" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={onChangeFile}
                className="hidden"
              />
            </label>
          </div>
          <h2 className="text-2xl font-bold mt-4">
            {form.name || "Admin User"}
          </h2>
          <p className="text-gray-500 text-sm">{form.email}</p>
        </div>

        {/* Form Fields */}
        <div className="mt-8 grid gap-6">
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
          />
          <TextField
            label="Email"
            value={form.email}
            fullWidth
            disabled
          />
          <TextField
            label="Mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
          />
          <TextField
            label="Address"
            name="address_details"
            value={form.address_details}
            onChange={handleChange}
            fullWidth
            disabled={!editing}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          {!editing ? (
            <Button
              onClick={() => setEditing(true)}
              className="!bg-blue-600 hover:!bg-blue-700 !text-white"
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setEditing(false)}
                className="!bg-gray-300 !text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={loading}
                className="!bg-green-600 hover:!bg-green-700 !text-white"
              >
                {loading ? <CircularProgress size={20} /> : "Save"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Background Pattern */}
      <img
        src="/pattern.jpg"
        alt=""
        className="fixed top-0 left-0 w-full h-full opacity-10 object-cover z-0"
      />
    </section>
  );
};

export default Profile;

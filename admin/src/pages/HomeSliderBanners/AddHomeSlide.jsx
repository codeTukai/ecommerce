import React, { useState, useContext } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { uploadImage, postData } from "../../utils/api";

const AddHomeSlide = () => {
  const context = useContext(MyContext);

  // 👇 Correct field name for backend
  const [formField, setFormField] = useState({
    bannerTitleName: "", 
  });

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const filtered = files.filter((file) => validTypes.includes(file.type));

    if (filtered.length === 0) {
      context.alertBox("error", "Only JPEG, PNG, or WEBP images are allowed.");
      return;
    }

    const formData = new FormData();
    filtered.forEach((file) => formData.append("images", file));

    setIsLoading(true);
    try {
      const res = await uploadImage("/api/homeSlides/uploadImages", formData);
      const uploaded = res?.data?.images || res?.images || [];

      if (uploaded.length) {
        setImages((prev) => [...prev, ...uploaded]);
        context.alertBox("success", "Images uploaded successfully");
      } else {
        throw new Error("No images returned from server.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      context.alertBox("error", error?.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ✅ Validate correct field
    if (!formField.bannerTitleName.trim()) {
      context.alertBox("error", "Title is required.");
      setIsLoading(false);
      return;
    }

    if (images.length === 0) {
      context.alertBox("error", "Please select at least one image.");
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Send correct payload to backend
     const payload = {
  bannerTitleName: formField.bannerTitleName.trim(),
  images: images.map((img) => (typeof img === "string" ? img : img.url)),
};


      const res = await postData("/api/homeSlides/add", payload);

      if (res?.success || res?.data?.success) {
        context.alertBox("success", "Slide added successfully");
        setImages([]);
        setFormField({ bannerTitleName: "" }); // reset
        context.setIsOpenFullScreenPanel({ open: false });
      } else {
        context.alertBox("error", res?.message || "Failed to add slide");
      }
    } catch (err) {
      console.error("Submit error:", err);
      context.alertBox("error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-5 bg-gray-50">
      <form onSubmit={handleSubmit} className="form py-3 p-8 space-y-6">
        {/* Slide Title */}
        <div>
          <label className="block font-semibold mb-2">
            Slide Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formField.bannerTitleName}
            onChange={(e) =>
              setFormField((prev) => ({
                ...prev,
                bannerTitleName: e.target.value,
              }))
            }
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="Enter slide title"
            required
          />
        </div>

        {/* Image Upload + Preview */}
        <div className="scroll max-h-[60vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-7 gap-4">
           {images.map((img, index) => (
  <div key={index} className="relative h-[150px]">
    <span
      onClick={() => removeImage(index)}
      className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
    >
      <IoMdClose className="text-white text-[17px]" />
    </span>
    <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-full w-full bg-gray-100 flex items-center justify-center relative">
      <LazyLoadImage
        className="w-full h-full object-cover"
        alt={`home-slide-${index}`}
        effect="blur"
        src={typeof img === "string" ? img : img.url}
      />
    </div>
  </div>
))}


            <UploadBox
              multiple={false}
              onChange={handleImageUpload}
              url="/api/homeSlides/uploadImages"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-[250px]">
          <Button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2"
            disabled={isLoading}
          >
            <FaCloudUploadAlt className="text-[25px] text-white" />
            {isLoading ? "Uploading..." : "Publish and View"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddHomeSlide;

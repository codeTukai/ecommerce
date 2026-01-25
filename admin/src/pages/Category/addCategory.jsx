import React, { useContext, useState, useEffect } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { uploadImage, postData, editData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const context = useContext(MyContext);
  const [formField, setFormField] = useState({ name: "" });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const categoryFromContext = context?.editCategory;
    if (categoryFromContext) {
      localStorage.setItem("editCategory", JSON.stringify(categoryFromContext));
    }

    const storedCategory = categoryFromContext || JSON.parse(localStorage.getItem("editCategory"));
    if (storedCategory) {
      setFormField({ name: storedCategory.name || "" });
      const imgs = Array.isArray(storedCategory.images)
        ? storedCategory.images
        : storedCategory.imageUrl
        ? [storedCategory.imageUrl]
        : [];
      setImages(imgs);
    } else {
      setFormField({ name: "" });
      setImages([]);
    }
  }, [context.editCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormField((prev) => ({ ...prev, [name]: value }));
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
      const res = await uploadImage("/api/category/uploadImages", formData);
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

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formField.name || images.length === 0) {
      alert("Please provide category name and at least one image.");
      return;
    }

    const payload = {
      name: formField.name,
      images,
    };

    try {
      let res;
      const storedEdit = context.editCategory || JSON.parse(localStorage.getItem("editCategory"));
      if (storedEdit) {
        res = await editData(`/api/category/${storedEdit._id}`, payload);
      } else {
        res = await postData("/api/category/create", payload);
      }

      if (res?.success || res?.data?.success) {
        context.alertBox("success", storedEdit ? "Category updated!" : "Category created!");
        setFormField({ name: "" });
        setImages([]);
        context.setEditCategory(null);
        localStorage.removeItem("editCategory");
        context.setIsOpenFullScreenPanel({ open: false, model: "" });
        context.getCat();
        navigate("/category/list");
      } else {
        context.alertBox("error", res?.message || "Action failed.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      context.alertBox("error", "Request failed.");
    }
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Category Name <span className="text-red-600">*</span>
              </h3>
              <input
                type="text"
                name="name"
                value={formField.name}
                onChange={handleInputChange}
                className="w-full h-[40px] border border-gray-300 rounded-sm p-3 text-sm"
                placeholder="Enter category name"
              />
            </div>
          </div>

          <h3 className="text-[18px] font-[500] mb-2 text-black">
            Category Images <span className="text-red-600">*</span>
          </h3>

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
                    alt={`category-image-${index}`}
                    effect="blur"
                    src={img}
                  />
                </div>
              </div>
            ))}

            <UploadBox multiple={true} onChange={handleImageUpload} url="/api/category/uploadImages" />
          </div>
        </div>

        <br />
        <div className="w-[250px]">
          <Button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2"
            disabled={isLoading}
          >
            <FaCloudUploadAlt className="text-[25px] text-white" />
            {isLoading
              ? "Uploading..."
              : context.editCategory || localStorage.getItem("editCategory")
              ? "Update Category"
              : "Publish and View"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;

import React, { useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddCategory = () => {
  const [formField, setFormField] = useState({
    name: "",
    parentCatName: "",
    parentId: "",
  });

  const [images, setImages] = useState([]);

  // Handle name field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  // Remove an image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formField.name || images.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate form submission
    console.log("Category Data:", formField);
    console.log("Images:", images);
    alert("Category created!");
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          {/* Category Name */}
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
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                placeholder="Enter category name"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <br />
          <h3 className="text-[18px] font-[500] mb-2 text-black">
            Category Image <span className="text-red-600">*</span>
          </h3>

          <div className="grid grid-cols-7 gap-4">
            {/* Existing Image Previews */}
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
                    src={URL.createObjectURL(img)}
                  />
                </div>
              </div>
            ))}

            {/* Upload Button */}
            <UploadBox multiple={true} onChange={handleImageUpload} />
          </div>
        </div>

        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;

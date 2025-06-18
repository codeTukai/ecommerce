import React, { useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddHomeSlide = () => {
  const [image, setImage] = useState(
    "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp"
  );

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can process or upload `image` here
    console.log("Submitting slide:", image);
  };

  return (
    <section className="p-5 bg-gray-50">
      <form onSubmit={handleSubmit} className="form py-3 p-8">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-7 gap-4">
            {/* Uploaded Image Preview */}
            {image && (
              <div className="uploadBoxWrapper relative">
                <span
                  onClick={handleRemoveImage}
                  className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                >
                  <IoMdClose className="text-white text-[17px]" />
                </span>
                <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 flex items-center justify-center relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt="Uploaded"
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src={image}
                  />
                </div>
              </div>
            )}

            {/* UploadBox: update this to accept a callback */}
            <UploadBox
              multiple={false}
              onUpload={(uploadedUrl) => setImage(uploadedUrl)}
            />
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

export default AddHomeSlide;

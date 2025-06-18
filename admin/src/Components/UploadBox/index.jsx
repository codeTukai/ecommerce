import React from "react";
import PropTypes from "prop-types";
import { FaRegImages } from "react-icons/fa6";

const UploadBox = ({ multiple = false, onChange }) => {
  return (
    <div className="uploadbox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
      <FaRegImages className="text-[40px] opacity-35 pointer-events-none" />
      <h4 className="text-[14px] text-gray-700 pointer-events-none">Image Upload</h4>

      <input
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={onChange}
        className="absolute top-0 left-0 w-full h-full z-50 opacity-0 cursor-pointer"
      />
    </div>
  );
};

UploadBox.propTypes = {
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default UploadBox;

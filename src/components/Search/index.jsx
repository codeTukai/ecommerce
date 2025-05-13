import React from 'react';
import '../Search/style.css';
import { IoSearch } from 'react-icons/io5';

const Search = () => {
  return (
    <div className="flex justify-center mt-6">
      <div className="relative w-full max-w-[400px]">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full h-[45px] pl-4 pr-12 rounded-[5px] bg-[#e5e5e5] text-[15px] outline-none"
        />

        <button
          className="absolute top-[4px] right-[4px] w-[37px] h-[37px] rounded-full bg-white text-black flex items-center justify-center shadow"
        >
          <IoSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default Search;

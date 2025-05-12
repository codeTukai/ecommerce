import React from 'react';
import '../Search/style.css'; // ✅ correct relative path
import Button from '@mui/material/Button';
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

        <Button
          variant="contained"
          className="!min-w-0 !p-0 w-[40px] h-[40px] rounded-full absolute top-1 right-1 flex items-center justify-center"
        >
          <IoSearch size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Search;

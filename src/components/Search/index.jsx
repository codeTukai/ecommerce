import React from 'react';
import '.../Search/style.css';

const Search = () => {
  return (
    <div className="flex items-start justify-center mt-6 ml-6">
  <div className='searchBox w-[100%] max-w-[400px] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
    <input
      type='text'
      placeholder='Search products...'
      className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px] bg-'

    />
  </div>
</div>
  );
};

export default Search;

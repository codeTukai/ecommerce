import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // You can add navigation or fetch logic here
  };

  return (
    <header>
      {/* Top strip */}
      <div className='top-strip py-2 border-t-[1px] border-b border-gray-250 border-b-[1px]'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <div className='coll w-[50%]'>
              <p className='text-[12px] font-[500]'>
                Get up to 50% off new season styles, limited time offers
              </p>
            </div>
            <div className='flex items-center justify-end'>
              <ul className='flex items-center gap-4'>
                <li className='list-none'>
                  <Link
                    to='/help-center'
                    className='text-[14px] font-[500] transition'
                  >
                    Help Center
                  </Link>
                </li>
                <li className='list-none'>
                  <Link
                    to='/order-tracking'
                    className='text-[14px] font-[500] transition'
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='header'>
        <div className='container flex items-center justify-between'>
          {/* Logo */}
          <div className='col1 w-[25%]'>
            <Link to='/'>
              <img
                src='/Easycart_logo_with_subtitle.jpg'
                alt='Easycart'
                className='w-[150px]'
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className='col2 w-[45%]'>
            <div className='flex'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search products...'
                className='w-full px-4 py-2 border border-gray-300 rounded-l-md'
              />
              {/* <button
                onClick={handleSearch}
                className='px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition'
              >
                Search
              </button> */}
            </div>
          </div>

          {/* Right side (optional content) */}
          <div className='col3 w-[30%]'></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";

const ProductLoading = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 1 second
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded shadow"
          >
            {/* Image placeholder */}
            <div className="w-full mb-4 h-48 bg-gray-300 rounded-sm dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>

            {/* Text placeholders */}
            <div className="w-48 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="w-36 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
          </div>
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // After 1 second, show children (real content)
  return <>{children}</>;``
};

export default ProductLoading;

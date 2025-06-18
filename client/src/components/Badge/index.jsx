import React from "react";

const Badge = ({ status }) => {
  const statusStyles = {
    pending: "bg-red-400 text-white",
    confirm: "bg-green-500 text-white",
    delivered: "bg-green-700 text-white",
    cancelled: "bg-gray-400 text-white",
    returned: "bg-yellow-400 text-black",
  };

  const classes = statusStyles[status?.toLowerCase()] || "bg-gray-200 text-black";

  return (
    <span className={`inline-block py-2 px-4 rounded-full text-[11px] capitalize ${classes}`}>
      {status}
    </span>
  );
};

export default Badge;

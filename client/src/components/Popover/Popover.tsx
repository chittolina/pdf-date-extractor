import React from "react";

const Popover = () => {
  return (
    <div
      data-popover="popover"
      className="absolute p-4 font-sans text-sm font-normal break-words whitespace-normal 
        bg-white border rounded-lg shadow-lg w-max border-blue-gray-50 
        text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none"
    >
      This is a very beautiful popover, show some love.
    </div>
  );
};

export default Popover;

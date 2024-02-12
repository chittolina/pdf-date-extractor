import React from "react";
import "./index.css";
interface Props {
  children: React.ReactNode;
}
const Popover = ({ children }: Props) => {
  return (
    <div
      className="popover absolute top-5 z-10 p-4 font-sans text-sm font-normal break-words whitespace-normal 
        bg-white border rounded-lg shadow-lg w-max border-blue-gray-50 
        text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none"
    >
      {children}
    </div>
  );
};

export default Popover;

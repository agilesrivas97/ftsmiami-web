import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="bg-white drop-shadow-md py-4">
      <div className="max-w-full flex flex-wrap items-center justify-between px-4">
        <div className="flex flex-col items-start">
            <span className="text-xl font-bold text-gray-800">Dashboard</span>
            <span className="text-sm  text-gray-800">Dashboard</span>
        </div>
        <div className="flex items-center ">
            <span className="text-xl font-bold text-gray-800">Logo</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;

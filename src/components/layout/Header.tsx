"use client"
import React from "react";
import ProfileDropdown from "../common/ProfileDropdown";
import { usePathname } from "next/navigation";

const screenTitles: { [key: string]: { title: string; description: string } } = {
  "/dashboard": { title: "Dashboard", description: "Overview of your activities" },
  "/dashboard/profile": { title: "Profile", description: "This information will be displayed publicly so be careful what you share." },
  "/dashboard/users": { title: "Users Management", description: "Manage users and roles" },
  "/dashboard/reports": { title: "Reports Management", description: "View your reports" },
  "/dashboard/companies": { title: "Companies Management", description: "View your companies" }

};

const Header: React.FC = () => {
  const pathname = usePathname();
  const currentScreen = screenTitles[pathname] || { title: "Unknown", description: "" };

  return (
    <nav className="bg-white drop-shadow-md py-4">
      <div className="max-w-full flex flex-wrap items-center justify-between px-4">
        <div className="flex flex-col items-start">
            <span className="text-xl font-bold text-gray-800">{currentScreen.title}</span>
            <span className="text-sm text-gray-800">{currentScreen.description}</span>
        </div>
        <div className="flex items-center ">
            <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};


export default Header;

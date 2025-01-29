"use client"
import React, { useState } from "react";
import { logoutUser } from '@/services/user_service';
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Unauthorized: Invalid token');
        }
        await logoutUser(token);
        localStorage.clear();
        window.location.href = '/login';
    } catch (error) {
        console.log(error);
    }
}

  return (

    <div className="">
      <img
        alt="tania andrew"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
        className="relative inline-block h-10 w-10 cursor-pointer  rounded-4xl object-cover object-center"
        data-popover-target="profile-menu"
        onClick={toggleDropdown}
      />
    <ul
      role="menu"
      data-popover="profile-menu"
      data-popover-placement="right"
      className={`absolute z-10 min-w-[280px] overflow-auto rounded-2xl border  border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none ${isOpen ? 'block' : 'hidden'}`}
      style={{ right: 10, marginTop: '0.5rem' }}
    >
      <li
        onClick={() => { router.push('/dashboard/profile'); toggleDropdown(); }}
        role="menuitem"
        className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-slate-400"
        >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
          clipRule="evenodd"
        />
        </svg>

        <p className="text-slate-800 font-medium ml-2">My Profile</p>
      </li>


      <hr className="my-2 border-slate-200" role="menuitem" />
      <li
        role="menuitem"
        onClick={logout}
        className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-slate-400"
        >
        <path
          fillRule="evenodd"
          d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
          clipRule="evenodd"
        />
        </svg>

        <p className="text-slate-800 font-medium ml-2">Sign Out</p>
      </li>
    </ul>
    </div>
  );
};

export default ProfileDropdown;

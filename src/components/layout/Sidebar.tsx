
'use client'
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Fts from '@/assets/images/FTS-Logo.png';

const Sidebar: React.FC = () => {

    return (
        <div
            className=" hidden md:relative md:flex h-screen w-full drop-shadow-md max-w-[16rem] flex-col z-30 bg-black bg-clip-border p-4 text-white shadow-sm-xl shadow-sm-blue-gray-900/5">
            <div className="p-4 mb-2"> 
                <Image
                    src={Fts}
                    alt="Federal Tactical Security"
                    width={500}
                    height={100}
                    priority
                    />
            </div>
            <nav className="flex min-w-[280px] flex-col gap-1 p-2 font-sans text-base font-normal ">
                <Link href="/dashboard"
                    className="flex items-center w-full p-3 leading-tight transition-all rounded-sm-lg outline-hidden text-start hover:bg-blue-gray-50 hover:bg-white/40 hover:rounded hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-white/40 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-white/80  active:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                    </div>
                    Home
                </Link>
                <Link href="/dashboard/reports"
                    className="flex items-center w-full p-3 leading-tight transition-all rounded-sm-lg outline-hidden text-start hover:bg-blue-gray-50 hover:bg-white/40 hover:rounded hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-white/40 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-white/40 active:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                            className="w-5 h-5">
                            <path fillRule="evenodd"
                                d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Reports
                </Link>
                <Link href="/dashboard/users"
                    className="flex items-center w-full p-3 leading-tight transition-all rounded-sm-lg outline-hidden text-start hover:bg-blue-gray-50 hover:bg-white/40 hover:rounded hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-white/40 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-white/40 active:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                            className="w-5 h-5">
                            <path fillRule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Users
                </Link>
                
            </nav>
        </div>
    );
};

export default Sidebar;

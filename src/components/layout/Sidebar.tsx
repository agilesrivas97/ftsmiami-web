
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
            <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal ">
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
                <Link href="/dashboard/companies"
                    className="flex items-center w-full p-3 leading-tight transition-all rounded-sm-lg outline-hidden text-start hover:bg-blue-gray-50 hover:bg-white/40 hover:rounded hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-white/40 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-white/40 active:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                        <path d="M 6.4765625 4.9785156 A 1.50015 1.50015 0 0 0 6.2597656 5 L 4.5 5 A 1.50015 1.50015 0 1 0 4.5 8 L 5 8 L 5 27.101562 C 3.3264954 27.357193 2 28.761589 2 30.5 L 2 41.5 A 1.50015 1.50015 0 0 0 3.5 43 L 31.5 43 A 1.50015 1.50015 0 0 0 33 41.5 L 33 30.5 C 33 28.761589 31.673505 27.357193 30 27.101562 L 30 8 L 30.5 8 A 1.50015 1.50015 0 1 0 30.5 5 L 28.746094 5 A 1.50015 1.50015 0 0 0 28.259766 5 L 6.7460938 5 A 1.50015 1.50015 0 0 0 6.4765625 4.9785156 z M 8 8 L 27 8 L 27 28.5 A 1.50015 1.50015 0 0 0 28.5 30 L 29.5 30 C 29.795045 30 30 30.204955 30 30.5 L 30 40 L 20 40 L 20 34 C 20 33.448 19.552 33 19 33 L 16 33 C 15.448 33 15 33.448 15 34 L 15 40 L 5 40 L 5 30.5 C 5 30.204955 5.2049548 30 5.5 30 L 6.5 30 A 1.50015 1.50015 0 0 0 8 28.5 L 8 8 z M 13 12 C 12.448 12 12 12.448 12 13 L 12 15 C 12 15.552 12.448 16 13 16 L 15 16 C 15.552 16 16 15.552 16 15 L 16 13 C 16 12.448 15.552 12 15 12 L 13 12 z M 20 12 C 19.448 12 19 12.448 19 13 L 19 15 C 19 15.552 19.448 16 20 16 L 22 16 C 22.552 16 23 15.552 23 15 L 23 13 C 23 12.448 22.552 12 22 12 L 20 12 z M 32 12 L 32 15 L 40.5 15 C 41.88 15 43 16.12 43 17.5 L 43 40 L 35 40 L 35 42 C 35 42.353 34.928406 42.686 34.816406 43 L 44.5 43 C 45.33 43 46 42.33 46 41.5 L 46 17.5 C 46 14.47 43.53 12 40.5 12 L 32 12 z M 13 19 C 12.448 19 12 19.448 12 20 L 12 22 C 12 22.552 12.448 23 13 23 L 15 23 C 15.552 23 16 22.552 16 22 L 16 20 C 16 19.448 15.552 19 15 19 L 13 19 z M 20 19 C 19.448 19 19 19.448 19 20 L 19 22 C 19 22.552 19.448 23 20 23 L 22 23 C 22.552 23 23 22.552 23 22 L 23 20 C 23 19.448 22.552 19 22 19 L 20 19 z M 37 19 C 36.448 19 36 19.448 36 20 L 36 22 C 36 22.552 36.448 23 37 23 L 39 23 C 39.552 23 40 22.552 40 22 L 40 20 C 40 19.448 39.552 19 39 19 L 37 19 z M 13 26 C 12.448 26 12 26.448 12 27 L 12 29 C 12 29.552 12.448 30 13 30 L 15 30 C 15.552 30 16 29.552 16 29 L 16 27 C 16 26.448 15.552 26 15 26 L 13 26 z M 20 26 C 19.448 26 19 26.448 19 27 L 19 29 C 19 29.552 19.448 30 20 30 L 22 30 C 22.552 30 23 29.552 23 29 L 23 27 C 23 26.448 22.552 26 22 26 L 20 26 z M 37 26 C 36.448 26 36 26.448 36 27 L 36 29 C 36 29.552 36.448 30 37 30 L 39 30 C 39.552 30 40 29.552 40 29 L 40 27 C 40 26.448 39.552 26 39 26 L 37 26 z M 9 33 C 8.448 33 8 33.448 8 34 L 8 36 C 8 36.552 8.448 37 9 37 L 11 37 C 11.552 37 12 36.552 12 36 L 12 34 C 12 33.448 11.552 33 11 33 L 9 33 z M 24 33 C 23.448 33 23 33.448 23 34 L 23 36 C 23 36.552 23.448 37 24 37 L 26 37 C 26.552 37 27 36.552 27 36 L 27 34 C 27 33.448 26.552 33 26 33 L 24 33 z M 37 33 C 36.448 33 36 33.448 36 34 L 36 36 C 36 36.552 36.448 37 37 37 L 39 37 C 39.552 37 40 36.552 40 36 L 40 34 C 40 33.448 39.552 33 39 33 L 37 33 z"></path>
                        </svg>
                    </div>
                    Companies
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;

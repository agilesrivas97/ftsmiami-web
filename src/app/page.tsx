'use client';

import Image from "next/image";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Fts from '@/assets/images/FTS-Logo.png';

export default function Home() {

  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    localStorage.removeItem('theme');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if(pathname.includes('/dashboard')) {
      if (token) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
    
  }, [router]);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <Image
          src={Fts}
          alt="Federal Tactical Security"
          width={500}
          height={100}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-white">
          <li className="">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded-sm-xs font-semibold">
              reports
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row text-white">
          <a
            className="rounded-sm border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-white gap-2 hover:bg-secondary hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://ftsmiami.com"
            rel="noopener noreferrer"
          >
            FTS Page
          </a>
          <a
            className="rounded-4xl border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/dashboard"
            rel="noopener noreferrer"
          >
            Admin Panel
          </a>
        </div>
      </main>
    </div>
  );
}
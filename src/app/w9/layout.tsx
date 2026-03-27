import Image from 'next/image';
import FtsLogo from '@/assets/images/FTS-Logo.png';

export const metadata = {
  title: 'W-9 Form – FTS Miami',
  description: 'Complete and sign your W-9 form online.',
};

export default function W9Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black py-3 px-6 flex items-center justify-center">
        <Image src={FtsLogo} alt="FTS Miami" height={48} priority />
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
      <footer className="text-center text-xs text-gray-400 py-6">
        © {new Date().getFullYear()} FTS Miami. All rights reserved.
      </footer>
    </div>
  );
}

// src/components/Layout.tsx

import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 drop-shadow-md">
            ทำเนียบรายชื่อสมาชิกสภาผู้แทนราษฏร
          </h1>
        </header>
        <main className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
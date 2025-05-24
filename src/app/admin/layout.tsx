"use client"

import React from 'react';
import { Package, Languages, List, Cog } from 'lucide-react';
import Link from 'next/link';
import {extractRouterConfig} from "uploadthing/server";
import {imgFileRouter} from "@/app/api/uploadthing/core";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from 'sonner';

import '../globals.css'
import {ProductProvider} from "@/context/ProductContext";
import {SessionProvider} from "next-auth/react";
import SessionWrapper from "@/app/admin/session";


// import  Link from '@/components/polyfills/Link.tsx'
interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {

  return (

  <html lang = "en" >

  <body>
  <NextSSRPlugin
      routerConfig={extractRouterConfig(imgFileRouter)}
  />
  <Toaster/>
    <div className="flex min-h-screen bg-gray-50 h-screen">
      {/* Admin Sidebar */}
      <SessionProvider>
        <SessionWrapper>

        <ProductProvider>


      <aside className="w-64 bg-white shadow-md p-4 ">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-2">
          <Link
              href="/admin"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100  focus:bg-gray-100 focus:font-medium"
          >
            <Package size={18} />
            <span>Dashboard</span>
          </Link>
          <Link
              href="/admin/products"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100  focus:bg-gray-100 focus:font-medium"

          >
            <Package size={18} />
            <span>Products</span>
          </Link>
          <Link
              href="/admin/translations"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100  focus:bg-gray-100 focus:font-medium"
          >
            <Languages size={18} />
            <span>Translations</span>
          </Link>
          <Link
              href="/admin/orders"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100  focus:bg-gray-100 focus:font-medium"
          >
            <List size={18} />
            <span>Orders</span>
          </Link>
          <Link
          href="/admin/settings"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100  focus:bg-gray-100 focus:font-medium"
          >
          <Cog size={18} />
          <span>Settings</span>
        </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">


          {children}

      </main>
        </ProductProvider>
        </SessionWrapper>

      </SessionProvider>

    </div>

  </body>
</html>
  );
};

export default AdminLayout;

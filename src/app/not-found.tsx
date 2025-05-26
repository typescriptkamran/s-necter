// app/not-found.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./globals.css";
export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname,
    );
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50 h-screen">
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-4">
                  Oops! Page not found
                </p>
                <Link
                  href="/"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

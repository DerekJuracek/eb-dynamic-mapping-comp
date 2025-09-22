import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-white shadow mb-6">
          <div className="max-w-3xl mx-auto p-4 font-semibold text-xl">
            📰 My Articles
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

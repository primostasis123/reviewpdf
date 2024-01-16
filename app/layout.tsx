import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Provider from "@/app/_trpc/Provider";

import "react-loading-skeleton/dist/skeleton.css" ;
import { Toaster } from "@/components/ui/toaster";
import "simplebar-react/dist/simplebar.min.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReviewPDF",
  description: "Chat with your documents in seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <Provider>
        <body
          className={cn(
            "min-h-screen font-sans antialiased grainy",
            inter.className
          )}
        >
          <Toaster/>
          <Navbar />
          {children}
        </body>
      </Provider>
    </html>
  );
}

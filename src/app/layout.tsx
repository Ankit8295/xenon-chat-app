"use client";
import AppProvider from "../utils/app-provider/AppProvider";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Link-App",
  description: "make new friends with link app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <AppProvider>
            <main>{children}</main>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

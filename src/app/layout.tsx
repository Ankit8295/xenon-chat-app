"use client";
import "./globals.css";
import PageWrapper from "../components/ui/PageWrapper";
import AppProvider from "../utils/app-provider/AppProvider";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
});

export const revalidate = 30;

export const metadata = {
  title: "Link-App",
  description: "Make new friends with link app",
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
            <PageWrapper>{children}</PageWrapper>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

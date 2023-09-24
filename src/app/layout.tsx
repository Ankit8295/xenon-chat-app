import "./globals.css";
import { Inter } from "next/font/google";
import AppProvider from "../utils/app-provider/AppProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
});

export const revalidate = 30;

export const metadata = {
  title: "Xenon Chat",
  description: "chat with friends with Xenon Chat",
  generator: "Ankit Kumar",
  referrer: "origin-when-cross-origin",
  keywords: ["Chat", "Message", "ChatApp", "Xenon"],
  authors: [{ name: "Ankit Kumar" }],
  publisher: "Ankit Kumar",
  colorScheme: "dark",
  category: "Messaging",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: process.env.MANIFEST_LINK,
  bookmarks: [process.env.BOOKMARK_LINK],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <main className="h-screen max-h-screen w-screen flex flex-col items-center my-auto">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}

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
        <AppProvider>
          <main className="h-screen max-h-[100dvh] w-screen flex flex-col items-center my-auto">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}

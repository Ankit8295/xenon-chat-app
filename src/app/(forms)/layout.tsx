"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  return (
    <div className="w-full  h-[100dvh] flex flex-col items-center justify-center max-w-[1750px] ">
      <div className="bg-bg_light dark:bg-bg_dark  items-start justify-center  gap-7 flex flex-col w-[70%] max-lg:w-[90%] min-h-[500px]  ring ring-white/10 shadow-2xl  px-10 pt-7 max-lg:pt-7  rounded-md overflow-hidden">
        <div className="flex max-lg:flex-col w-full ">{children}</div>
        <div className="text-sm text-black/80 dark:text-white w-full text-start max-lg:text-center max-lg:pb-7">
          {pathname.includes("login")
            ? "do not have an account ?"
            : " already have an account ?"}
          <Link
            href={pathname.includes("login") ? "/register" : "/"}
            className="px-2 text-blue-600 cursor-pointer"
          >
            {pathname.includes("login") ? "sign up" : "Log In"}
          </Link>
          here
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import HamburgerMenu from "../friends-list/HamburgerMenu";
import { signOut } from "next-auth/react";

type Props = {};

export default function UserMenu({}: Props) {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className="pl-3 pr-10 flex gap-5 items-center w-full">
      <div className="relative">
        <div
          onClick={() => setActive((prev) => !prev)}
          className={`flex flex-col items-center justify-center p-2 gap-1 w-[35px] h-[35px]  cursor-pointer rounded-[50%] transition-colors duration-200 ${
            active ? "bg-blue-500" : ""
          }`}
        >
          <HamburgerMenu />
        </div>
        <div
          id="dropDown"
          className={`${
            active
              ? "absolute transition-all duration-200 origin-top-left left-5 top-[110%] flex flex-col text-xs bg-bg_dark rounded-md"
              : "hidden"
          } `}
        >
          <span
            onClick={() => setActive(false)}
            className="px-10 py-3 hover:bg-hover_color cursor-pointer"
          >
            Profile
          </span>
          <span
            onClick={() => setActive(false)}
            className="px-10 py-3 hover:bg-hover_color cursor-pointer"
          >
            Settings
          </span>
          <span
            onClick={() => signOut()}
            className="px-10 py-3 hover:bg-hover_color cursor-pointer"
          >
            Log Out
          </span>
        </div>
      </div>
      <input
        type="search"
        className="w-full py-2 outline-none border border-transparent rounded-2xl hover:border-white/40 focus:border-blue-500 px-3 bg-[#181818] transition-colors duration-200"
        placeholder="search"
      />
    </div>
  );
}

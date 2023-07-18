"use client";
import { useState } from "react";
import HamburgerMenu from "../friends-list/HamburgerMenu";

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
            active ? "" : "hidden"
          } absolute transition-all duration-300 left-5 top-full bg-bg_dark p-5`}
        >
          <p>item</p>
          <p>item</p>
          <p>item</p>
          <p>item</p>
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

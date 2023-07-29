import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="w-full bg-black/50 max-h-screen h-screen flex items-center justify-center max-w-[1750px] ">
      <div className=" bg-white items-start justify-center  gap-7 flex w-[70%] min-h-[500px]  ring ring-white/10 shadow-2xl  px-10 pt-14 pb-7 rounded-md overflow-hidden">
        {children}
      </div>
    </div>
  );
}

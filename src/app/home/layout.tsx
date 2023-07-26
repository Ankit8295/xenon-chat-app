"use client";
import SideBar from "@/src/components/friends-list/SideBar";
import useQueryFunction from "@/src/lib/useQueries";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import { useEffect } from "react";
import { io } from "socket.io-client";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { userName } = useQueryFunction();

  if (userName)
    return (
      <div className="w-full max-h-screen h-screen flex max-w-[1650px]">
        <SideBar />
        <div className="flex flex-[5] h-full flex-col items-start w-full bg-transparent">
          {children}
        </div>
      </div>
    );
  else return <h2>Loading...layout</h2>;
}

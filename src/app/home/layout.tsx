"use client";
import SideBar from "@/src/components/friends-list/SideBar";
import Loading from "@/src/components/ui/loading/Loading";
import { socket } from "@/src/lib/socket";
import useQueryFunction from "@/src/lib/useQueries";
import { UserDb } from "@/src/utils/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { userName, getFriends } = useQueryFunction();

  const { data: friendData } = useQuery({
    queryKey: ["userFriends"],
    queryFn: () => getFriends(),
    enabled: !!userName,
  });

  useEffect(() => {
    if (userName) socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [userName]);

  if (friendData)
    return (
      <div className="w-full max-h-screen h-screen flex max-w-[1650px]">
        <SideBar />
        <div className="flex flex-[5] h-full flex-col items-start w-full bg-transparent">
          {children}
        </div>
      </div>
    );
  return <Loading text="Loading App..." />;
}

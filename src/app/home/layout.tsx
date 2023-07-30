"use client";
import { useEffect } from "react";
import { socket } from "@/src/lib/socket";
import { useQuery } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";
import Loading from "@/src/components/ui/loading/Loading";
import SideBar from "@/src/components/friends-list/SideBar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { userName, getFriends } = useQueryFunction();

  const { data: friendsData } = useQuery({
    queryKey: ["userFriends"],
    queryFn: () => getFriends(),
    enabled: !!userName,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (userName) socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [userName]);

  if (friendsData)
    return (
      <div className="w-full max-h-screen h-screen flex max-w-[1650px]">
        <SideBar />
        <div className="flex flex-[5] h-full flex-col items-start w-full">
          {children}
        </div>
      </div>
    );
  return <Loading text="Loading App..." />;
}

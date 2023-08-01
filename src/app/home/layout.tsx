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
      <div className="w-full max-h-screen h-screen flex flex-row-reverse max-w-[1650px]">
        <div className="peer flex flex-[5] h-full flex-col items-start w-full">
          {children}
        </div>
        <div className="peer-empty:block hidden max-lg:w-full lg:flex-[2]  lg:block">
          <SideBar />
        </div>
      </div>
    );
  return <Loading text="Loading App..." />;
}

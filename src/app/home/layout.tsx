"use client";
import SideBar from "@/src/components/friends-list/SideBar";
import { socket } from "@/src/lib/socket";
import useQueryFunction from "@/src/lib/useQueries";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { userName, getMessages } = useQueryFunction();

  const { data, fetchStatus } = useQuery({
    queryKey: ["Messages"],
    queryFn: () => getMessages(),
    enabled: !!userName,
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    sessionStorage.setItem(
      "messages",
      JSON.stringify(data ? data?.data.messages : {})
    );
  }, [data]);

  console.log(data, fetchStatus);
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  if (data)
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

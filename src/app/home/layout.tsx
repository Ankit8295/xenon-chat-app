"use client";
import { useEffect } from "react";
import { socket } from "@/src/lib/socket";
import { useQuery } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";
import SideBar from "@/src/components/userTab/SideBar";
import DialogBox from "@/src/components/ui/dialog-box/DialogBox";
import LoadingUi from "@/src/components/ui/loading-ui/LoadingUi";
import { useAppState } from "@/src/utils/app-provider/state-provider/ContextProvider";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { dialogFor } = useAppState();

  const { userName, getFriends, getUserDetails } = useQueryFunction();

  const { data: friendsList } = useQuery({
    queryKey: ["userFriends"],
    queryFn: () => getFriends(),
    enabled: !!userName,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: userData } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserDetails(),
    enabled: !!userName,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  useEffect(() => {
    if (userName) socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [userName]);

  if (friendsList && userData)
    return (
      <div className="relative w-full max-h-screen h-screen flex flex-row-reverse max-w-[1650px]">
        <div className="peer flex flex-[5] h-full flex-col items-start w-full">
          {children}
        </div>
        <div className="peer-empty:block hidden max-lg:w-full lg:flex-[2]  lg:block">
          <SideBar />
        </div>
        {dialogFor && <DialogBox />}
      </div>
    );
  return <LoadingUi text="Loading App..." />;
}

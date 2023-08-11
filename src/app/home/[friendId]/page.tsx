/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { socket } from "@/src/lib/socket";
import { useQuery } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";
import LoadingUi from "@/src/components/ui/loading-ui/LoadingUi";
import MessageBox from "@/src/components/friendTab/messageBox/MessageBox";
import FriendHeader from "@/src/components/friendTab/friendHeader/FriendHeader";
import FriendProfile from "@/src/components/friendTab/friendProfile/FriendProfile";
import { useAppState } from "@/src/utils/app-provider/state-provider/ContextProvider";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  const { showFrenProfile } = useAppState();

  const { getUserDetails, userName } = useQueryFunction();

  const friendUserName = decodeURIComponent(params.friendId);

  useEffect(() => {
    if (userName && friendUserName) {
      socket.emit("join", [friendUserName, userName].sort().join("-"));
    }
  }, [friendUserName]);

  const {
    data: friendData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [`${friendUserName}-profile`],
    queryFn: () => getUserDetails(friendUserName),
    enabled: !!friendUserName,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (isLoading) return <LoadingUi text="Loading User Data..." />;

  if (isSuccess) {
    const friend = friendData.data;
    return (
      <div className={`h-full w-full flex overflow-hidden  relative`}>
        <div
          className={`${
            showFrenProfile ? "w-full lg:w-3/5" : "w-full"
          }  flex flex-col justify-between transition-all duration-500`}
        >
          <FriendHeader friendName={friend.fullName} />
          <MessageBox
            friendUserName={friendUserName}
            deletedAccount={
              friend.fullName === "Deleted Account" ? true : false
            }
          />
        </div>
        <div
          className={`${
            showFrenProfile
              ? "max-lg:absolute lg:block w-full lg:w-2/5"
              : "w-full hidden lg:block lg:w-0 opacity-0"
          }    transition-all duration-500 bg-bg_light h-full dark:bg-bg_dark border-l border-primary_light dark:border-primary_dark`}
        >
          {showFrenProfile && <FriendProfile friendData={friend} />}
        </div>
      </div>
    );
  } else
    return (
      <h2 className="w-full text-center m-auto">Something Went Wrong....</h2>
    );
}

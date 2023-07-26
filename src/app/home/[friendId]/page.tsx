"use client";
import FriendMenu from "@/src/components/friendMenu/FriendMenu";
import MessageSender from "@/src/components/messageSender/MessageSender";
import { useQuery } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";
import { UserDb } from "@/src/utils/types/types";
import { useEffect } from "react";
import { useAppState } from "@/src/utils/app-provider/state-provider/ContextProvider";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  const { searchFriend, userName } = useQueryFunction();
  const { socket } = useAppState();
  const { data, isLoading } = useQuery({
    queryKey: [decodeURIComponent(params.friendId)],
    queryFn: () => searchFriend(decodeURIComponent(params.friendId)),
  });

  if (isLoading)
    return <h2 className="w-full text-center m-auto">Loading User Data...</h2>;

  if (data)
    return (
      <div className="h-full w-full flex flex-col justify-between">
        <div className="bg-primary py-3 px-4 ml-1 flex items-center justify-between">
          <span className="capitalize">{data?.data?.fullName}</span>
          <FriendMenu />
        </div>
        <MessageSender
          friendUserName={decodeURIComponent(params.friendId)}
          userName={userName!}
        />
      </div>
    );
  else
    return (
      <h2 className="w-full text-center m-auto">Something Went Wrong....</h2>
    );
}

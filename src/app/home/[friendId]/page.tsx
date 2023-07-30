/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import FriendMenu from "@/src/components/friendMenu/FriendMenu";
import MessageSender from "@/src/components/messageSender/MessageSender";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";
import { UserDb } from "@/src/utils/types/types";
import Loading from "@/src/components/ui/loading/Loading";
import { useEffect, useState } from "react";
import { useAppState } from "@/src/utils/app-provider/state-provider/ContextProvider";
import FriendProfile from "@/src/components/friendProfile/FriendProfile";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  const querClient = useQueryClient();

  const { showFrenProfile } = useAppState();
  const friendUserName = decodeURIComponent(params.friendId);

  const { userName, getMessages } = useQueryFunction();

  const [friend, setFriend] = useState<UserDb>({
    emailId: "",
    userName: "",
    fullName: "",
    photo: "",
    about: "",
  });

  useEffect(() => {
    const friendLists = querClient.getQueryData<{
      status: number;
      data: UserDb[];
    }>(["userFriends"]);

    if (friendLists) {
      setFriend(
        (prev) =>
          friendLists?.data.find(
            (friend) => friend.userName === friendUserName
          ) || prev
      );
    }
  }, []);

  const { data: friendMessages, isFetching } = useQuery({
    queryKey: [`${friendUserName}-messages`],
    queryFn: () => getMessages(friendUserName),
    enabled: !!userName,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <Loading text="Loading User Data..." />;

  if (friend && friendMessages)
    return (
      <div className={`h-full w-full flex overflow-hidden grid-flow-col`}>
        <div className="flex-1 flex flex-col justify-between">
          <div className="bg-black/50 py-3 px-4 flex items-center justify-between">
            <span className="capitalize">{friend.fullName}</span>
            <FriendMenu />
          </div>
          <MessageSender friendUserName={friendUserName} userName={userName!} />
        </div>
        {showFrenProfile && <FriendProfile />}
      </div>
    );
  else
    return (
      <h2 className="w-full text-center m-auto">Something Went Wrong....</h2>
    );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import FriendMenu from "@/src/components/friendMenu/FriendMenu";
import MessageSender from "@/src/components/messageSender/MessageSender";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";
import { UserDb } from "@/src/utils/types/types";
import Loading from "@/src/components/ui/loading/Loading";
import { useEffect, useState } from "react";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  const querClient = useQueryClient();

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
      <div className="h-full w-full flex flex-col justify-between">
        <div className="bg-primary py-3 px-4 flex items-center justify-between">
          <span className="capitalize">{friend.fullName}</span>
          <FriendMenu />
        </div>
        <MessageSender friendUserName={friendUserName} userName={userName!} />
      </div>
    );
  else
    return (
      <h2 className="w-full text-center m-auto">Something Went Wrong....</h2>
    );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { socket } from "@/src/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";
import MessageBox from "@/src/components/friendTab/messageBox/MessageBox";
import FriendHeader from "@/src/components/friendTab/friendHeader/FriendHeader";
import FriendProfile from "@/src/components/friendTab/friendProfile/FriendProfile";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import { UserDb } from "@/src/utils/types/types";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { userName } = useQueryFunction();

  const { showFrenProfile } = useAppState();

  const [friend, setFriend] = useState<UserDb>();

  const friendUserName = decodeURIComponent(params.friendId);

  useEffect(() => {
    dispatch({ type: "SET_FriendName", payload: friendUserName });
  }, [friendUserName]);

  useEffect(() => {
    if (userName && friendUserName) {
      socket.emit("join", [friendUserName, userName].sort().join("-"));
    }
  }, [friendUserName]);

  useEffect(() => {
    const friendLists = queryClient.getQueryData<{
      status: number;
      data: UserDb[];
    }>(["userFriends"]);

    if (friendLists) {
      setFriend(
        (prev) =>
          friendLists?.data.find(
            (friend) => friend.userName === friendUserName
          ) ?? prev
      );
    }
  }, []);

  if (friend) {
    return (
      <div className={`h-full w-full flex overflow-hidden  relative`}>
        <div
          className={`${
            showFrenProfile ? "w-full lg:w-3/5" : "w-full"
          }  flex flex-col justify-between transition-all duration-500`}
        >
          <FriendHeader friendName={friend?.fullName} />
          <MessageBox
            friendUserName={friendUserName}
            deletedAccount={friend.fullName === "Deleted Account"}
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

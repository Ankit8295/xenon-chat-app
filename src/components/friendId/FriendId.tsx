/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import FriendHeader from "../friendTab/friendHeader/FriendHeader";
import MessageBox from "../friendTab/messageBox/MessageBox";
import FriendProfile from "../friendTab/friendProfile/FriendProfile";
import { useQuery } from "@tanstack/react-query";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import useQueryFunction from "@/src/lib/useQueries";
import { socket } from "@/src/lib/socket";

type Props = {
  friendId: string;
};

export default function FriendId({ friendId }: Props) {
  const dispatch = useAppDispatch();
  const { showFrenProfile } = useAppState();
  const deleted = !!friendId.includes("deleted-");

  const { userName, getUserDetails } = useQueryFunction();

  const friendUserName = friendId.includes("deleted-")
    ? decodeURIComponent(friendId).split("deleted-")[1]
    : decodeURIComponent(friendId);

  useEffect(() => {
    dispatch({ type: "SET_FriendName", payload: friendUserName });
  }, [friendUserName]);

  useEffect(() => {
    if (userName && friendUserName) {
      socket.emit(
        "join",
        [friendUserName, userName].sort((a, b) => a.localeCompare(b)).join("-")
      );
    }
  }, [friendUserName]);

  const { data } = useQuery({
    queryKey: [`${friendUserName}-data`],
    queryFn: () => getUserDetails(friendUserName),
    enabled: !!friendUserName,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <div className={`h-full w-full flex overflow-hidden  relative`}>
      <div
        className={`${
          showFrenProfile && !deleted ? "w-full lg:w-3/5" : "w-full"
        }  flex flex-col justify-between transition-all duration-500`}
      >
        <FriendHeader deleted={deleted} friendData={data?.data} />
        <MessageBox friendUserName={friendUserName} deletedAccount={deleted} />
      </div>
      <div
        className={`${
          showFrenProfile && !deleted
            ? "max-lg:absolute lg:block w-full z-50 lg:w-2/5"
            : "w-full hidden lg:block lg:w-0 opacity-0"
        }    transition-all duration-500 bg-bg_light h-full dark:bg-bg_dark border-l border-primary_light dark:border-primary_dark`}
      >
        {showFrenProfile && !deleted && (
          <FriendProfile friendData={data?.data} />
        )}
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { UserDb } from "@/src/utils/types/types";
import useQueryFunction from "@/src/lib/useQueries";
import LoadingUi from "@/src/components/ui/loading-ui/LoadingUi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FriendProfile from "@/src/components/friendTab/friendProfile/FriendProfile";
import {
  useAppState,
  useAppDispatch,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import FriendHeader from "@/src/components/friendTab/friendHeader/FriendHeader";
import MessageBox from "@/src/components/friendTab/messageBox/MessageBox";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  const dispatch = useAppDispatch();

  const querClient = useQueryClient();

  const { showFrenProfile } = useAppState();

  const { userName, getMessages } = useQueryFunction();

  const friendUserName = decodeURIComponent(params.friendId);

  const [friend, setFriend] = useState<UserDb>({
    emailId: "",
    userName: "",
    fullName: "",
    photo: "",
    about: "",
  });

  useEffect(() => {
    dispatch({
      type: "SET_FriendName",
      payload: decodeURIComponent(params.friendId),
    });
  }, [params.friendId]);

  const { data: friendMessages, isLoading } = useQuery({
    queryFn: () => getMessages(friendUserName),
    queryKey: [`${friendUserName}-messages`],
    refetchOnWindowFocus: false,
    enabled: !!userName,
    retry: 0,
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

  if (isLoading) return <LoadingUi text="Loading User Data..." />;

  if (friend && friendMessages)
    return (
      <div className={`h-full w-full flex overflow-hidden  relative`}>
        <div
          className={`${
            showFrenProfile ? "w-full lg:w-3/5" : "w-full"
          }  flex flex-col justify-between transition-all duration-500`}
        >
          <FriendHeader friendName={friend.fullName} />
          <MessageBox
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
          <FriendProfile friendData={friend} />
        </div>
      </div>
    );
  else
    return (
      <h2 className="w-full text-center m-auto">Something Went Wrong....</h2>
    );
}

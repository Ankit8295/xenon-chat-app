/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import userImg from "@/public/userProfile.webp";
import { UserDb } from "@/src/utils/types/types";
import useQueryFunction from "@/src/lib/useQueries";
import Loading from "@/src/components/ui/loading/Loading";
import FriendMenu from "@/src/components/friendMenu/FriendMenu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MessageSender from "@/src/components/messageSender/MessageSender";
import FriendProfile from "@/src/components/friendProfile/FriendProfile";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import ArrowIcon from "@/src/components/icons/Icons";
import Link from "next/link";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  const querClient = useQueryClient();

  const { showFrenProfile } = useAppState();

  const dispatch = useAppDispatch();

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
      <div className={`h-full w-full flex overflow-hidden  relative`}>
        <div
          className={`${
            showFrenProfile ? "w-full lg:w-3/5" : "w-full"
          }  flex flex-col justify-between transition-all duration-500`}
        >
          <div className="bg-bg_light dark:bg-bg_dark py-3 pl-4 flex items-center justify-between border-b border-primary_light dark:border-primary_dark">
            <div className="flex gap-5 items-center">
              <Link href="/home" className="cursor-pointer">
                <ArrowIcon direction="left" />
              </Link>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "SET_ShowFrenProfile",
                    payload: !showFrenProfile,
                  })
                }
              >
                <Image
                  src={userImg}
                  alt="user_profile_img"
                  width={50}
                  height={50}
                  className=" object-cover rounded-[50%]"
                />
                <span className="capitalize">{friend.fullName}</span>
              </div>
            </div>
            <FriendMenu friendName={decodeURIComponent(params.friendId)} />
          </div>
          <MessageSender friendUserName={friendUserName} userName={userName!} />
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

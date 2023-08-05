"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import userImg from "@/public/userProfile.webp";
import { UserDb } from "@/src/utils/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { FriendsListType } from "@/src/utils/types/apiReturnTypes";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";

export default function FriendList() {
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const querClient = useQueryClient();

  const { showFrenProfile } = useAppState();

  const friendLists = querClient.getQueryData<{
    status: number;
    data: UserDb[];
  }>(["userFriends"]);

  if (friendLists)
    return (
      <>
        {typeof friendLists?.data === "object" ? (
          friendLists?.data.map((list: FriendsListType) => (
            <Link
              href={`/home/${list.userName}`}
              className={`${
                pathname.includes(list.userName)
                  ? "bg-primary_light dark:bg-primary_dark"
                  : "hover:bg-hover_light dark:hover:bg-hover_dark"
              }  w-full cursor-pointer flex items-center gap-5  p-3 rounded-lg`}
              key={list.userName}
              onClick={() =>
                showFrenProfile &&
                dispatch({ type: "SET_ShowFrenProfile", payload: false })
              }
            >
              <Image
                src={userImg}
                alt="user_profile_img"
                className="p-1 object-cover rounded-[50%] max-h-[60px] max-w-[60px] min-h-[60px] min-w-[60px] bg-blend-multiply"
              />
              {list.fullName}
            </Link>
          ))
        ) : (
          <div className="flex items-center gap-5 flex-col w-full py-5">
            <h2>No Friends Found</h2>
          </div>
        )}
      </>
    );
  return <></>;
}
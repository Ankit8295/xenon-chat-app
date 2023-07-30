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
  const querClient = useQueryClient();

  const pathname = usePathname();

  const { showFrenProfile } = useAppState();

  const dispatch = useAppDispatch();

  const friendLists = querClient.getQueryData<{
    status: number;
    data: UserDb[];
  }>(["userFriends"]);

  return (
    <>
      {friendLists?.data.length ? (
        friendLists?.data.map((list: FriendsListType) => (
          <Link
            href={`/home/${list.userName}`}
            className={`${
              pathname.includes(list.userName)
                ? "bg-blue-500"
                : "hover:bg-[#2b2b2b] "
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
              className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
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
}

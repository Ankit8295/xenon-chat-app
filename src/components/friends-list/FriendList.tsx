"use client";
import Image from "next/image";
import Link from "next/link";
import userImg from "@/public/userProfile.webp";
import { usePathname } from "next/navigation";
import { FriendsListType } from "@/src/utils/types/apiReturnTypes";
import useQueryFunction from "@/src/lib/useQueries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserDb } from "@/src/utils/types/types";

export default function FriendList() {
  const querClient = useQueryClient();

  const pathname = usePathname();

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

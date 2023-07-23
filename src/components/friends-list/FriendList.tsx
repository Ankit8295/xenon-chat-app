"use client";
import Image from "next/image";
import Link from "next/link";
import userImg from "@/public/userProfile.webp";
import { usePathname } from "next/navigation";
import { FriendsListType } from "@/src/utils/types/apiReturnTypes";

type Props = {
  Friends: FriendsListType[];
  isLoading: boolean;
};

export default function FriendList({ Friends, isLoading }: Props) {
  const pathname = usePathname();
  if (Friends)
    return (
      <>
        {Friends?.length ? (
          Friends?.map((list) => (
            <Link
              href={`/home/${list.userId}`}
              className={`${
                pathname.includes(list.userId)
                  ? "bg-purple-400"
                  : "hover:bg-[#2b2b2b] "
              }  w-full cursor-pointer flex items-center gap-5  p-3 rounded-lg`}
              key={list.userId}
            >
              <Image
                src={userImg}
                alt="user_profile_img"
                className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
              />
              {list.name}
            </Link>
          ))
        ) : (
          <div className="flex items-center gap-5 flex-col w-full py-5">
            <h2>No Friends Found</h2>
          </div>
        )}
      </>
    );
  if (isLoading)
    return (
      <h2 className="flex items-center gap-5 flex-col w-full py-5">
        Loading Friends...
      </h2>
    );
  return (
    <h2 className="flex items-center gap-5 flex-col w-full py-5">
      Something went wrong...
    </h2>
  );
}

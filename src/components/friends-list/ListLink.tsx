"use client";
import Image from "next/image";
import Link from "next/link";
import userImg from "@/public/userProfile.webp";
import { usePathname } from "next/navigation";

type Props = {
  name: string;
  email: string;
  key: number;
};

export default function FriendLink({ email, name, key }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={`/home/${email}`}
      className={`${
        pathname.includes(email) ? "bg-blue-500" : "hover:bg-[#2b2b2b] "
      }  w-full cursor-pointer flex items-center gap-5  p-3 rounded-lg`}
      key={key}
    >
      <Image
        src={userImg}
        alt="user_profile_img"
        className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
      />
      {name}
    </Link>
  );
}

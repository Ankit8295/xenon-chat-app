import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { FriendsListType } from "@/src/utils/types/apiReturnTypes";
import { getServerSession } from "next-auth";
import userImg from "@/public/userProfile.webp";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "../user-menu/UserMenu";

export default async function FriendsList({ email }: { email: string }) {
  const session = await getServerSession(authOptions);

  const { user } = session!;

  const token = user?.jwtToken;

  const friendsList = await fetch("http://localhost:3000/api/get-friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify({
      userEmail: email,
    }),
  });

  const list = (await friendsList.json()) as FriendsListType[];
  if (list.length)
    return (
      <div className="flex-[2] flex flex-col items-center w-full gap-4 bg-[#212121] p-2 overflow-hidden ">
        <div className="flex flex-col items-start gap-2 w-full">
          <UserMenu />
          <h2 className="ml-3 px-3 pt-2 rounded-md border-b-2 w-max border-b-blue-500 cursor-pointer hover:bg-[#2b2b2b]">
            Chats
          </h2>
          <div className="flex flex-col items-start w-full">
            {list?.map((list, i) => (
              <Link
                href={`/home/${list.email}`}
                className=" hover:bg-[#2b2b2b] w-full cursor-pointer flex items-center gap-5  p-3 rounded-lg"
                key={i}
              >
                <Image
                  src={userImg}
                  alt="user_profile_img"
                  className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
                />
                {list.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  return <h2>Loading...</h2>;
}

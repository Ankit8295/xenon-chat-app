import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { FriendsListType } from "@/src/utils/types/apiReturnTypes";
import { getServerSession } from "next-auth";
import userImg from "@/public/userProfile.webp";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";

export default async function FriendsList({ email }: { email: string }) {
  const session = await getServerSession(authOptions);

  const { user } = session!;

  const token = user?.jwtToken;

  const friendsList = (await fetch("http://localhost:3000/api/get-friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify({
      userEmail: email,
    }),
  }).then((res) => res.json())) as FriendsListType;

  return (
    <div className="flex-[2] flex flex-col items-center w-full gap-4 bg-[#212121] p-2 overflow-hidden ">
      <div className="pl-3 pr-10 flex gap-5 items-center w-full">
        <HamburgerMenu />
        <input
          type="search"
          className="w-full py-2 outline-none border border-transparent rounded-2xl hover:border-white/40 focus:border-blue-500 px-3 bg-[#181818] transition-colors duration-200"
          placeholder="search"
        />
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <h2 className="ml-3 px-3 pt-2 rounded-md border-b-2 w-max border-b-blue-500 cursor-pointer hover:bg-[#2b2b2b]">
          Chats
        </h2>
        <div className="flex flex-col items-start w-full">
          {friendsList?.map((list, i) => (
            <div
              className=" hover:bg-[#2b2b2b] w-full cursor-pointer flex items-center gap-5  p-3 rounded-lg"
              key={i}
            >
              <Image
                src={userImg}
                alt="user_profile_img"
                width={70}
                height={60}
                className="rounded-[50%]"
              />
              {list.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

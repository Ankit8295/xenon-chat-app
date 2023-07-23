import UserMenu from "../user-menu/UserMenu";
import FriendList from "./FriendList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export default async function sideBar({ userId }: { userId: string }) {
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
      userId: userId,
    }),
    next: {
      revalidate: 10,
    },
  });
  const list = await friendsList.json();

  return (
    <div className="flex-[2] flex flex-col items-center w-full gap-4 bg-[#212121] p-2 overflow-hidden ">
      <div className="flex flex-col items-start gap-2 w-full">
        <UserMenu />
        <h2 className="ml-3 px-3 pt-2 rounded-md border-b-2 w-max border-b-blue-500 cursor-pointer hover:bg-[#2b2b2b]">
          Chats
        </h2>
        <div className="flex flex-col items-start w-full">
          <FriendList Friends={list} />
        </div>
      </div>
    </div>
  );
}

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { FriendsListType } from "@/src/utils/types/apiReturnTypes";
import { getServerSession } from "next-auth";

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
    <div className="flex flex-col w-1/5 gap-5 bg-gray-600 py-2">
      <span className="text-center w-full">Friends-list</span>
      <div>
        {friendsList?.map((list, i) => (
          <div
            className="bg-white/20 hover:bg-white/50 cursor-pointer flex items-center gap-1 pl-5 py-2"
            key={i}
          >
            <span>{i + 1 + "."}</span>
            {list.name}
          </div>
        ))}
      </div>
    </div>
  );
}

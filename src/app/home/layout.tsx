import FriendsList from "@/src/components/friends-list/FriendsList";
import Header from "@/src/components/header/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerSession(authOptions);
  const { user } = session!;
  const name = user?.username;
  const email = user?.email;
  return (
    <div className="w-full h-full flex max-w-[1300px]">
      <FriendsList email={email!} />
      <div className="flex  flex-[5] flex-col items-start w-full">
        <Header name={name!} />
        {children}
      </div>
    </div>
  );
}

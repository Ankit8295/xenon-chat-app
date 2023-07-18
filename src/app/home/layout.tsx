import FriendsList from "@/src/components/friends-list/FriendsList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerSession(authOptions);
  const { user } = session!;
  const email = user?.email;
  if (session?.user)
    return (
      <div className="w-full max-h-screen h-screen flex max-w-[1650px]">
        <FriendsList email={email!} />
        <div className="flex  flex-[5] h-full flex-col items-start w-full bg-transparent">
          {children}
        </div>
      </div>
    );
  else return <h2>Loading...</h2>;
}

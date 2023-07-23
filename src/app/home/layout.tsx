import SideBar from "@/src/components/friends-list/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);
  const { user } = session!;
  const userId = user?.userId;
  if (user)
    return (
      <div className="w-full max-h-screen h-screen flex max-w-[1650px]">
        <SideBar userId={userId!} />
        <div className="flex  flex-[5] h-full flex-col items-start w-full bg-transparent">
          {children}
        </div>
      </div>
    );
  else return <h2>Loading...layout</h2>;
}

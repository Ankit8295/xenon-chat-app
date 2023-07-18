import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import FriendMenu from "@/src/components/friendMenu/FriendMenu";
import MessageArea from "@/src/components/messageArea/MessageArea";
import Sender from "@/src/components/messageSender/MessageSender";

type Params = {
  params: {
    friendId: string;
  };
};

export default async function page({ params }: Params) {
  const session = await getServerSession(authOptions);

  const { user } = session!;

  const token = user?.jwtToken;

  const userId = user?.email;

  const friendId = params.friendId;

  const data = await fetch(
    `http://localhost:3000/api/user?friendId=${decodeURIComponent(friendId)}`,
    {
      headers: {
        authorization: `${token}`,
      },
    }
  ).then((res) => res.json());
  if (data && userId)
    return (
      <div className="h-full w-full flex flex-col justify-between">
        <div className="bg-primary py-3 px-4 ml-1 flex items-center justify-between">
          <span className="capitalize">{data?.data?.username}</span>
          <FriendMenu />
        </div>
        <div className="bg-bg_dark h-full overflow-y-scroll px-16">
          <MessageArea friendId={friendId} userId={userId} />
        </div>
        <Sender />
      </div>
    );
  else return <h2>error</h2>;
}

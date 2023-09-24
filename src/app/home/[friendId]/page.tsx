import FriendId from "@/src/components/friendId/FriendId";
import NotFound from "../../not-found";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  if (params.friendId) return <FriendId friendId={params.friendId} />;
  return NotFound();
}

"use client";
import FriendMenu from "@/src/components/friendMenu/FriendMenu";
import MessageSender from "@/src/components/messageSender/MessageSender";
import { useQuery } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";

type Params = {
  params: {
    friendId: string;
  };
};

export default function Page({ params }: Params) {
  const { searchFriend, userId } = useQueryFunction();

  const { data, isLoading } = useQuery({
    queryKey: [params.friendId],
    queryFn: () => searchFriend(params.friendId),
  });

  if (isLoading)
    return <h2 className="w-full text-center m-auto">Loading User Data...</h2>;
  if (data)
    return (
      <div className="h-full w-full flex flex-col justify-between">
        <div className="bg-primary py-3 px-4 ml-1 flex items-center justify-between">
          <span className="capitalize">{data.data.username}</span>
          <FriendMenu />
        </div>
        <MessageSender friendId={params.friendId} userId={userId!} />
      </div>
    );
  else
    return (
      <h2 className="w-full text-center m-auto">Something Went Wrong....</h2>
    );
}

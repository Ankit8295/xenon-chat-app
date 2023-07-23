import userImg from "@/public/userProfile.webp";
import useQueryFunction from "@/src/lib/useQueries";
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";

export default function AddFriend() {
  const { addFriend } = useQueryFunction();
  const queryClient = useQueryClient();

  const searchFriendData = queryClient.getQueryData<{
    status: number;
    data: any;
  }>(["searchFriend"]);

  const { mutate } = useMutation({
    mutationFn: () => addFriend(searchFriendData?.data?.userId),
  });
  const isLoading = useIsFetching({ queryKey: ["searchFriend"] });

  if (isLoading)
    return <h2 className="w-full text-center p-3">Searching...</h2>;
  if (searchFriendData?.status === 200)
    return (
      <div className="flex items-center justify-between bg-primary w-full p-3 ">
        <div className="flex gap-2 items-center">
          <Image
            src={userImg}
            alt="user_profile_img"
            className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
          />
          {searchFriendData?.data?.username}
        </div>
        <button className="border p-2" onClick={() => mutate()}>
          Add
        </button>
      </div>
    );
  if (searchFriendData?.status === 404)
    return (
      <h2 className="w-full text-center p-3">No Friend Found with this Id</h2>
    );
  return <></>;
}

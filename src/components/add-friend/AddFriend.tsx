import userImg from "@/public/userProfile.webp";
import useQueryFunction from "@/src/lib/useQueries";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";
import { UserDb } from "@/src/utils/types/types";
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Loading from "../ui/button/Loading";

export default function AddFriend() {
  const dispatch = useAppDispatch();
  const { addFriend } = useQueryFunction();
  const queryClient = useQueryClient();

  const searchFriendData = queryClient.getQueryData<{
    status: number;
    data: UserDb;
  }>(["searchFriend"]);

  const { mutate } = useMutation({
    mutationFn: () => addFriend(searchFriendData?.data?.userName!),
  });

  const isLoading = useIsFetching({ queryKey: ["searchFriend"] });

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center p-3 gap-2">
        <Loading />
        Seaching...
      </div>
    );
  if (searchFriendData?.status === 200)
    return (
      <div className="flex items-center justify-between bg-primary w-full p-3 ">
        <div className="flex gap-2 items-center">
          <Image
            src={userImg}
            alt="user_profile_img"
            className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
          />
          {searchFriendData?.data?.fullName}
        </div>
        <button className="border p-2" onClick={() => mutate()}>
          Add
        </button>
      </div>
    );
  if (searchFriendData?.status === 403) {
    return (
      <div className="flex items-center justify-between bg-primary w-full p-3 ">
        <div className="flex gap-2 items-center">
          <Image
            src={userImg}
            alt="user_profile_img"
            className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
          />
          {searchFriendData?.data?.fullName}
        </div>
        <Link
          href={`/home/${searchFriendData?.data.userName}`}
          onClick={() => {
            dispatch({ type: "SET_SearchFriend", payload: "" });
            dispatch({ type: "SET_ShowAddFriendTab", payload: false });
          }}
        >
          <button className="border p-2">Chat</button>
        </Link>
      </div>
    );
  }
  if (searchFriendData?.status === 404)
    return (
      <h2 className="w-full text-center p-3">No Friend Found with this Id</h2>
    );
  return <></>;
}

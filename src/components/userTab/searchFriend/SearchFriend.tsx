import Link from "next/link";
import Image from "next/image";
import Loading from "../../ui/button/Loading";
import userImg from "@/public/userProfile.webp";
import { UserDb } from "@/src/utils/types/types";
import useQueryFunction from "@/src/lib/useQueries";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AddFriend } from "../../ui/button/AddFriendButton";
import { useRouter } from "next/navigation";

export default function SearchFriend() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { addFriend } = useQueryFunction();

  let searchFriendData = queryClient.getQueryData<{
    status: number;
    data: UserDb[];
  }>(["searchFriend"]);
  console.log(searchFriendData);
  const { mutate, isLoading: isAdding } = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["searchFriend"] });
      dispatch({ type: "SET_SearchFriend", payload: "" });
      dispatch({ type: "SET_ShowAddFriendTab", payload: false });
    },
  });

  const isLoading = useIsFetching({ queryKey: ["searchFriend"] });

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center p-3 gap-2">
        <Loading />
        Searching...
      </div>
    );
  if (searchFriendData?.status === 200) {
    return (
      <div className="w-full flex flex-col gap-2 ">
        {searchFriendData.data.map((friendData) => (
          <div
            key={friendData.userName}
            className="flex items-center border rounded-lg border-white/20 justify-between bg-primary w-full p-3 "
          >
            <div className="flex gap-2 items-center">
              <Image
                src={friendData.photo || userImg}
                alt="user_profile_img"
                width={60}
                height={60}
                className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
              />
              {friendData.fullName}
            </div>
            <span
              onClick={() => {
                mutate(friendData.userName);
                router.push(`/home/${friendData.userName}`);
              }}
            >
              <AddFriend type="button" label="Chat" />
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (searchFriendData?.status === 404)
    return (
      <h2 className="w-full text-center p-3">No Friend Found with this Id</h2>
    );
  return <></>;
}

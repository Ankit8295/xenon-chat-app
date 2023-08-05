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

export default function SearchFriend() {
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { addFriend } = useQueryFunction();

  let searchFriendData = queryClient.getQueryData<{
    status: number;
    data: UserDb;
  }>(["searchFriend"]);

  const { mutate, isLoading: isAdding } = useMutation({
    mutationFn: () =>
      addFriend(searchFriendData?.data?.userName!).then(() => {
        queryClient.invalidateQueries(["userFriends"]);
        queryClient.removeQueries({ queryKey: ["searchFriend"] });
      }),
    onSuccess: () => {
      dispatch({ type: "SET_ShowAddFriendTab", payload: false });
      dispatch({ type: "SET_SearchFriend", payload: "" });
    },
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
            className="p-1 rounded-[50%] max-h-[60px] max-w-[60px] min-h-[60px] min-w-[60px] mix-blend-multiply"
          />
          {searchFriendData?.data?.fullName}
        </div>
        <AddFriend
          type="button"
          loading={isAdding}
          onClick={() => mutate()}
          label="Add"
          loadingLabel="Adding"
          customStyles="min-h-[42px] my-4 max-lg:self-center"
        />
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
            queryClient.removeQueries({ queryKey: ["searchFriend"] });
            dispatch({ type: "SET_SearchFriend", payload: "" });
            dispatch({ type: "SET_ShowAddFriendTab", payload: false });
          }}
        >
          <AddFriend type="button" label="Chat" />
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

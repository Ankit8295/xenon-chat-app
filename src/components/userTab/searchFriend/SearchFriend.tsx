/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "../../ui/button/Loading";
import userImg from "@/public/userProfile.webp";
import { UserDb } from "@/src/utils/types/types";
import useQueryFunction from "@/src/lib/useQueries";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";
import { AsyncButton } from "../../ui/button/AsyncButton";

export default function SearchFriend() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const { addFriend } = useQueryFunction();

  let searchFriendData = queryClient.getQueryData<{
    status: number;
    data: UserDb[];
  }>(["searchFriend"]);

  const {
    mutate: addFriendMutation,
    isLoading: isAdding,
    isSuccess,
  } = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["searchFriend"] });
      queryClient.invalidateQueries({ queryKey: ["userFriends"] });
      dispatch({ type: "SET_SearchFriend", payload: "" });
      dispatch({ type: "SET_ShowAddFriendTab", payload: false });
      router.push(`/home/${userId}`);
    },
  });

  const isLoading = useIsFetching({ queryKey: ["searchFriend"] });

  const searchHandler = (userName: string) => {
    setUserId(userName);
    addFriendMutation(userName);
  };

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center p-3 gap-2">
        <Loading />
        Searching...
      </div>
    );

  if (searchFriendData?.status === 404)
    return (
      <h2 className="w-full text-center p-3">No Friend Found with this Id</h2>
    );

  if (searchFriendData?.status === 200) {
    return (
      <div className="w-full flex flex-col gap-2 overflow-y-scroll h-screen pb-32 pr-2">
        {searchFriendData.data.map((friendData) => (
          <div
            key={friendData.userName}
            className=" flex items-center border rounded-lg border-white/20 justify-between bg-primary w-full p-3 "
          >
            <div className="flex gap-2 items-center">
              <img
                src={friendData.photo || userImg.src}
                alt="user_profile_img"
                width={60}
                height={60}
                className="p-1 rounded-[50%] max-h-[60px] max-w-[60px] min-h-[60px] min-w-[60px] object-cover"
              />
              {friendData.fullName}
            </div>
            <AsyncButton
              type="button"
              label="Chat"
              loading={friendData.userName === userId && isAdding}
              customStyles="bg-hover_light dark:bg-hover_dark hover:bg-primary_light dark:hover:bg-primary_dark rounded  dark:text-white/80 text-black/80"
              onClick={() => searchHandler(friendData.userName)}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

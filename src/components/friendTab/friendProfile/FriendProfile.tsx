/* eslint-disable @next/next/no-img-element */
import userImg from "@/public/userProfile.webp";
import { UserDb } from "@/src/utils/types/types";
import ArrowIcon from "@/src/components/icons/Icons";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";

type Props = {
  friendData: UserDb;
};

export default function FriendProfile({ friendData }: Props) {
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        onClick={() =>
          dispatch({ type: "SET_ShowFrenProfile", payload: false })
        }
        className="cursor-pointer pt-4 px-4 flex items-center justify-between"
      >
        <div className="flex flex-col items-center justify-center p-2">
          <ArrowIcon direction="left" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 items-center justify-start pt-5 ">
        <img
          src={friendData.photo || userImg.src}
          width={60}
          height={60}
          alt="user_profile_img"
          className="max-w-[250px] max-h-[250px] min-w-[250px] min-h-[250px] object-cover rounded-[50%] "
        />
        <div className="flex flex-col items-center gap-1">
          <span className="capitalize leading-3 text-lg">
            {friendData.fullName}
          </span>
          <span className="text-sm text-black/70 dark:text-white/50">
            {friendData.emailId}
          </span>
        </div>
        <div className="w-full flex flex-col  px-5 ">
          <span className="text-sm text-black/70 dark:text-white/50">
            About
          </span>
          <span className="text-lg">{friendData?.about}</span>
        </div>
      </div>
    </>
  );
}

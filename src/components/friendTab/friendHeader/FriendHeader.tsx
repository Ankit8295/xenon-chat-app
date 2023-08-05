import Link from "next/link";
import Image from "next/image";
import userImg from "@/public/userProfile.webp";
import ArrowIcon from "@/src/components/icons/Icons";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import FriendMenu from "@/src/components/friendTab/friendHeader/components/FriendMenu";

type Props = {
  friendName: string;
};

export default function FriendHeader({ friendName }: Props) {
  const dispatch = useAppDispatch();

  const { showFrenProfile } = useAppState();

  return (
    <div className="bg-bg_light dark:bg-bg_dark py-3 pl-4 flex items-center justify-between border-b border-primary_light dark:border-primary_dark">
      <div className="flex gap-5 items-center">
        <Link href="/home" className="cursor-pointer lg:hidden block">
          <ArrowIcon direction="left" />
        </Link>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() =>
            dispatch({
              type: "SET_ShowFrenProfile",
              payload: !showFrenProfile,
            })
          }
        >
          <Image
            src={userImg}
            alt="user_profile_img"
            width={50}
            height={50}
            className=" object-cover rounded-[50%]"
          />
          <span className="capitalize">{friendName}</span>
        </div>
      </div>
      <FriendMenu />
    </div>
  );
}

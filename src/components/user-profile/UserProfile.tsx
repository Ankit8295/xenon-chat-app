import Image from "next/image";
import ArrowIcon from "../icons/Icons";
import userImg from "@/public/userProfile.webp";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";

export default function UserProfile() {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full ">
      <div
        onClick={() =>
          dispatch({ type: "SET_ShowUserProfile", payload: false })
        }
        className="bg-black/50  cursor-pointer py-3 pl-4 flex items-center justify-between"
      >
        <div className="flex flex-col items-center justify-center p-2">
          <ArrowIcon direction="left" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 items-center justify-start pt-10 ">
        <Image
          src={userImg}
          alt="user_profile_img"
          width={250}
          height={250}
          className=" object-cover rounded-[50%]"
        />
      </div>
    </div>
  );
}

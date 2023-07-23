import userImg from "@/public/userProfile.webp";
import Image from "next/image";

export default function AddFriend() {
  return (
    <div
      className={
        "hover:bg-[#2b2b2b]  w-full cursor-pointer flex items-center gap-5  p-3 rounded-lg"
      }
    >
      <Image
        src={userImg}
        alt="user_profile_img"
        className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
      />
      Ankit
    </div>
  );
}

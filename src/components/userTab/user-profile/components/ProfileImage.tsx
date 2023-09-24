/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import defaultUserImage from "@/public/userProfile.webp";
import { useEffect, useState } from "react";
import useQueryFunction from "@/src/lib/useQueries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
  const queryClient = useQueryClient();
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const { updateUserProfilePic } = useQueryFunction();

  const { mutate } = useMutation(updateUserProfilePic, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userDetails"]);
    },
  });
  useEffect(() => {
    if (profileImg) {
      const imageData = new FormData();
      imageData.set("image", profileImg);
      mutate({ data: imageData, prevImageName: imageUrl.split(".com/")[1] });
    }
  }, [profileImg]);

  return (
    <div className="relative overflow-hidden">
      <img
        src={
          profileImg
            ? URL.createObjectURL(profileImg)
            : imageUrl || defaultUserImage.src
        }
        alt="user_profile_img"
        width={250}
        height={250}
        placeholder="blur"
        style={{ borderRadius: "50%", objectFit: "cover" }}
        className="max-w-[250px] max-h-[250px] min-w-[250px] min-h-[250px] object-cover rounded-[50%]"
      />
      <label className="group absolute top-0 left-0 flex justify-center items-center w-full h-full hover:bg-black/50 rounded-[50%] hover:cursor-pointer transition-colors">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e: any) => setProfileImg(e.target.files[0])}
        />
        <span className="hidden group-hover:block">Upload/Change Profile</span>
      </label>
    </div>
  );
}

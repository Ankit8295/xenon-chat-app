/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import userImg from "@/public/userProfile.webp";
import { UserDb } from "@/src/utils/types/types";
import useQueryFunction from "@/src/lib/useQueries";
import { ChangeEvent, useEffect, useState } from "react";
import ArrowIcon, { EditIcon, SaveIcon } from "../../icons/Icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";

export default function UserProfile() {
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const [about, setAbout] = useState<string>("");

  const { updateUserProfile } = useQueryFunction();

  const [username, setUsername] = useState<string>("");

  const [startEditingName, setStartEditingName] = useState<boolean>(false);

  const [startEditingAbout, setStartEditingAbout] = useState<boolean>(false);

  useEffect(() => {
    const userData = queryClient.getQueryData<{ status: number; data: UserDb }>(
      ["userDetails"]
    );
    if (userData) {
      setUsername(userData?.data.fullName);

      setAbout(userData?.data.about!);
    }
    console.log(userData);
  }, []);

  const { mutate } = useMutation(updateUserProfile, {
    onSuccess: () => queryClient.invalidateQueries(["userDetails"]),
  });

  return (
    <div className="w-full ">
      <div
        onClick={() =>
          dispatch({ type: "SET_ShowUserProfile", payload: false })
        }
        className=" cursor-pointer pt-2 px-4 flex items-center justify-between"
      >
        <div className="flex flex-col items-center w-[35px] h-[35px] justify-center p-2">
          <ArrowIcon direction="left" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-7 items-center justify-start pt-5 ">
        <Image
          src={userImg}
          alt="user_profile_img"
          width={250}
          height={250}
          className="max-w-[250px] max-h-[250px] min-w-[250px] min-h-[250px] object-cover rounded-[50%] mix-blend-multiply"
        />
        <form className="w-full flex flex-col items-center gap-5">
          <label className="flex flex-col gap-2 items-start">
            <span className="text-xs text-black/70 dark:text-white/70">
              Your Name
            </span>
            <div
              className={`bg-bg_light dark:bg-bg_dark  py-1  flex  ${
                startEditingName
                  ? "border-b border-black/80 dark:border-white/80"
                  : "border-b border-transparent"
              }`}
            >
              <input
                type="text"
                value={username}
                className={`bg-transparent outline-none`}
                disabled={!startEditingName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />

              {!startEditingName ? (
                <div
                  className="cursor-pointer"
                  onClick={() => setStartEditingName(true)}
                >
                  <EditIcon />
                </div>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    mutate({ data: username, dataFor: "fullName" });
                    setStartEditingName(false);
                  }}
                >
                  <SaveIcon />
                </div>
              )}
            </div>
          </label>
          <label className="flex flex-col gap-2 items-start">
            <span className="text-xs text-black/70 dark:text-white/70">
              About
            </span>
            <div
              className={`bg-bg_light dark:bg-bg_dark  py-1  flex  ${
                startEditingAbout
                  ? "border-b border-black/80 dark:border-white/80"
                  : "border-b border-transparent"
              }`}
            >
              <input
                type="text"
                value={about}
                className={`bg-transparent outline-none`}
                disabled={!startEditingAbout}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAbout(e.target.value)
                }
              />

              {!startEditingAbout ? (
                <div
                  className="cursor-pointer"
                  onClick={() => setStartEditingAbout(true)}
                >
                  <EditIcon />
                </div>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    mutate({ data: about, dataFor: "about" });
                    setStartEditingAbout(false);
                  }}
                >
                  <SaveIcon />
                </div>
              )}
            </div>
          </label>
        </form>
      </div>
    </div>
  );
}

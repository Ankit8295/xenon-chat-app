"use client";
import { useState } from "react";
import HamburgerMenu from "../friends-list/HamburgerMenu";
import { signOut, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import ArrowIcon from "../icons/Icons";
import userImg from "@/public/userProfile.webp";
import Image from "next/image";

type Props = {};

export default function UserMenu({}: Props) {
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data } = useSession();
  const user = data?.user;
  const token = user?.jwtToken;
  const [active, setActive] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>(null);

  const { register, handleSubmit } = useForm<{ searchId: string }>();

  const submitForm: SubmitHandler<{ searchId: string }> = async (data) => {
    setSearchData(null);
    setSubmitting(true);
    setShowSearchBox(true);
    const searchedUser = await fetch(
      `http://localhost:3000/api/user?friendId=${data.searchId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      }
    );
    let result = await searchedUser.json();
    if (result) {
      setSubmitting(false);
      return setSearchData(result);
    }
  };
  const addFriend = async () => {
    await fetch("http://localhost:3000/api/add-friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({
        friendEmail: searchData.data.userId,
        userEmail: user?.userId,
      }),
    });
  };
  return (
    <div className="px-4 flex justify-between gap-5 items-center w-full relative">
      <div className="relative">
        <div
          onClick={() => setActive((prev) => !prev)}
          className={`flex flex-col items-center justify-center p-2 gap-1 w-[35px] h-[35px]  cursor-pointer rounded-[50%] transition-colors duration-200 ${
            active ? "bg-blue-500" : ""
          }`}
        >
          {active ? <ArrowIcon direction="left" /> : <HamburgerMenu />}
        </div>

        <div
          id="dropDown"
          className={`${
            active
              ? "absolute transition-all duration-200 origin-top-left left-5 top-[110%] flex flex-col text-xs bg-bg_dark rounded-md"
              : "hidden"
          } `}
        >
          <span
            onClick={() => setActive(false)}
            className="px-7 py-3 hover:bg-hover_color cursor-pointer"
          >
            Profile
          </span>
          <span
            onClick={() => setActive(false)}
            className="px-7 py-3 hover:bg-hover_color cursor-pointer"
          >
            Settings
          </span>
          <span
            onClick={() => signOut()}
            className="px-7 py-3 hover:bg-hover_color cursor-pointer"
          >
            Log Out
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full flex gap-1 border border-transparent rounded-2xl hover:border-white/40 focus:border-blue-500 pl-3 overflow-hidden bg-[#181818] transition-colors duration-200"
      >
        <input
          type="search"
          className="w-full py-2 outline-none bg-transparent"
          placeholder="search"
          onFocus={() => console.log("hii")}
          required
          {...register("searchId")}
        />
        <button
          type="submit"
          className="px-2 hover:bg-blue-500  bg-hover_color"
        >
          Search
        </button>
      </form>
      {showSearchBox && (
        <div
          className={
            " absolute z-10 bg-hover_color h-36 mx-auto top-full w-full left-0  flex items-center gap-5  p-3 rounded-lg"
          }
        >
          {submitting ? (
            <h2>Loading</h2>
          ) : searchData.status === 200 ? (
            <div className="flex items-center justify-between bg-primary w-full p-2">
              <div className="flex gap-2 items-center">
                <Image
                  src={userImg}
                  alt="user_profile_img"
                  className="p-1 rounded-[50%] max-h[60px] max-w-[60px] min-h-[60px] min-w-[60px]"
                />
                {searchData.data.username}
              </div>
              <button className="border p-2" onClick={addFriend}>
                Add
              </button>
            </div>
          ) : (
            <h2>No user Found</h2>
          )}
        </div>
      )}
    </div>
  );
}

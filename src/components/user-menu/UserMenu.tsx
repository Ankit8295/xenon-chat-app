"use client";
import { useState } from "react";
import ArrowIcon from "../icons/Icons";
import { signOut } from "next-auth/react";
import useQueryFunction from "@/src/lib/useQueries";
import { encodeEmail } from "@/src/lib/encryptDecrypt";
import HamburgerMenu from "../friends-list/HamburgerMenu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";

export default function UserMenu() {
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { searchFriend } = useQueryFunction();

  const [active, setActive] = useState<boolean>(false);

  const { showAddFriendTab, searchFriend: friendId } = useAppState();

  const { refetch } = useQuery({
    queryKey: ["searchFriend"],
    queryFn: () => searchFriend(encodeEmail(friendId)),
    enabled: false,
  });

  const submitForm = (e: any) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="px-4 flex justify-between gap-5 items-center w-full relative">
      <div className="relative">
        {showAddFriendTab ? (
          <div
            onClick={() => {
              dispatch({ type: "SET_SearchFriend", payload: "" });
              queryClient.removeQueries(["searchFriend"], { exact: true });
              dispatch({ type: "SET_ShowAddFriendTab", payload: false });
            }}
            className={`flex flex-col items-center justify-center p-2 gap-1 w-[35px] h-[35px]  cursor-pointer rounded-[50%] transition-colors duration-200 ${
              showAddFriendTab ? "bg-blue-500" : ""
            }`}
          >
            <ArrowIcon direction="left" />
          </div>
        ) : (
          <div
            onClick={() => setActive((prev) => !prev)}
            className={`flex flex-col items-center justify-center p-2 gap-1 w-[35px] h-[35px]  cursor-pointer rounded-[50%] transition-colors duration-200 ${
              active ? "bg-blue-500" : ""
            }`}
          >
            {active ? <ArrowIcon direction="left" /> : <HamburgerMenu />}
          </div>
        )}
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
        onSubmit={(e) => submitForm(e)}
        className="w-full flex gap-1 border border-transparent rounded-2xl hover:border-white/40 focus:border-blue-500 pl-3 overflow-hidden bg-[#181818] transition-colors duration-200"
      >
        <input
          type="search"
          className="w-full py-2 outline-none bg-transparent"
          placeholder="search"
          autoComplete="off"
          value={friendId}
          required
          onFocus={() => {
            setActive(false);
            dispatch({ type: "SET_ShowAddFriendTab", payload: true });
          }}
          onChange={(e) =>
            dispatch({ type: "SET_SearchFriend", payload: e.target.value })
          }
        />
        <button
          type="submit"
          className="px-2 hover:bg-blue-500  bg-hover_color"
        >
          Search
        </button>
      </form>
    </div>
  );
}

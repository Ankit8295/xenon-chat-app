"use client";
import { useState } from "react";
import ArrowIcon from "../icons/Icons";
import { signOut } from "next-auth/react";
import useQueryFunction from "@/src/lib/useQueries";
import HamburgerMenu from "../friends-list/HamburgerMenu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import DropDownLink from "./DropDownLink";
import { DropDownWrapper } from "./DropDownWrapper";

export default function UserMenu() {
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { searchFriend, userName } = useQueryFunction();

  const [active, setActive] = useState<boolean>(false);

  const { showAddFriendTab, searchFriend: friendUserName } = useAppState();

  const { refetch } = useQuery({
    queryKey: ["searchFriend"],
    queryFn: () => searchFriend(friendUserName),
    enabled: false,
    retry: 0,
  });

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (friendUserName !== userName) {
      await refetch();
      return queryClient.invalidateQueries({
        queryKey: [`${friendUserName}-messages`],
        exact: true,
        refetchType: "all",
      });
    }
  };
  return (
    <div className="px-4 py-1 flex justify-between gap-5 items-center w-full relative">
      <div className="relative">
        {showAddFriendTab ? (
          <div
            onClick={() => {
              dispatch({ type: "SET_SearchFriend", payload: "" });
              dispatch({ type: "SET_ShowAddFriendTab", payload: false });
            }}
            className={`flex flex-col items-center justify-center p-2 gap-1 w-[35px] h-[35px]  cursor-pointer rounded-[50%] transition-colors duration-300 ${
              showAddFriendTab ? "bg-hover_light dark:bg-hover_dark" : ""
            }`}
          >
            <ArrowIcon direction="left" />
          </div>
        ) : (
          <div
            onClick={() => setActive((prev) => !prev)}
            className="flex flex-col items-center justify-center p-2 gap-1 w-[35px] h-[35px]  cursor-pointer rounded-[50%] transition-colors duration-300 hover:bg-hover_light dark:hover:bg-hover_dark "
          >
            {active ? <ArrowIcon direction="left" /> : <HamburgerMenu />}
          </div>
        )}
        <DropDownWrapper active={active} openTo="left">
          <DropDownLink
            onClick={() => {
              setActive(false);
              dispatch({ type: "SET_ShowUserProfile", payload: true });
            }}
          >
            Profile
          </DropDownLink>
          <DropDownLink onClick={() => setActive(false)}>Settings</DropDownLink>
          <DropDownLink onClick={() => signOut()}>Log Out</DropDownLink>
        </DropDownWrapper>
      </div>
      <form
        onSubmit={(e) => submitForm(e)}
        className="w-full flex gap-1 border border-primary_light/50 rounded-2xl hover:border-primary_dark/60 dark:hover:border-primary_light pl-3 overflow-hidden bg-hover_light dark:bg-hover_dark transition-colors duration-300"
      >
        <input
          type="search"
          className="w-full py-2 outline-none bg-transparent"
          placeholder="Search Friends"
          autoComplete="off"
          value={friendUserName}
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
          className="px-2 hover:bg-primary_light  dark:hover:bg-primary_dark bg-hover_color"
        >
          Search
        </button>
      </form>
    </div>
  );
}

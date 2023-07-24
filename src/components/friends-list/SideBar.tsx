"use client";
import UserMenu from "../user-menu/UserMenu";
import FriendList from "./FriendList";
import { useAppState } from "@/src/utils/app-provider/state-provider/ContextProvider";
import AddFriend from "../add-friend/AddFriend";

export default function SideBar() {
  const { showAddFriendTab } = useAppState();

  return (
    <div className="flex-[2] flex flex-col items-center w-full gap-4 bg-[#212121] p-2 overflow-hidden ">
      <div className="flex flex-col items-start gap-2 w-full">
        <UserMenu />

        {showAddFriendTab ? (
          <div className="flex flex-col items-start w-full">
            <AddFriend />
          </div>
        ) : (
          <>
            <h2 className="ml-3 px-3 pt-2 rounded-md border-b-2 w-max border-b-blue-500 cursor-pointer hover:bg-[#2b2b2b]">
              Chats
            </h2>
            <div className="flex flex-col items-start w-full">
              <FriendList />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

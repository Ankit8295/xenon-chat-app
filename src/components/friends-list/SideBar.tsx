"use client";
import FriendList from "./FriendList";
import UserMenu from "../user-menu/UserMenu";
import AddFriend from "../add-friend/AddFriend";
import UserProfile from "../user-profile/UserProfile";
import { useAppState } from "@/src/utils/app-provider/state-provider/ContextProvider";

export default function SideBar() {
  const { showAddFriendTab, showUserProfile } = useAppState();

  return (
    <div className="flex-[2] h-full flex flex-col items-center w-full gap-4 bg-bg_light dark:bg-bg_dark p-2 overflow-hidden border-r border-primary_light dark:border-primary_dark">
      {showUserProfile ? (
        <UserProfile />
      ) : (
        <div className="flex flex-col items-start gap-2 w-full">
          <UserMenu />
          {showAddFriendTab ? (
            <div className="flex flex-col items-start w-full">
              <AddFriend />
            </div>
          ) : (
            <>
              <h2 className="ml-3 px-3 pt-2 rounded-md border-b-2 w-max border-b-blue-500 cursor-pointer hover:bg-hover_light dark:hover:bg-hover_dark">
                Chats
              </h2>
              <div className="flex flex-col items-start w-full">
                <FriendList />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

type DialogFor = "DeleteMessage" | "ClearChat" | "Unfriend";

export type State = {
  showAddFriendTab: boolean;
  searchFriend: string;
  showUserProfile: boolean;
  showFrenProfile: boolean;
  dialogFor: DialogFor | null;
  friendName: string;
};

export type Action =
  | {
      type: "SET_ShowAddFriendTab";
      payload: boolean;
    }
  | {
      type: "SET_ShowUserProfile";
      payload: boolean;
    }
  | {
      type: "SET_FriendName";
      payload: string;
    }
  | {
      type: "SET_ShowFrenProfile";
      payload: boolean;
    }
  | {
      type: "SET_Dialog";
      payload: DialogFor | null;
    }
  | {
      type: "SET_SearchFriend";
      payload: string;
    };

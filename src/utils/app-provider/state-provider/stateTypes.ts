export type State = {
  showAddFriendTab: boolean;
  searchFriend: string;
  showUserProfile: boolean;
  showFrenProfile: boolean;
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
      type: "SET_ShowFrenProfile";
      payload: boolean;
    }
  | {
      type: "SET_SearchFriend";
      payload: string;
    };

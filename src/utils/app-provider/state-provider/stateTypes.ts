export type State = {
  showAddFriendTab: boolean;
  searchFriend: string;
};

export type Action =
  | {
      type: "SET_ShowAddFriendTab";
      payload: boolean;
    }
  | {
      type: "SET_SearchFriend";
      payload: string;
    };

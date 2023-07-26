import { Socket } from "socket.io-client";

export type State = {
  showAddFriendTab: boolean;
  searchFriend: string;
  socket: Socket | null;
};

export type Action =
  | {
      type: "SET_ShowAddFriendTab";
      payload: boolean;
    }
  | {
      type: "SET_Socket";
      payload: Socket | null;
    }
  | {
      type: "SET_SearchFriend";
      payload: string;
    };

import { Action, State } from "./stateTypes";

function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case "SET_ShowAddFriendTab":
      return { ...state, showAddFriendTab: payload };
    case "SET_Socket":
      return { ...state, socket: payload };
    case "SET_SearchFriend":
      return { ...state, searchFriend: payload };
    default:
      return state;
  }
}
export default reducer;

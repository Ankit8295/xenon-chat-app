import { Action, State } from "./stateTypes";

function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case "SET_ShowAddFriendTab":
      return { ...state, showAddFriendTab: payload };

    case "SET_FriendName":
      return { ...state, friendName: payload };

    case "SET_DeletMsgId":
      return { ...state, deleteMsgId: payload };

    case "SET_ShowUserProfile":
      return { ...state, showUserProfile: payload };

    case "SET_ShowFrenProfile":
      return { ...state, showFrenProfile: payload };

    case "SET_SearchFriend":
      return { ...state, searchFriend: payload };

    case "SET_Dialog":
      return { ...state, dialogFor: payload };
    default:
      return state;
  }
}
export default reducer;

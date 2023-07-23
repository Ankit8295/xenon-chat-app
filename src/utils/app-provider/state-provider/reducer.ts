import { Action, State } from "./stateTypes";

function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case "SET_ShowAddFriendTab":
      return { ...state, showAddFriendTab: payload };
    default:
      return state;
  }
}
export default reducer;

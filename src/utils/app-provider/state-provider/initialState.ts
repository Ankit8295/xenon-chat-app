import { State } from "./stateTypes";

const initialState: State = {
  showAddFriendTab: false,
  searchFriend: "",
  showFrenProfile: false,
  showUserProfile: false,
  isVanishMode: true,
  dialogFor: null,
  friendName: "",
  deleteMsgId: "",
};

export default initialState;

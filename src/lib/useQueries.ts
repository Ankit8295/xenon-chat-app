import axios from "axios";
import { useSession } from "next-auth/react";

export default function useQueryFunction() {
  const { data } = useSession();
  const token = data?.user?.jwtToken || "";
  const userId = data?.user?.userId;

  async function searchFriend(friendId?: string) {
    const res = await axios({
      url: "http://localhost:3000/api/user",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      params: {
        friendId: friendId,
      },
    });
    return { status: res.data.status, data: res.data.data };
  }
  async function getFriends() {
    const res = await axios("http://localhost:3000/api/get-friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      data: JSON.stringify({
        userId: userId,
      }),
    });
    return { status: res.status, data: res.data };
  }
  async function addFriend(friendId: string) {
    const res = await axios("http://localhost:3000/api/add-friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      data: JSON.stringify({
        friendEmail: friendId,
        userEmail: userId,
      }),
    });
    return { status: res.status, data: res.data };
  }

  return {
    userId,
    token,
    searchFriend,
    getFriends,
    addFriend,
  };
}

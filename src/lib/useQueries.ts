import axios from "axios";
import { useSession } from "next-auth/react";

export default function useQueryFunction() {
  const { data } = useSession();
  const token = data?.user?.jwtToken || "";
  const userName = data?.user?.userName;

  async function searchFriend(friendUserName?: string) {
    const res = await axios({
      url: "http://localhost:3000/api/search-friend",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      params: {
        friendUserName: friendUserName,
        userName: userName,
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
        userName: userName,
      }),
    });
    return { status: res.status, data: res.data.data };
  }
  async function addFriend(friendUserName: string) {
    const res = await axios("http://localhost:3000/api/add-friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      data: JSON.stringify({
        friendUserName: friendUserName,
        userName: userName,
      }),
    });
    return { status: res.status, data: res.data };
  }

  return {
    userName,
    token,
    searchFriend,
    getFriends,
    addFriend,
  };
}

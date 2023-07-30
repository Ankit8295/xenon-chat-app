import axios from "axios";
import { useSession } from "next-auth/react";

export default function useQueryFunction() {
  const { data } = useSession();

  const token = data?.user?.jwtToken || "";

  const userName = data?.user?.userName;

  const apiUrl = process.env.NEXT_API_URL;
  console.log(apiUrl);

  async function searchFriend(friendUserName?: string) {
    const res = await axios({
      url: `${process.env.NEXT_API_URL}search-friend`,
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
    const res = await axios(`${process.env.NEXT_API_URL}get-friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      data: JSON.stringify({
        userName: userName,
      }),
    });
    return { status: res.data.status, data: res.data.data };
  }

  async function addFriend(friendUserName: string) {
    const res = await axios(`${process.env.NEXT_API_URL}add-friend`, {
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

  async function getMessages(friendName: String) {
    const res = await axios(`${process.env.NEXT_API_URL}get-messages`, {
      method: "GET",
      headers: {
        authorization: `${token}`,
      },
      params: {
        userName: userName,
        friendName: friendName,
      },
    });
    return { status: res.data.status, data: res.data.data };
  }

  return {
    userName,
    token,
    searchFriend,
    getFriends,
    addFriend,
    getMessages,
    apiUrl,
  };
}

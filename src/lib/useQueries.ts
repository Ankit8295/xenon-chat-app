import axios from "axios";
import { useSession } from "next-auth/react";

export default function useQueryFunction() {
  const { data } = useSession();

  const token = data?.user?.jwtToken || "";

  const userName = data?.user?.userName;

  async function searchFriend(friendUserName?: string) {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/search-friend`,
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
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/get-friends`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        data: JSON.stringify({
          userName: userName,
        }),
      }
    );
    return { status: res.data.status, data: res.data.data };
  }

  async function addFriend(friendUserName: string) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/add-friend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        data: JSON.stringify({
          friendUserName: friendUserName,
          userName: userName,
        }),
      }
    );
    return { status: res.status, data: res.data };
  }

  async function getMessages(friendName: String) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/get-messages`,
      {
        method: "GET",
        headers: {
          authorization: `${token}`,
        },
        params: {
          userName: userName,
          friendName: friendName,
        },
      }
    );
    return { status: res.data.status, data: res.data.data };
  }

  async function clearChat(friendName: string) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/clear-chat`,
      {
        method: "PATCH",
        headers: {
          authorization: `${token}`,
        },
        params: {
          userName: userName,
          friendName: friendName,
        },
      }
    );
    return { status: res.data.status, data: res.data.data };
  }
  async function deleteMessage({
    friendName,
    messageId,
  }: {
    friendName?: string;
    messageId?: string;
  }) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/delete-message`,
      {
        method: "PATCH",
        headers: {
          authorization: `${token}`,
        },
        params: {
          userName: userName,
          friendName: friendName,
        },
        data: JSON.stringify(messageId),
      }
    );
    return { status: res.data.status, data: res.data.data };
  }

  return {
    userName,
    token,
    searchFriend,
    getFriends,
    addFriend,
    getMessages,
    clearChat,
    deleteMessage,
  };
}

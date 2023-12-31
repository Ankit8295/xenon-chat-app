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
  async function updateUserProfilePic({
    data,
    prevImageName,
  }: {
    data: FormData;
    prevImageName: string;
  }) {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/gets3link`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: token,
      },
      data: data,
      params: {
        userName: userName,
        prevImageName,
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

  async function getMessages(friendName: string) {
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
        method: "DELETE",
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
        method: "DELETE",
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

  async function unfriend(friendName: string) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/unfriend`,
      {
        method: "DELETE",
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

  async function getUserDetails(name?: string) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user-details`,
      {
        method: "GET",
        headers: {
          authorization: `${token}`,
        },
        params: {
          userName: name || userName,
        },
      }
    );
    return { status: res.data.status, data: res.data.data };
  }
  async function updateUserProfile({
    data,
    dataFor,
  }: {
    data?: string;
    dataFor?: string;
  }) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/update-user`,
      {
        method: "PUT",
        headers: {
          authorization: `${token}`,
        },
        data: JSON.stringify({
          [dataFor!]: data,
        }),
        params: {
          userName: userName,
        },
      }
    );
    return { status: res.data.status, data: res.data.data };
  }
  async function deleteAccount() {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/delete-account`,
      {
        method: "DELETE",
        headers: {
          authorization: `${token}`,
        },
        params: {
          userName: userName,
        },
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
    unfriend,
    getUserDetails,
    updateUserProfile,
    deleteAccount,
    updateUserProfilePic,
  };
}

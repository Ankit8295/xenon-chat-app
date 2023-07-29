/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MessageArea from "../messageArea/MessageArea";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MessageType, MessagesDb } from "@/src/utils/types/types";
import { socket } from "@/src/lib/socket";
import useQueryFunction from "@/src/lib/useQueries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SendMessageIcon } from "../icons/Icons";

type Props = {
  userName: string;
  friendUserName: string;
  message?: MessageType;
};

export default function MessageSender({ friendUserName, userName }: Props) {
  const [message, setMessage] = useState<string>("");

  const [allMessages, setAllMessages] = useState<MessageType[]>([
    {
      messageId: "",
      messageBy: "",
      messageTo: "",
      messageText: "",
      messageTime: 0,
      messageType: "text",
    },
  ]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const friendMessages = queryClient.getQueryData<{
      status: number;
      data: MessageType[];
    }>([`${friendUserName}-messages`]);
    if (friendMessages) {
      setAllMessages((prev) => friendMessages?.data || prev);
    }
  }, []);

  useEffect(() => {
    socket.emit("join", [friendUserName, userName].sort().join("-"));
  }, []);

  useEffect(() => {
    socket.on("recieve_message", (data: MessageType) => {
      setAllMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("recieve_message");
    };
  }, []);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const finalMessage: MessageType = {
      messageId: Math.random().toString(),
      messageBy: userName,
      messageTo: decodeURIComponent(friendUserName),
      messageText: message,
      messageTime: Date.now(),
      messageType: "text",
    };
    socket.emit("private_message", finalMessage);
    setMessage((prev) => "");
  };
  return (
    <>
      <div className="bg-transparent h-full overflow-y-scroll px-16">
        <MessageArea
          friendUserName={friendUserName}
          userName={userName}
          message={allMessages as any}
        />
      </div>

      <form
        onSubmit={submitHandler}
        className="flex justify-center items-center"
      >
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          value={message}
          className=" my-3  w-[550px] rounded-lg  py-2 outline-none border border-transparent  hover:border-white/40 focus:border-blue-500 px-3 bg-[#181818] transition-colors duration-300"
          type="text"
          placeholder="type a message"
        />
        <button type="submit">
          <SendMessageIcon />
        </button>
      </form>
    </>
  );
}

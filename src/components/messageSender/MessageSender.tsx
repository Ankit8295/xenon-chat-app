/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { socket } from "@/src/lib/socket";
import { SendMessageIcon } from "../icons/Icons";
import { MessageType } from "@/src/utils/types/types";
import MessageArea from "../messageArea/MessageArea";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {
  userName: string;
  friendUserName: string;
  message?: MessageType;
};

export default function MessageSender({ friendUserName, userName }: Props) {
  const queryClient = useQueryClient();

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
      <div className="h-full overflow-y-scroll px-6">
        <MessageArea
          friendUserName={friendUserName}
          userName={userName}
          message={allMessages as any}
        />
      </div>

      <form
        onSubmit={submitHandler}
        className="flex justify-center items-center px-3"
      >
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          value={message}
          className=" my-3  w-[500px] rounded-lg  py-2 outline-none border border-primary_light/50  hover:border-primary_dark/60 dark:hover:border-primary_light bg-hover_light dark:bg-hover_dark px-2 transition-colors duration-300"
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

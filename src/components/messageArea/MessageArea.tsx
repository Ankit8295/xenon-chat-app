"use client";
import { MessageType } from "@/src/utils/types/types";
import Message from "./Message";

type Props = {
  userName: string;
  friendUserName: string;
  message?: MessageType[];
};

export default function MessageArea({
  userName,
  message = [],
  friendUserName,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-5 py-5 items-start">
      {message?.map((msg, i) => (
        <Message
          key={i}
          message={msg}
          friendUserName={friendUserName}
          userName={userName}
        />
      ))}
    </div>
  );
}

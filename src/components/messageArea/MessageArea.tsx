"use client";
import { MessageType } from "@/src/utils/types/types";
import { ReactNode } from "react";
import { Message } from "./Message";

type Props = {
  userName: string;
  friendUserName: string;
  message?: MessageType[];
};

export default function MessageArea({ userName, message = [] }: Props) {
  return (
    <div className="flex w-full flex-col gap-5 py-5 items-start">
      {message?.map((msg, i) => (
        <Message key={i} align={userName !== msg.messageBy ? "left" : "right"}>
          {msg.messageText}
        </Message>
      ))}
    </div>
  );
}

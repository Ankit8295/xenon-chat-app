"use client";
import { MessageType } from "@/src/utils/types/types";

type Props = {
  userName: string;
  friendUserName: string;
  message?: MessageType[];
};

export default function MessageArea({
  friendUserName,
  userName,
  message = [],
}: Props) {
  return (
    <div className="flex w-full flex-col gap-5 py-5 items-start">
      {message?.map((msg, i) =>
        userName !== msg.messageBy ? (
          <span
            onLoad={(e: any) => i === message.length - 1 && e.scrollIntoView()}
            key={i}
            className={`text-sm font-light  max-w-[40%] break-words h-auto rounded-lg  flex p-2 bg-hover_color self-start `}
          >
            {msg.messageText}
          </span>
        ) : (
          <span
            key={i}
            className={`text-sm font-light break-words max-w-[40%] h-auto  rounded-lg flex p-2 bg-hover_color self-end`}
          >
            {msg.messageText}
          </span>
        )
      )}
    </div>
  );
}

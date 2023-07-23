"use client";
import { MessageType } from "../messageSender/MessageType";

type Props = {
  userId: string;
  friendId: string;
  message: MessageType[];
};

export default function MessageArea({ friendId, userId, message }: Props) {
  return (
    <div className="flex w-full flex-col gap-5 py-5 items-start">
      {message?.map((msg, i) =>
        userId !== msg.messageBy ? (
          <span
            key={msg.messageId}
            className={`text-sm font-light  max-w-[40%] break-words h-auto rounded-lg  flex p-2 bg-hover_color self-start `}
          >
            {msg.messageText}
          </span>
        ) : (
          <span
            key={msg.messageId}
            className={`text-sm font-light break-words max-w-[40%] h-auto  rounded-lg flex p-2 bg-hover_color self-end`}
          >
            {msg.messageText}
          </span>
        )
      )}
    </div>
  );
}

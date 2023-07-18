import React from "react";

type Props = {
  userId: string;
  friendId: string;
  message?: unknown;
};

export default function MessageArea({ friendId, userId }: Props) {
  const messages = [
    {
      messageBy: userId,
      message: "this is a demo msg",
      date: 1,
    },
    {
      messageBy: friendId,
      message: "this is a demo msg",
      date: 2,
    },
    {
      messageBy: userId,
      message:
        "this is a demo msg  is a demo msg  is a demo msg  is a demo msg  is a demo msg  is a demo msg",
      date: 3,
    },
    {
      messageBy: friendId,
      message: "this is a ",
      date: 4,
    },
    {
      messageBy: friendId,
      message: "this is a demo msg",
      date: 5,
    },
    {
      messageBy: userId,
      message: "this is a demo msg",
      date: 6,
    },
    {
      messageBy: friendId,
      message: "this is a demo msg  is a demo msg",
      date: 7,
    },
    {
      messageBy: userId,
      message: "this is a demo msg this is a demo msg this is a demo msg",
      date: 8,
    },
    {
      messageBy: userId,
      message: "this",
      date: 9,
    },
    {
      messageBy: friendId,
      message:
        "this is a demo msg this is a demo msg this is a demo msg this is a demo ms this is a demo msg this is a demo msg this is a demo ms",
      date: 10,
    },
    {
      messageBy: friendId,
      message: "this is a msg this is a demo ms",
      date: 11,
    },
  ];
  return (
    <div className="flex flex-col gap-5 py-5">
      {messages?.map((msg, i) =>
        friendId === msg.messageBy ? (
          <span
            key={i}
            className={`text-sm font-light  max-w-[40%] break-words h-auto rounded-lg  flex p-2 bg-hover_color self-start`}
          >
            {msg.message}
          </span>
        ) : (
          <span
            key={i}
            className={`text-sm font-light break-words max-w-[40%] h-auto  rounded-lg flex p-2 bg-hover_color self-end  `}
          >
            {msg.message}
          </span>
        )
      )}
    </div>
  );
}

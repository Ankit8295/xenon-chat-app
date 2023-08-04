/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { v4 as uuidv4 } from "uuid";
import { socket } from "@/src/lib/socket";
import { EmojiIcon, SendMessageIcon } from "../icons/Icons";
import MessageArea from "../messageArea/MessageArea";
import { MessageType } from "@/src/utils/types/types";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useQueryFunction from "@/src/lib/useQueries";
import { useAppState } from "@/src/utils/app-provider/state-provider/ContextProvider";
import { encodeString } from "@/src/lib/encryptDecrypt";

type EmojiData = {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
};

export default function MessageSender({
  deletedAccount,
}: {
  deletedAccount: boolean;
}) {
  const queryClient = useQueryClient();

  const { userName } = useQueryFunction();

  const { friendName: friendUserName } = useAppState();

  const [message, setMessage] = useState<string>("");

  const [showEmoji, setShowEmoji] = useState<boolean>(false);

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

  const isLoadinMsgs = useIsFetching({
    queryKey: [`${friendUserName}-messages`],
  });

  useEffect(() => {
    const friendMessages = queryClient.getQueryData<{
      status: number;
      data: MessageType[];
    }>([`${friendUserName}-messages`]);

    if (friendMessages) {
      setAllMessages((prev) => friendMessages?.data || prev);
    }
  }, [isLoadinMsgs]);

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
      messageId: uuidv4().replace(/-/g, ""),
      messageBy: userName!,
      messageTo: friendUserName,
      messageText: encodeString(message),
      messageTime: Date.now(),
      messageType: "text",
    };

    socket.emit("private_message", finalMessage);

    setMessage((prev) => "");
  };

  return (
    <>
      <div className="h-full overflow-y-scroll px-6 max-lg:px-3">
        <MessageArea message={allMessages as any} />
      </div>
      {!deletedAccount ? (
        <form
          onSubmit={submitHandler}
          className="max-w-[60%] max-lg:min-w-[92.5%] min-w-[60%] my-3 bg-transparent  mx-auto flex justify-center items-center gap-1 rounded-lg  py-1 outline-none border border-transparent  bg-hover_light dark:bg-hover_dark px-2 "
        >
          <div className="relative  p-2 bg-hover_light  dark:bg-hover_dark  rounded-lg cursor-pointer  transition-colors duration-300">
            <div onClick={() => setShowEmoji((prev) => !prev)}>
              <EmojiIcon />
            </div>
            {showEmoji && (
              <div
                className="absolute left-0 -top-[1150%]"
                onMouseOut={() => setShowEmoji(false)}
              >
                <Picker
                  data={data}
                  onEmojiSelect={(e: EmojiData) =>
                    setMessage((prev) => prev + e.native)
                  }
                />
              </div>
            )}
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            value={message}
            className="bg-hover_light dark:bg-hover_dark outline-none border-none w-full text-sm"
            type="text"
            placeholder="Message"
            required
          />
          {message.length > 0 && (
            <button type="submit">
              <SendMessageIcon />
            </button>
          )}
        </form>
      ) : (
        <span className="max-w-[60%] text-black/70 dark:text-white/70  max-lg:min-w-[92.5%] min-w-[60%] my-3 bg-transparent  mx-auto flex justify-center items-center gap-1 rounded-lg  py-1 outline-none border border-transparent  ">
          message not allowed, user account is deleted or removed
        </span>
      )}
    </>
  );
}

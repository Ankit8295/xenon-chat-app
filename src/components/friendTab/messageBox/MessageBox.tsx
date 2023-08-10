/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { v4 as uuidv4 } from "uuid";
import { socket } from "@/src/lib/socket";
import MessageArea from "./components/MessageArea";
import useQueryFunction from "@/src/lib/useQueries";
import { MessageType } from "@/src/utils/types/types";
import { encodeString } from "@/src/lib/encryptDecrypt";
import { SendMessageIcon } from "../../icons/Icons";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingUi from "../../ui/loading-ui/LoadingUi";

export default function MessageBox({
  deletedAccount,
  friendUserName,
}: {
  deletedAccount: boolean;
  friendUserName: string;
}) {
  const messagesBoxRef = useRef<HTMLDivElement>(null);

  const { userName, getMessages } = useQueryFunction();

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

  const { data: friendMessages, isLoading } = useQuery({
    queryFn: () => getMessages(friendUserName),
    queryKey: [`${friendUserName}-messages`],
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const scrollToBottom = () => {
    if (messagesBoxRef.current) {
      const scrollHeight = messagesBoxRef.current.scrollHeight;
      const clientHeight = messagesBoxRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      messagesBoxRef.current.scrollTo({
        top: maxScrollTop > 0 ? maxScrollTop : 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (friendMessages) {
      scrollToBottom();
    }
  }, [allMessages]);

  useEffect(() => {
    if (friendMessages) {
      setAllMessages((prev) => friendMessages?.data || prev);
    }
  }, [friendMessages]);

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
    if (message.trim()) {
      const finalMessage: MessageType = {
        messageId: uuidv4().replace(/-/g, ""),
        messageBy: userName!,
        messageTo: friendUserName,
        messageText: encodeString(message),
        messageTime: Date.now(),
        messageType: "text",
      };
      socket.emit("private_message", finalMessage);
    }
    setMessage((prev) => "");
  };
  if (isLoading) return <LoadingUi text="Loading Messages..." />;

  if (friendMessages) {
    return (
      <>
        <div
          ref={messagesBoxRef}
          className="h-full overflow-y-scroll px-6 max-lg:px-3"
        >
          <MessageArea message={allMessages as any} />
        </div>
        {!deletedAccount ? (
          <form
            onSubmit={submitHandler}
            className="max-w-[60%] max-lg:min-w-[92.5%] min-w-[60%] my-3  mx-auto flex justify-center items-center gap-1  outline-none border border-transparent "
          >
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              className="outline-none border-none w-full text-sm  p-[.6em] bg-hover_light dark:bg-hover_dark  rounded-lg "
              type="text"
              placeholder="Message"
              required
            />
            <button type="submit">
              <SendMessageIcon />
            </button>
          </form>
        ) : (
          <span className="max-w-[60%] text-black/70 dark:text-white/70  max-lg:min-w-[92.5%] min-w-[60%] my-3 bg-transparent  mx-auto flex justify-center items-center gap-1 rounded-lg  py-1 outline-none border border-transparent  ">
            message not allowed, user account is deleted or removed
          </span>
        )}
      </>
    );
  } else
    return (
      <h2 className="w-full text-center m-auto">Something Went Wrong....</h2>
    );
}

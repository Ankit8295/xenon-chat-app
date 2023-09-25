/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { v4 } from "uuid";
import { socket } from "@/src/lib/socket";
import { useQuery } from "@tanstack/react-query";
import MessageArea from "./components/MessageArea";
import { SendMessageIcon } from "../../icons/Icons";
import useQueryFunction from "@/src/lib/useQueries";
import LoadingUi from "../../ui/loading-ui/LoadingUi";
import { MessageType } from "@/src/utils/types/types";
import { encodeString } from "@/src/lib/encryptDecrypt";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export default function MessageBox({
  deletedAccount,
  friendUserName,
}: {
  deletedAccount?: boolean;
  friendUserName: string;
}) {
  const [isVanishMode, setIsVanishMode] = useState<boolean>(true);

  const messagesBoxRef = useRef<HTMLDivElement>(null);

  const { userName, getMessages } = useQueryFunction();

  const [message, setMessage] = useState<string>("");

  const [allMessages, setAllMessages] = useState<MessageType[] | null>(null);

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
      setAllMessages((prev) => (prev ? [...prev, data] : null));
    });
    return () => {
      socket.off("recieve_message");
    };
  }, []);

  useEffect(() => {
    socket.on("on_Vanish_Mode", (data: boolean) => {
      setIsVanishMode(data);
    });
    return () => {
      socket.off("on_Vanish_Mode");
    };
  }, [isVanishMode]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const finalMessage: MessageType = {
        messageId: v4().replace(/-/g, ""),
        messageBy: userName!,
        messageTo: friendUserName,
        messageText: encodeString(message),
        messageTime: Date.now(),
        messageType: "text",
      };
      socket.emit("private_message", {
        messageData: finalMessage,
        vanish: isVanishMode,
      });
      setMessage((prev) => "");
    }
  };

  if (isLoading) return <LoadingUi text="Loading Messages..." />;

  if (friendMessages) {
    return (
      <>
        {allMessages && (
          <div
            ref={messagesBoxRef}
            className="h-full w-full relative overflow-y-scroll px-6 max-lg:px-3"
          >
            <div className="sticky flex items-center gap-3 z-30 top-1 left-1/2 -translate-x-1/2 w-max p-2 border border-white/30 rounded-md">
              Private
              <div
                className={`relative w-[50px] h-[25px] select-none rounded-[50px] transition-colors duration-300 ${
                  isVanishMode ? "bg-green-400" : "bg-red-400"
                }`}
              >
                <label
                  className={`${
                    isVanishMode ? "after:translate-x-[25px]" : ""
                  } absolute w-[50px] h-[25px] cursor-pointer transition-all duration-[0.3s] ease-[ease] rounded-[50px] left-0 top-0 after:content-[''] after:absolute after:w-[23px]  after:h-[23px] after:bg-white after:shadow-[0_1px_3px_rgba(0,0,0,0.3)] after:transition-all after:duration-[0.3s] after:ease-[ease] after:rounded-[50%] after:left-px after:top-px hover:after:shadow-[0_1px_3px_rgba(0,0,0,0.3)] `}
                >
                  <input
                    onChange={() =>
                      socket.emit("emit_vanish_mode", {
                        roomId: [friendUserName, userName]
                          .sort((a: any, b: any) => a.localeCompare(b))
                          .join("-"),
                        vanishMode: !isVanishMode,
                      })
                    }
                    checked={isVanishMode}
                    className="hidden"
                    id="check-apple"
                    type="checkbox"
                  />
                </label>
              </div>
            </div>
            <MessageArea message={allMessages as any} />
          </div>
        )}
        {!deletedAccount ? (
          <form
            onSubmit={submitHandler}
            className="max-w-[60%] max-lg:min-w-[100%] max-lg:pb-3 max-lg:pr-1 min-w-[60%] my-5  max-lg:my-0 mx-auto flex justify-center items-center gap-1  outline-none border border-transparent max-lg:bg-hover_light max-lg:dark:bg-hover_dark "
          >
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              className="outline-none border-none w-full text-base p-5 bg-hover_light dark:bg-hover_dark max-lg:rounded-none  rounded-lg "
              type="text"
              placeholder="Type Message"
              value={message}
              required
            />
            <button
              type="submit"
              className={`rounded-[50%] bg-blue-500 h-[45px] w-[55px] flex items-center justify-center `}
            >
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

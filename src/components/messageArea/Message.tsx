import React, { useState } from "react";
import { DropDownWrapper } from "../user-menu/DropDownWrapper";
import DropDownLink from "../user-menu/DropDownLink";
import ArrowIcon from "../icons/Icons";
import { MessageType } from "@/src/utils/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryFunction from "@/src/lib/useQueries";

type Props = {
  userName: string;
  message: MessageType;
  friendUserName: string;
};

export default function Message({
  message: msg,
  userName,
  friendUserName,
}: Props) {
  const [messageDropDown, setMessageDropDown] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { deleteMessage } = useQueryFunction();

  const { mutateAsync } = useMutation(deleteMessage, {
    onSuccess: () =>
      queryClient.invalidateQueries([`${friendUserName}-messages`]),
  });
  if (msg)
    return (
      <div
        className={`relative font-light  max-w-[40%] max-lg:max-w-[75%] break-words h-auto rounded-b-xl   flex pl-3 pr-2 gap-2 items-center bg-bg_light dark:bg-bg_dark ${
          userName !== msg.messageBy
            ? " self-start rounded-tr-xl bg-bg_light dark:bg-primary_dark"
            : "self-end rounded-tl-xl bg-primary_light dark:bg-blue-500"
        }`}
      >
        <span className="py-2 text-sm">{msg.messageText}</span>

        <span className="self-end text-[.6em] pb-[.1em] text-black/70  dark:text-white/60">
          {new Date(msg.messageTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
        <div
          className={`absolute cursor-pointer p-1 right-1 top-1  ${
            userName !== msg.messageBy
              ? "bg-bg_light dark:bg-primary_dark"
              : "bg-primary_light dark:bg-blue-500"
          }`}
        >
          <div onClick={() => setMessageDropDown((prev) => !prev)}>
            <ArrowIcon direction="bottom" width="10" height="10" />
          </div>
          <DropDownWrapper
            active={messageDropDown}
            openTo={userName !== msg.messageBy ? "left" : "right"}
          >
            <DropDownLink>Copy</DropDownLink>
            <DropDownLink
              onClick={() =>
                mutateAsync({
                  friendName: friendUserName,
                  messageId: msg.messageId,
                })
              }
            >
              Delete
            </DropDownLink>
          </DropDownWrapper>
        </div>
      </div>
    );
  return <></>;
}

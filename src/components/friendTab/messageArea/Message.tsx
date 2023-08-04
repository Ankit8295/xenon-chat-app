import { useState } from "react";
import ArrowIcon from "../../icons/Icons";
import DropDownLink from "../../ui/dropdown/DropDownLink";
import { MessageType } from "@/src/utils/types/types";
import { DropDownWrapper } from "../../ui/dropdown/DropDownWrapper";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";
import useQueryFunction from "@/src/lib/useQueries";
import { decodeString } from "@/src/lib/encryptDecrypt";

type Props = {
  message: MessageType;
};

export default function Message({ message: msg }: Props) {
  const { userName } = useQueryFunction();

  const [messageDropDown, setMessageDropDown] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  return (
    <div
      className={`relative font-light  max-w-[40%] max-lg:max-w-[75%] break-words h-auto rounded-b-xl   flex pl-3 pr-2 gap-2 items-center bg-bg_light dark:bg-bg_dark ${
        userName !== msg.messageBy
          ? " self-start rounded-tr-xl bg-bg_light dark:bg-primary_dark"
          : "self-end rounded-tl-xl bg-primary_light dark:bg-blue-500"
      }`}
    >
      <span className="py-2 text-sm">{decodeString(msg.messageText)}</span>
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
            onClick={() => {
              dispatch({ type: "SET_Dialog", payload: "DeleteMessage" });
              dispatch({ type: "SET_DeletMsgId", payload: msg.messageId });
              setMessageDropDown(false);
            }}
          >
            Delete
          </DropDownLink>
        </DropDownWrapper>
      </div>
    </div>
  );
}

import { useState } from "react";
import useQueryFunction from "@/src/lib/useQueries";
import ArrowIcon from "@/src/components/icons/Icons";
import { MessageType } from "@/src/utils/types/types";
import { decodeString } from "@/src/lib/encryptDecrypt";
import DropDownLink from "@/src/components/ui/dropdown/DropDownLink";
import { DropDownWrapper } from "@/src/components/ui/dropdown/DropDownWrapper";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";

type Props = {
  message: MessageType;
};

export default function MessageWrapper({ message: msg }: Props) {
  const dispatch = useAppDispatch();

  const { userName } = useQueryFunction();

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [messageDropDown, setMessageDropDown] = useState<boolean>(false);

  return (
    <div
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => {
        setShowOptions(false);
        setMessageDropDown(false);
      }}
      className={`relative font-light  max-w-[40%] max-lg:max-w-[75%] break-words h-auto rounded-b-xl   flex pl-3 pr-2 gap-2 items-center bg-bg_light dark:bg-bg_dark ${
        userName !== msg.messageBy
          ? " self-start rounded-tr-xl bg-bg_light dark:bg-primary_dark"
          : "self-end rounded-tl-xl bg-primary_light dark:bg-blue-500"
      }`}
    >
      <span className="py-2 text-sm">{decodeString(msg.messageText)}</span>
      <span className="self-end pb-1 text-[.6em]  text-black/70  leading-none dark:text-white/60">
        {new Date(msg.messageTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </span>
      <div className="absolute right-2 top-1 flex flex-col">
        {showOptions && (
          <div
            className="cursor-pointer "
            onClick={() => setMessageDropDown((prev) => !prev)}
          >
            <ArrowIcon
              direction="bottom"
              width="11"
              height="11"
              styles={"opacity-70"}
            />
          </div>
        )}
        <DropDownWrapper
          active={!!(messageDropDown && showOptions)}
          openTo={userName !== msg.messageBy ? "left" : "right"}
          styles={`top-[150%] ${
            userName !== msg.messageBy ? "-left-4" : "right-0"
          } `}
        >
          <DropDownLink
            onClick={() => {
              navigator.clipboard.writeText(decodeString(msg.messageText));
              setMessageDropDown(false);
            }}
          >
            Copy
          </DropDownLink>
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

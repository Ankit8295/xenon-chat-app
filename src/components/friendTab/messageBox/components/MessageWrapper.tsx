import { useEffect, useRef, useState } from "react";
import useQueryFunction from "@/src/lib/useQueries";
import ArrowIcon from "@/src/components/icons/Icons";
import { MessageType } from "@/src/utils/types/types";
import { decodeString } from "@/src/lib/encryptDecrypt";
import DropDownLink from "@/src/components/ui/dropdown/DropDownLink";
import { useAppDispatch } from "@/src/utils/app-provider/state-provider/ContextProvider";

type Props = {
  message: MessageType;
};

export default function MessageWrapper({ message: msg }: Props) {
  const dispatch = useAppDispatch();

  const { userName } = useQueryFunction();

  const dropDownRef = useRef<HTMLDivElement>(null);

  const [messageDropDown, setMessageDropDown] = useState<boolean>(false);

  useEffect(() => {
    function handleClick(e: any) {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setMessageDropDown(false);
      }
    }
    if (messageDropDown) {
      document.addEventListener("click", handleClick, true);
    }
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [messageDropDown]);

  return (
    <div
      className={`group relative font-light  max-w-[40%] max-lg:max-w-[75%] break-words h-auto rounded-b-xl   flex pl-3 pr-2 gap-2 items-center bg-bg_light dark:bg-bg_dark ${
        userName !== msg.messageBy
          ? " self-start rounded-tr-xl bg-bg_light dark:bg-primary_dark"
          : "self-end rounded-tl-xl bg-primary_light dark:bg-blue-500"
      }`}
    >
      <span className="py-2 text-sm">{decodeString(msg.messageText)}</span>
      <span className="self-end w-max pb-1 text-[.6em]  text-black/70  leading-none dark:text-white/60">
        {new Date(msg.messageTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </span>
      <div className="absolute right-2 top-1 flex flex-col">
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
        <div
          ref={dropDownRef}
          className={`${
            !messageDropDown
              ? "hidden"
              : `absolute -top-8 z-50 transition-all right-5 duration-300 overflow-hidden whitespace-nowrap  flex flex-col text-xs bg-hover_light dark:bg-hover_dark rounded-md `
          }`}
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
              dispatch({ type: "SET_DeleteMsgId", payload: msg.messageId });
              setMessageDropDown(false);
            }}
          >
            Delete
          </DropDownLink>
        </div>
      </div>
    </div>
  );
}

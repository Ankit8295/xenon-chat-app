"use client";
import useQueryFunction from "@/src/lib/useQueries";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import ButtonWrapper from "../button/ButtonWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unknown } from "zod";
import { redirect } from "next/navigation";

type Props = {};
type DialoagData = {
  heading: string;
  subHeading: string;
  buttons: ButtonType;
  extraButton?: ButtonType;
};
type ButtonType = {
  heading: string;
  function: () => Promise<any>;
};
export default function DialogBox({}: Props) {
  const { dialogFor, friendName } = useAppState();

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { clearChat, unfriend, deleteMessage } = useQueryFunction();

  const { mutate: deleteMessageFn } = useMutation(deleteMessage, {
    onSuccess: () => queryClient.invalidateQueries([`${friendName}-messages`]),
  });

  const { mutate: clearChatFn } = useMutation({
    mutationFn: () => clearChat(friendName),
    onSuccess: () => queryClient.invalidateQueries([`${friendName}-messages`]),
  });

  const { mutate: unfriendFn } = useMutation({
    mutationFn: () => unfriend(friendName),
    onSuccess: () => {
      queryClient.invalidateQueries([`userFriends`]);
      redirect("/home");
    },
  });

  const data = {
    DeleteMessage: {
      heading: "Delete Message",
      subHeading: "Are you sure you want to delete this message?",
      buttons: { heading: "Delete", function: deleteMessageFn },
      extraButton: { heading: "Delete", function: deleteMessageFn },
    },
    ClearChat: {
      heading: "Clear Chat",
      subHeading: "Are you sure you want to clear this chat?",
      buttons: { heading: "Clear", function: clearChatFn },
    },
    Unfriend: {
      heading: "Unfriend",
      subHeading: "Are you sure you want to delete this message?",
      buttons: { heading: "Unfriend", function: unfriendFn },
    },
  };
  const headingData = data[dialogFor!] as DialoagData;

  return (
    <div className="absolute w-full h-full bg-black/20 flex items-center justify-center">
      <dialog
        open={true}
        className="rounded-xl bg-primary_light  dark:bg-bg_dark text-black dark:text-white flex flex-col gap-4"
      >
        <h2 className="font-medium text-xl">{headingData.heading}</h2>
        <p>{headingData.subHeading}</p>
        <div className="self-end flex flex-col gap-1 items-end">
          <ButtonWrapper
            onClick={() => {
              headingData.buttons.function();
              dispatch({ type: "SET_Dialog", payload: null });
            }}
            customStyles="hover:bg-red-500/10 text-red-500"
          >
            {headingData.buttons.heading}
          </ButtonWrapper>

          {headingData.extraButton && (
            <ButtonWrapper
              onClick={() => {
                headingData.extraButton?.function();
                dispatch({ type: "SET_Dialog", payload: null });
              }}
              customStyles="hover:bg-red-500/10 text-red-500"
            >
              {headingData.extraButton.heading}
            </ButtonWrapper>
          )}

          <ButtonWrapper
            onClick={() => dispatch({ type: "SET_Dialog", payload: null })}
            customStyles="hover:bg-blue-500/10 text-blue-500"
          >
            Cancel
          </ButtonWrapper>
        </div>
      </dialog>
    </div>
  );
}

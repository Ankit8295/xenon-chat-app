"use client";
import Loading from "../button/Loading";
import useQueryFunction from "@/src/lib/useQueries";
import ButtonWrapper from "../button/ButtonWrapper";
import {
  useAppDispatch,
  useAppState,
} from "@/src/utils/app-provider/state-provider/ContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

type ButtonType = {
  heading: string;
  function: () => Promise<any>;
};

type DialoagData = {
  heading: string;
  subHeading: string;
  buttons: ButtonType;
  extraButton?: ButtonType;
};

export default function DialogBox() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { clearChat, unfriend, deleteMessage } = useQueryFunction();

  const { dialogFor, friendName, deleteMsgId: messageId } = useAppState();

  const { mutate: deleteMessageFn, isLoading: deleting } = useMutation({
    mutationFn: () =>
      deleteMessage({ friendName, messageId }).then(() =>
        queryClient.invalidateQueries([`${friendName}-messages`])
      ),
    onSuccess: () => dispatch({ type: "SET_Dialog", payload: null }),
  });

  const { mutate: clearChatFn, isLoading: clearing } = useMutation({
    mutationFn: () =>
      clearChat(friendName).then(() =>
        queryClient.invalidateQueries([`${friendName}-messages`])
      ),
    onSuccess: () => dispatch({ type: "SET_Dialog", payload: null }),
  });

  const { mutate: unfriendFn, isLoading: unfriending } = useMutation({
    mutationFn: () =>
      unfriend(friendName).then(() => {
        router.push("/home");
        queryClient.invalidateQueries([`userFriends`]);
      }),
    onSuccess: () => {
      dispatch({ type: "SET_Dialog", payload: null });
    },
  });

  const loading = deleting || clearing || unfriending;

  const data = {
    DeleteMessage: {
      heading: "Delete Message",
      subHeading: "Are you sure you want to delete this message?",
      buttons: { heading: "Delete", function: deleteMessageFn },
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

  const dialogBoxData = data[dialogFor!] as DialoagData;

  return (
    <div className="absolute w-full h-full bg-black/20 flex items-center justify-center">
      <dialog
        open={true}
        className="rounded-xl bg-primary_light  dark:bg-bg_dark text-black dark:text-white flex flex-col gap-4"
      >
        <h2 className="font-medium text-xl">{dialogBoxData.heading}</h2>
        <p>{dialogBoxData.subHeading}</p>
        <div className="self-end flex flex-col gap-1 items-end">
          <ButtonWrapper
            onClick={() => {
              dialogBoxData.buttons.function();
            }}
            customStyles={`${
              loading ? "bg-red-500/10" : ""
            } hover:bg-red-500/10 text-red-500`}
          >
            {loading ? <Loading /> : dialogBoxData.buttons.heading}
          </ButtonWrapper>
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

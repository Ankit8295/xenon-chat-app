import MessageWrapper from "./MessageWrapper";
import { MessageType } from "@/src/utils/types/types";

type Props = {
  message: MessageType[];
};

export default function MessageArea({ message }: Props) {
  return (
    <div className="flex w-full flex-col gap-5 py-5 items-start">
      {message?.map((msg) => (
        <MessageWrapper key={msg.messageId} message={msg} />
      ))}
    </div>
  );
}

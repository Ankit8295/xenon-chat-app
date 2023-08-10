import { MessageType } from "@/src/utils/types/types";
import MessageWrapper from "./MessageWrapper";

type Props = {
  message?: MessageType[];
};

export default function MessageArea({ message = [] }: Props) {
  window.scrollTo();
  return (
    <div className="flex w-full flex-col gap-5 py-5 items-start">
      {message?.map((msg, i) => (
        <MessageWrapper key={i} message={msg} />
      ))}
    </div>
  );
}

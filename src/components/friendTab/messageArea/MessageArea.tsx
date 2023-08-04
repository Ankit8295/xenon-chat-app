import { MessageType } from "@/src/utils/types/types";
import Message from "./Message";

type Props = {
  message?: MessageType[];
};

export default function MessageArea({ message = [] }: Props) {
  return (
    <div className="flex w-full flex-col gap-5 py-5 items-start">
      {message?.map((msg, i) => (
        <Message key={i} message={msg} />
      ))}
    </div>
  );
}

import { ReactNode } from "react";

type MessageProps = {
  align: "left" | "right";
  children: ReactNode;
};

export function Message({ children, align }: MessageProps) {
  return (
    <span
      className={` font-light  max-w-[40%] break-words h-auto rounded-b-xl   flex p-2 bg-bg_light dark:bg-bg_dark ${
        align === "left"
          ? " self-start rounded-tr-xl "
          : "self-end rounded-tl-xl"
      }`}
    >
      {children}
    </span>
  );
}

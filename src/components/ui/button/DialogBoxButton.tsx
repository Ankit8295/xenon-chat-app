import React, { ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  customStyles?: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function DialogBoxButton({
  customStyles = "",
  type = "button",
  children,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className={`p-2 flex justify-center items-center  rounded-lg min-w-[100px] min-h-[50px] ${customStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

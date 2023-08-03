import React, { ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  customStyles?: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function ButtonWrapper({
  customStyles = "",
  type = "button",
  children,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className={`p-2  rounded-lg ${customStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

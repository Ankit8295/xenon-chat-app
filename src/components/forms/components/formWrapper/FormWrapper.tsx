import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function FormWrapper({ children }: Props) {
  return (
    <div className="flex-1 w-full h-full flex justify-center items-start min-h-[350px]">
      {children}
    </div>
  );
}

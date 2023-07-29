"use client";
import { signOut } from "next-auth/react";
import { AsyncButton } from "../components/ui/button/AsyncButton";
import { useState } from "react";

export default function Error() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="h-[80%]  w-full flex flex-col  justify-center gap-5 items-center">
      <div>Something Went Wrong...</div>
      <AsyncButton
        type="button"
        onClick={() => {
          setIsLoading(true);
          signOut();
        }}
        loading={isLoading}
        label="Log in again"
      />
    </div>
  );
}

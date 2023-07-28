"use client";
import { signOut } from "next-auth/react";
import PrimaryButton from "../components/ui/button/PrimaryButton";

export default function Error() {
  return (
    <div className="h-[80%]  w-full flex flex-col  justify-center items-center">
      <div>Something Went Wrong...</div>
      <PrimaryButton onClick={() => signOut()}>Log in again</PrimaryButton>
    </div>
  );
}

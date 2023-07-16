"use client";
import { signOut } from "next-auth/react";
import PrimaryButton from "../ui/button/PrimaryButton";

export default async function Header({ name }: { name: string }) {
  return (
    <div className="w-full bg-gray-600 justify-end items-center gap-5 flex p-2">
      <h1 className="capitalize">{name}</h1>
      <PrimaryButton onClick={() => signOut()}>Sign out</PrimaryButton>
    </div>
  );
}

"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const { status } = useSession();

  if (status === "authenticated")
    redirect(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/home`);
  else redirect("/login");
}

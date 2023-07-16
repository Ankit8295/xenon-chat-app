"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const { status } = useSession();
  if (status === "authenticated") redirect("/home");
  else redirect("/login");
}

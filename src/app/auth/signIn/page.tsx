"use client";
import { useRef } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function SignIn() {
  const searchParams = useSearchParams();
  const url = searchParams?.get("callbackUrl") || "/home";
  const { status } = useSession();
  const email = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    return await signIn("credentials", {
      username: name.current?.value,
      email: email.current?.value,
      password: pass.current?.value,
      redirect: true,
      callbackUrl: `${url}`,
    });
  };
  if (status === "authenticated") redirect("/home");
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center text-black py-10"
      >
        <h1 className="text-white">Log in or sign up</h1>
        <label>
          <input type="text" ref={email} placeholder="Email" />
        </label>
        <label>
          <input ref={pass} type="text" placeholder="Password" />
        </label>
        <label>
          <input ref={name} type="text" placeholder="Name" />
        </label>
        <button
          type="submit"
          className="border px-2 text-white hover:bg-black/60"
        >
          Continue
        </button>
      </form>
      <button onClick={handleSubmit}>signIn</button>
    </>
  );
}

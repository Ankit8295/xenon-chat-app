"use client";
import { signIn, useSession, signOut } from "next-auth/react";

export default function Page() {
  const { status, data } = useSession();
  console.log(data?.user);
  return (
    <div className="flex justify-evenly bg-black/40">
      {data?.user && (
        <div className="flex gap-5 items-center">
          <div
            onClick={() => signOut()}
            className="px-2 bg-white text-black cursor-pointer"
          >
            Sign Out
          </div>
          <div>{data.user.name}</div>
        </div>
      )}
      {!data?.user && (
        <div
          onClick={() => signIn()}
          className="px-2 bg-white text-black cursor-pointer"
        >
          Sign In
        </div>
      )}
    </div>
  );
}

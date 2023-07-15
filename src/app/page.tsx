"use client";
import { useRef, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import PageWrapper from "../components/ui/PageWrapper";
import LoginForm from "../components/loginForm/LoginForm";
import RegisterForm from "../components/registerForm/RegisterForm";

export default function Page() {
  const { status } = useSession();
  const [register, setRegister] = useState<boolean>();
  if (status === "authenticated") redirect("/home");
  return (
    <div className=" my-auto border px-10 py-16 shadow-lg rounded-xl min-h-[600px] flex flex-col justify-between">
      {register ? <RegisterForm /> : <LoginForm />}
      <div>
        {register ? "already have an account ?" : "don't have an account ?"}
        <span
          className="px-2 text-blue-600 cursor-pointer"
          onClick={() => setRegister((prev) => !prev)}
        >
          {register ? "log in" : "register"}
        </span>
        here
      </div>
    </div>
  );
}

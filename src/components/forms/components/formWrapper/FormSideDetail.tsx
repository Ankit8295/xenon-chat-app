import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  formType: "login" | "register";
};

export default function FormSideDetail({ formType, href }: Props) {
  return (
    <div className="flex-1 text-black flex flex-col items-start  justify-between min-h-[350px] gap-16">
      <div>
        <h1 className=" text-4xl text-start">
          {formType === "login" ? "Hello," : "Welcome to,"}
        </h1>
        <h2 className="text-5xl text-start font-bold">
          {formType === "login" ? "Welcome Back!" : "Create Account"}
        </h2>
        <span className="text-sm text-black/70">
          {formType === "login"
            ? "Please enter your log in details."
            : "Please enter all required details."}
        </span>
      </div>
      <div className="text-sm text-black/70 ">
        {formType === "login"
          ? "do not have an account ?"
          : " already have an account ?"}
        <Link href={href} className="px-2 text-blue-600 cursor-pointer">
          {formType === "login" ? "Log In" : "sign up"}
        </Link>
        here
      </div>
    </div>
  );
}

import LoginForm from "@/src/components/forms/loginForm/LoginForm";
import React from "react";

export default function page() {
  return (
    <div className="my-auto border px-10 py-16 shadow-lg rounded-xl min-h-[600px] flex flex-col justify-between">
      <LoginForm />
    </div>
  );
}

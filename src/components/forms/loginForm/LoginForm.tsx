"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { LoginFormSchema } from "@/src/utils/types/loginForm";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../components/form-input/FormInput";
import Link from "next/link";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const url = searchParams?.get("callbackUrl") || "/home";
  const [loginError, setLoginError] = useState("");
  const paramError = searchParams?.get("error");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>();

  const submit: SubmitHandler<LoginFormSchema> = async (data) => {
    if (data.userId && data.password) {
      return await signIn("credentials", {
        userId: data.userId,
        password: data.password,
        redirect: true,
        callbackUrl: url,
      });
    } else setLoginError("Please enter valid credentials");
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-10 items-center  py-10 w-80"
    >
      <h1 className="">Log in to your account</h1>
      <FormInput
        type="email"
        register={register}
        registerValue="userId"
        placeholder="Enter Your Email"
        error={errors.userId?.message}
      />
      <FormInput
        type="text"
        register={register}
        registerValue="password"
        placeholder="Enter Your Password"
        error={errors.password?.message}
      />
      <PrimaryButton type="submit">
        {paramError
          ? "Retry with Valid Credentials"
          : loginError
          ? loginError
          : "Continue"}
      </PrimaryButton>
      <div>
        don&apos;t have an account ?
        <Link href={"/register"} className="px-2 text-blue-600 cursor-pointer">
          register
        </Link>
        here
      </div>
    </form>
  );
}

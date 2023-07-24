"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { LoginFormSchema, loginValidation } from "@/src/utils/types/loginForm";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../components/form-input/FormInput";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const url = searchParams?.get("callbackUrl") || "/home";
  const paramError = searchParams?.get("error");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginValidation),
  });

  const submit: SubmitHandler<LoginFormSchema> = async (data) => {
    return await signIn("credentials", {
      userName: data.userName,
      password: data.password,
      redirect: true,
      callbackUrl: url,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-10 items-center  py-10 w-80"
    >
      <h1 className="">Log in to your account</h1>
      <FormInput
        type="text"
        register={register}
        registerValue="userName"
        placeholder="Enter Username"
        error={errors.userName?.message}
      />
      <FormInput
        type="text"
        register={register}
        registerValue="password"
        placeholder="Enter Your Password"
        error={errors.password?.message}
      />
      <PrimaryButton type="submit">
        {paramError ? "Retry with Valid Credentials" : "Continue"}
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

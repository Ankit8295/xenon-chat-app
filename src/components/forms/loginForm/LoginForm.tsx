"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AsyncButton } from "../../ui/button/AsyncButton";
import FormInput from "../components/form-input/FormInput";
import { LoginFormSchema, loginValidation } from "@/src/utils/types/loginForm";

export default function LoginForm() {
  const searchParams = useSearchParams();

  const url =
    searchParams?.get("callbackUrl") ||
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/home`;

  console.log(url);

  const paramError = searchParams?.get("error");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      className="flex flex-col w-[90%] max-lg:w-full h-[350px] justify-start max-lg:justify-start items-center gap-10 pt-5 max-lg:pt-14 text-black text-sm"
    >
      <FormInput
        type="text"
        register={register}
        registerValue="userName"
        placeholder="Enter Username"
        error={errors.userName?.message}
      />
      <FormInput
        type="password"
        register={register}
        registerValue="password"
        placeholder="Enter Your Password"
        error={errors.password?.message}
      />
      <AsyncButton
        loading={isSubmitting}
        loadingLabel="Wait"
        type="submit"
        label="Log In"
        customStyles="min-h-[42px] my-4 max-lg:self-center"
        error={paramError ? true : false}
        errorLabel="Retry with valid credentials"
      />
    </form>
  );
}

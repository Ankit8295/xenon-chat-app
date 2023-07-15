import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import PrimaryButton from "../ui/button/PrimaryButton";
import { LoginFormSchema } from "@/src/utils/types/loginForm";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../form-input/FormInput";

type Props = {};

export default function LoginForm({}: Props) {
  const searchParams = useSearchParams();
  const url = searchParams?.get("callbackUrl") || "/home";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>();

  const submit: SubmitHandler<LoginFormSchema> = async (data) => {
    return await signIn("credentials", {
      email: data.email,
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
        type="email"
        register={register}
        registerValue="email"
        placeholder="Enter Your Email"
      />
      <FormInput
        type="text"
        register={register}
        registerValue="password"
        placeholder="Enter Your Password"
      />
      <PrimaryButton type="submit">Continue</PrimaryButton>
    </form>
  );
}

import { RegisterFormSchema } from "@/src/utils/types/loginForm";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../form-input/FormInput";
import PrimaryButton from "../ui/button/PrimaryButton";

type Props = {};

export default function RegisterForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>();

  const submitForm: SubmitHandler<RegisterFormSchema> = async (data) => {
    const res = await fetch("http://localhost:3000//api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });
    console.log(await res.json());
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-10 items-center  py-10 w-80"
    >
      <h1>Register Your Account</h1>
      <FormInput
        type="text"
        register={register}
        registerValue="name"
        placeholder="Full Name"
        registerReq={true}
      />
      <FormInput
        type="email"
        register={register}
        registerValue="email"
        registerReq={true}
        placeholder="Email"
      />
      <FormInput
        type="text"
        register={register}
        registerValue="password"
        registerReq={true}
        placeholder="password"
      />
      <PrimaryButton type="submit">Continue</PrimaryButton>
    </form>
  );
}

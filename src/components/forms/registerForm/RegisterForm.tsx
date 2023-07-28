"use client";
import {
  RegisterFormSchema,
  registerValidation,
} from "@/src/utils/types/loginForm";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../components/form-input/FormInput";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerValidation),
  });
  const submitForm: SubmitHandler<RegisterFormSchema> = async (data) => {
    return fetch("/api/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: data.emailId,
        fullName: data.fullName,
        userName: data.userName,
        password: data.password,
      }),
    })
      .then((res) => {
        reset();
        return res;
      })
      .catch((err) => console.log(err));
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 items-center py-10 w-80"
    >
      <h1>Register Your Account</h1>
      <FormInput
        type="text"
        register={register}
        registerValue="userName"
        placeholder="username"
        registerReq={true}
        error={errors.userName?.message}
      />
      <FormInput
        type="text"
        register={register}
        registerValue="fullName"
        placeholder="Name"
        registerReq={true}
        error={errors.fullName?.message}
      />
      <FormInput
        type="email"
        register={register}
        registerValue="emailId"
        registerReq={true}
        placeholder="Email"
        error={errors.emailId?.message}
      />
      <FormInput
        type="text"
        register={register}
        registerValue="password"
        registerReq={true}
        placeholder="password"
        error={errors.password?.message}
      />
      <PrimaryButton type="submit">Continue</PrimaryButton>
      <div>
        already have an account ?
        <Link href={"/login"} className="px-2 text-blue-600 cursor-pointer">
          log in
        </Link>
        here
      </div>
    </form>
  );
}

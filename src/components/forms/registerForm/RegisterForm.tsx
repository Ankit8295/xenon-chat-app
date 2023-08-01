"use client";

import {
  RegisterFormSchema,
  registerValidation,
} from "@/src/utils/types/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AsyncButton } from "../../ui/button/AsyncButton";
import FormInput from "../components/form-input/FormInput";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerValidation),
  });

  const submitForm: SubmitHandler<RegisterFormSchema> = async (data) => {
    return fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/register`, {
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
      .then(() => {
        reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col w-[90%] max-lg:w-full h-[350px] justify-center max-lg:justify-start items-center gap-8 pt-5 max-lg:pt-10 text-black text-sm"
    >
      <FormInput
        type="text"
        register={register}
        registerValue="userName"
        placeholder="Create Username"
        registerReq={true}
        error={errors.userName?.message}
      />
      <FormInput
        type="text"
        register={register}
        registerValue="fullName"
        placeholder="Full Name"
        registerReq={true}
        error={errors.fullName?.message}
      />
      <FormInput
        type="email"
        register={register}
        registerValue="emailId"
        registerReq={true}
        placeholder="Email Address"
        error={errors.emailId?.message}
      />
      <FormInput
        type="text"
        register={register}
        registerValue="password"
        registerReq={true}
        placeholder="Create Password"
        error={errors.password?.message}
      />
      <AsyncButton
        loading={isSubmitting}
        type="submit"
        label="Sign Up"
        loadingLabel="Creating Account"
        customStyles="min-h-[42px] my-4 max-lg:self-center"
      />
    </form>
  );
}

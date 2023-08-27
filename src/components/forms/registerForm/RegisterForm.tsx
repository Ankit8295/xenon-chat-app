"use client";

import {
  RegisterFormSchema,
  registerValidation,
} from "@/src/utils/types/loginForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AsyncButton } from "../../ui/button/AsyncButton";
import FormInput from "../components/form-input/FormInput";

export default function RegisterForm() {
  const [userNameTaken, setUserNameTaken] = useState<string | undefined>();
  const [emailTaken, setEmailTaken] = useState<string | undefined>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerValidation),
  });

  const submitForm: SubmitHandler<RegisterFormSchema> = async (data) => {
    if (emailTaken || userNameTaken) {
      setEmailTaken((prev) => undefined);
      setUserNameTaken((prev) => undefined);
    }
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
      .then(async (res: any) => {
        const data = await res.json();
        if (data.data === "Email Already registered!!!") {
          return setEmailTaken(data.data);
        }
        if (data.data === "Username Already Taken!!!") {
          return setUserNameTaken(data.data);
        }
        reset();
        router.push("/login");
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
        error={errors.userName?.message || userNameTaken}
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
        error={errors.emailId?.message || emailTaken}
      />
      <FormInput
        type="password"
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

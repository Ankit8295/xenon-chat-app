"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import FormSideDetail from "../components/forms/components/formWrapper/FormSideDetail";
import FormWrapper from "../components/forms/components/formWrapper/FormWrapper";
import LoginForm from "../components/forms/loginForm/LoginForm";

export default function Page() {
  const { status } = useSession();

  if (status === "loading") {
    return <></>;
  }
  if (status === "authenticated") {
    redirect(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/home`);
  } else
    return (
      <>
        <FormSideDetail formType="login" />
        <FormWrapper>
          <LoginForm />
        </FormWrapper>
      </>
    );
}

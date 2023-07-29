import FormSideDetail from "@/src/components/forms/components/formWrapper/FormSideDetail";
import FormWrapper from "@/src/components/forms/components/formWrapper/FormWrapper";
import LoginForm from "@/src/components/forms/loginForm/LoginForm";
import React from "react";

export default function page() {
  return (
    <>
      <FormSideDetail formType="login" href="/register" />
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </>
  );
}

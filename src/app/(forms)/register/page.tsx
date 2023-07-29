import FormSideDetail from "@/src/components/forms/components/formWrapper/FormSideDetail";
import FormWrapper from "@/src/components/forms/components/formWrapper/FormWrapper";
import RegisterForm from "@/src/components/forms/registerForm/RegisterForm";
import React from "react";

export default function page() {
  return (
    <>
      <FormSideDetail formType="register" href="/login" />
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </>
  );
}

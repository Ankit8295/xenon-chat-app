import LoginForm from "@/src/components/forms/loginForm/LoginForm";
import FormWrapper from "@/src/components/forms/components/formWrapper/FormWrapper";
import FormSideDetail from "@/src/components/forms/components/formWrapper/FormSideDetail";

export default function page() {
  return (
    <>
      <FormSideDetail formType="login" />
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </>
  );
}

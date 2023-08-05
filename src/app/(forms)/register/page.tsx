import RegisterForm from "@/src/components/forms/registerForm/RegisterForm";
import FormWrapper from "@/src/components/forms/components/formWrapper/FormWrapper";
import FormSideDetail from "@/src/components/forms/components/formWrapper/FormSideDetail";

export default function page() {
  return (
    <>
      <FormSideDetail formType="register" />
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </>
  );
}

type Props = {
  formType: "login" | "register";
};

export default function FormSideDetail({ formType }: Props) {
  return (
    <div className="flex-1 text-black/80 dark:text-white flex flex-col items-start  justify-between min-h-[350px] max-lg:min-h-max gap-16">
      <div>
        <h1 className=" text-4xl max-lg:text-2xl text-start">
          {formType === "login" ? "Hello," : "Welcome to,"}
        </h1>
        <h2 className="text-5xl  text-start font-bold">
          {formType === "login" ? "Welcome Back!" : "Create Account"}
        </h2>
        <span className="text-sm text-black/80 dark:text-white max-lg:hidden">
          {formType === "login"
            ? "Please enter your log in details."
            : "Please enter all required details."}
        </span>
      </div>
    </div>
  );
}

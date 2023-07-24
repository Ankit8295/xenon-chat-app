import { z } from "zod";

export const loginValidation = z.object({
  userName: z
    .string()
    .min(5, "username is too short!")
    .max(10, "username is too long!"),
  password: z.string().min(6, "password should be 6 character long"),
});
export type LoginFormSchema = z.infer<typeof loginValidation>;

export const registerValidation = z.object({
  userName: z
    .string()
    .min(5, "username is too short!")
    .max(10, "username is too long!"),
  fullName: z.string().min(3, "name is too short!"),
  emailId: z.string().email("Provide a valid email address"),
  password: z.string().min(6, "Password should be 6 character long"),
});
export type RegisterFormSchema = z.infer<typeof registerValidation>;

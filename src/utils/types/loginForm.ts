import { z } from "zod";

export const loginValidation = z.object({
  userId: z.string().email("Provide a valid email address"),
  password: z.string().min(6, "password should be 6 character long"),
});
export type LoginFormSchema = z.infer<typeof loginValidation>;

export const registerValidation = z.object({
  username: z.string().min(3, "name is too short!"),
  userId: z.string().email("Provide a valid email address"),
  password: z.string().min(6, "password should be 6 character long"),
});
export type RegisterFormSchema = z.infer<typeof registerValidation>;

import z from "zod";

export type PostSchemaType = z.infer<typeof postSchema>;
export type SignUpUserSchemaType = z.infer<typeof signUpUserSchema>;
export type SignInUserSchemaType = z.infer<typeof signInUserSchema>;
export type EditUserInfoSchemaType = z.infer<typeof editUserInfoSchema>;

export const signUpUserSchema = z
  .object({
    email: z
      .string()
      .min(1)
      .max(40, { message: "Email is too long" })
      .email({ message: "Enter valid type of email" }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 charachers long" })
      .max(50, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords don't match each other",
    path: ["confirmPassword"],
  });

export const signInUserSchema = z.object({
  email: z
    .string()
    .min(1)
    .max(40, { message: "Email is too long" })
    .email({ message: "Enter valid type of email" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 charachers long" })
    .max(50, { message: "Password is too long" }),
});

export const editUserInfoSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "Firstname is too short")
      .max(30, "Firstname is too long")
      .optional(),
    lastName: z
      .string()
      .min(3, "Lastname is too short")
      .max(30, "Lastname is too long")
      .optional(),
    email: z
      .string()
      .min(3, "Email must be at least 3 charachers long")
      .max(40, "Email is too long")
      .email({ message: "Enter valid type of email" }),
    imageUrl: z.string().optional(),
    isPasswordFieldActive: z.boolean(),
    oldPassword: z
      .string()
      .min(3, "Password must be at least 3 charachers long")
      .max(40, "Current password is too long")
      .optional(),
    newPassword: z
      .string()
      .min(3, "New password must be at least 3 charachers long")
      .max(40, "New password is too long")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    ({ confirmPassword, newPassword }) => confirmPassword === newPassword,
    {
      message: "Passwords don't match each other",
      path: ["confirmPassword"],
    }
  );

export const postSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(60_000),
  authorId: z.string().min(1),
  imageUrl: z.string().min(1),
  shortDescription: z.string().min(1).max(150),
  genre: z.enum([
    "NEWS",
    "ENTERTAINMENT",
    "SPORTS",
    "CULTURE_AND_ART",
    "HEALTH",
    "EDUCATION",
    "TECHNOLOGY",
  ]),
});

import z from "zod";

export type PostSchemaType = z.infer<typeof postSchema>;
export type SignUpUserSchemaType = z.infer<typeof signUpUserSchema>;
export type SignInUserSchemaType = z.infer<typeof signInUserSchema>;
export type EditUserInfoSchemaType = z.infer<typeof editUserInfoSchema>;

export const signUpUserSchema = z
  .object({
    email: z.string().min(1).max(30).email(),
    password: z.string().min(1).max(50),
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
    .max(30)
    .email({ message: "Enter valid type of email" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 charachers long" })
    .max(50, { message: "Password is too long" }),
});

export const editUserInfoSchema = z.object({
  firstName: z.string().min(3).max(30).optional().nullable(),
  lastName: z.string().min(1).max(30).optional().nullable(),
  email: z.string().min(1).max(30).email(),
  imageUrl: z.string().optional().nullable(),
  isPasswordFieldActive: z.boolean(),
  oldPassword: z.string().min(1).optional(),
  newPassword: z.string().min(1).optional(),
  confirmPassword: z.string().min(1).optional(),
});

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

import z from "zod";

export type PostSchemaType = z.infer<typeof postSchema>;
export type SignUpUserSchemaType = z.infer<typeof signUpUserSchema>;

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

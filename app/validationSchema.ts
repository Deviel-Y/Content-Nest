import z from "zod";

export type PostSchemaType = z.infer<typeof postSchema>;

export const postSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(60_000),
  authorId: z.string().min(1),
  imageUrl: z.string().min(1),
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

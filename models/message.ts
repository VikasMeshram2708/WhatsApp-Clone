import * as z from "zod/v4";

export const sendSchema = z.object({
  content: z.string().min(1, "Content is required"),
  authorId: z.string().min(1, "Author Id is required"),
});

export type SendSchema = z.infer<typeof sendSchema>;

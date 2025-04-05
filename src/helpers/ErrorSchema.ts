import { z } from "zod";

export const errorSchema = z.object({
    message: z.string(),
    issues: z.array(z.string()),
  });
import { z } from "zod";

export const dangerSchema = z.enum(["LOW", "CRITICAL"]);
export const statusSchema = z.enum(["ACTIVE", "CAPTURED"]);

export const stateSchema = z.object({
  danger: dangerSchema,
  status: statusSchema,
});

export const bodySchema = stateSchema.partial().extend({ name: z.string() });

export const cardSchema = stateSchema.required().extend({
  name: z.string(),
  image: z.string(),
  location: z.string(),
});

export const yokaiListSchema = z.array(cardSchema);

export namespace YokaiType {
  export type Body = z.infer<typeof bodySchema>;
  export type Card = z.infer<typeof cardSchema>;
}

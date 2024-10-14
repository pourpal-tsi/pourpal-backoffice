import * as z from "zod";
import { above, between } from "@/utils/zod";

export const itemSchema = z.object({
  item_id: z.string(),
  sku: z.string(),
  title: z.string().min(1, "Required"),
  image_url: z.string().min(1, "Required").url({ message: "Must be a URL" }),
  description: z.string(),
  origin_country_code: z.string().min(1, "Required"),
  brand_id: z.string().min(1, "Required"),
  type_id: z.string().min(1, "Required"),
  price: z.object({
    currency: z.enum(["€", "$"]),
    amount: z
      .string()
      .regex(/^\s*\d+(\.\d+)?\s*$/, "Must be a number")
      .refine((val) => above(parseFloat(val), 0), {
        message: "Must be above zero",
      }),
  }),
  volume: z.object({
    unit: z.enum(["ml", "cl", "dl", "l"]),
    amount: z
      .string()
      .regex(/^\s*\d+(\.\d+)?\s*$/, "Must be a number")
      .refine((val) => above(parseFloat(val), 0), {
        message: "Must be above zero",
      }),
  }),
  alcohol_volume: z.object({
    unit: z.enum(["%"]),
    amount: z
      .string()
      .regex(/^\s*\d+(\.\d+)?\s*$/, "Must be a number")
      .refine((val) => between(parseFloat(val), 0, 100), {
        message: "Must be between 0 and 100",
      }),
  }),
  quantity: z
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .nonnegative("Must be non-negative"),
});

export type ItemInput = z.infer<typeof itemSchema>;

import * as z from "zod";

export const itemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Required"),
  type_id: z.string().min(1, "Required"),
  brand_id: z.string().min(1, "Required"),
  origin_country_code: z.string().min(1, "Required"),
  image_url: z.string().min(1, "Required").url({ message: "Must be a   URL" }),
  description: z.string(),
  price: z
    .string()
    .regex(/^\s*\d+(\.\d+)?\s*$/, "Must be a number")
    .refine((val) => above(parseFloat(val), 0), {
      message: "Must be above zero",
    }),
  volume: z
    .string()
    .regex(/^\s*\d+(\.\d+)?\s*$/, "Must be a number")
    .refine((val) => above(parseFloat(val), 0), {
      message: "Must be above zero",
    }),
  alcohol_volume: z
    .string()
    .regex(/^\s*\d+(\.\d+)?\s*$/, "Must be a number")
    .refine((val) => between(parseFloat(val), 0, 100), {
      message: "Must be between 0 and 100",
    }),
  quantity: z
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .nonnegative("Must be non-negative"),
});

export type ItemSchema = z.infer<typeof itemSchema>;

function above(value: number, min: number) {
  return value > min;
}

function between(value: number, min: number, max: number) {
  return min <= value && value <= max;
}

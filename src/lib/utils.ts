import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ZodObject, ZodSafeParseResult } from "zod/v4";
import { z } from 'zod/v4'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function withValidatedAction<Schema extends ZodObject<any>>(
  schema: Schema,
  handler: (parsed: ZodSafeParseResult<z.infer<Schema>>) => Promise<void>
): (formData: FormData) => void {
  return async (formData: FormData): Promise<void> => {
    const result = formDataToObject(formData, schema);
    await handler(result);
  };
}
// import { z, ZodObject, ZodSafeParseResult } from 'zod';

export function withValidatedStateAction<Schema extends ZodObject<any>>(
  schema: Schema,
  handler: (
    parsed: ZodSafeParseResult<z.infer<Schema>>,
    prevState: z.infer<Schema>
  ) => Promise<z.infer<Schema>>
): (state: z.infer<Schema>, payload: FormData) => Promise<z.infer<Schema>> {
  return async (
    state: z.infer<Schema>,
    payload: FormData
  ): Promise<z.infer<Schema>> => {
    console.log(state, payload);

    const result = formDataToObject(payload, schema);

    return handler(result, state);
  };
}


function formDataToObject<Schema extends ZodObject<any>>(
  formData: FormData,
  schema: Schema
): ZodSafeParseResult<z.infer<Schema>> {
  const raw: Record<string, any> = {};
  // console.log(formData)

  for (const [key, value] of formData.entries()) {
    raw[key] = value;
  }

  return schema.safeParse(raw);
}

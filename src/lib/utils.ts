import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type {ZodObject, ZodSafeParseResult} from "zod/v4";
import {z} from 'zod/v4'
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
export function withValidatedStateAction<Schema extends ZodObject<any>>(
  schema: Schema,
  handler: (prevState: z.infer<Schema>, parsed: ZodSafeParseResult<z.infer<Schema>>) => Promise<void>
): (prevState: z.infer<Schema>, formData: FormData) => void {
  return async (prevState: z.infer<Schema>, formData: FormData): Promise<void> => {
    const result = formDataToObject(formData, schema);
    await handler(prevState,result);
  };
}

function formDataToObject<Schema extends ZodObject<any>>(
  formData: FormData,
  schema: Schema
): ZodSafeParseResult<z.infer<Schema>> {
  const raw: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    raw[key] = value;
  }

  return schema.safeParse(raw);
}

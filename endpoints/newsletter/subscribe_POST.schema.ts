import { z } from "zod";
import superjson from 'superjson';

export const schema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  success: boolean;
  message: string;
};

export const postNewsletterSubscribe = async (body: InputType, init?: RequestInit): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/newsletter/subscribe`, {
    method: "POST",
    body: superjson.stringify(validatedInput),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const responseText = await result.text();
  if (!result.ok) {
    try {
      const errorObject = superjson.parse<{ error: string }>(responseText);
      throw new Error(errorObject.error || "An unknown error occurred");
    } catch (e) {
      // If parsing fails, it might be a non-JSON error response
      throw new Error(responseText || "An unknown error occurred");
    }
  }

  return superjson.parse<OutputType>(responseText);
};
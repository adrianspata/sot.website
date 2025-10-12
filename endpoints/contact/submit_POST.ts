import { schema, OutputType } from "./submit_POST.schema";
import superjson from 'superjson';
import { db } from "../../helpers/db";
import { ZodError } from "zod";

export async function handle(request: Request) {
  if (request.method !== 'POST') {
    return new Response(superjson.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const json = superjson.parse(await request.text());
    const validatedData = schema.parse(json);

    await db
      .insertInto('contactSubmissions')
      .values({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      })
      .execute();

    const response: OutputType = {
      success: true,
      message: "Your message has been submitted successfully.",
    };

    return new Response(superjson.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error handling contact submission:", error);

    if (error instanceof ZodError) {
      return new Response(superjson.stringify({ error: "Invalid input.", issues: error.issues }), { status: 400 });
    }
    
    if (error instanceof Error) {
        return new Response(superjson.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(superjson.stringify({ error: "An unexpected error occurred." }), { status: 500 });
  }
}
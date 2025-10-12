import { schema, OutputType } from "./subscribe_POST.schema";
import superjson from 'superjson';
import { db } from "../../helpers/db";
import { ZodError } from "zod";

export async function handle(request: Request) {
  if (request.method !== 'POST') {
    return new Response(superjson.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const json = superjson.parse(await request.text());
    const validatedInput = schema.parse(json);

    // Insert the email into the newsletter_subscribers table.
    // If the email already exists, the ON CONFLICT clause will prevent a duplicate error.
    // The query will just do nothing, and we'll proceed to return a success message.
    // This fulfills the requirement to handle duplicate emails gracefully.
    await db
      .insertInto('newsletterSubscribers')
      .values({ email: validatedInput.email })
      .onConflict((oc) => oc.column('email').doNothing())
      .execute();

    console.log(`Subscription attempt for email: ${validatedInput.email}`);

    const response: OutputType = {
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    };

    return new Response(superjson.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation error during newsletter subscription:", error.errors);
      return new Response(superjson.stringify({ error: "Invalid email address provided.", details: error.flatten() }), { status: 400 });
    }
    if (error instanceof Error) {
      console.error("Error during newsletter subscription:", error);
      return new Response(superjson.stringify({ error: "An unexpected error occurred." }), { status: 500 });
    }
    console.error("Unknown error during newsletter subscription:", error);
    return new Response(superjson.stringify({ error: "An unknown error occurred." }), { status: 500 });
  }
}
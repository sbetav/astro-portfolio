export const prerender = false;

import type { APIRoute } from "astro";
import { z } from "zod";
import { Resend } from "resend";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Please enter a message"),
});

export const POST: APIRoute = async ({ request }) => {
  const { name, email, message } = await request.json();

  const validate = contactFormSchema.safeParse({ name, email, message });

  if (!validate.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid form submission",
      }),
      { status: 400 }
    );
  }

  console.log(import.meta.env.RESEND_API_KEY);

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: import.meta.env.EMAIL_TO,
    subject: "New contact form submission",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  });

  if (res.error) {
    return new Response(
      JSON.stringify({
        error: "Something went wrong",
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Message sent!",
    }),
    { status: 200 }
  );
};

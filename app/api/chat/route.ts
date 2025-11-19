import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return new Response(
    JSON.stringify({ reply: response.choices[0].message.content }),
    { headers: { "Content-Type": "application/json" } }
  );
}

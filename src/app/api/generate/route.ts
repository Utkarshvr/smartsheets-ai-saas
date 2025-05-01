import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { topic, subject, grade, difficulty, type } = body;

  const prompt = `Generate a ${difficulty} level ${type} for the topic "${topic}" in the subject "${subject}" for class ${grade}. Format it properly.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  return NextResponse.json({ data });
}

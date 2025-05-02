import { NextResponse } from "next/server";

// pages/api/generate.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key from environment variables (recommended)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);

    console.log("RESULT: ", result);

    const responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseText) {
      return NextResponse.json(
        { output: responseText, result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to generate content." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { topic, subject, grade, difficulty, type } = body;

//   const prompt = `Generate a ${difficulty} level ${type} for the topic "${topic}" in the subject "${subject}" for class ${grade}. Format it properly.`;

//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     }),
//   });

//   const data = await response.json();

//   return NextResponse.json({ data });
// }

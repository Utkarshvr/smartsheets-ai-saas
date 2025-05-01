"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorksheetForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    topic: "",
    subject: "",
    grade: "",
    difficulty: "Easy",
    type: "Notes",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("🤖 Data: ", { data });
    setLoading(false);

    // localStorage.setItem("generatedMaterial", data.text);
    // router.push("/result");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <h1 className="text-2xl font-bold text-center">
        AI Study Material Generator
      </h1>

      <input
        type="text"
        name="topic"
        placeholder="Topic (e.g., Newton's Laws)"
        value={form.topic}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject (e.g., Physics)"
        value={form.subject}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="grade"
        placeholder="Class/Grade (e.g., 9)"
        value={form.grade}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <select
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option>Notes</option>
        <option>Worksheet</option>
        <option>Question Bank</option>
        <option>Test Paper</option>
      </select>

      <button
        type="submit"
        // disabled={loading}
        disabled
        className="bg-sky-600 text-white p-2 rounded"
      >
        {loading ? "Generating..." : "Generate Material"}
      </button>
    </form>
  );
}

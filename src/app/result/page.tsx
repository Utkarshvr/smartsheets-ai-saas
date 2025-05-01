"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import { useWorksheetFormStore } from "@/store/worksheet-form-store";
export default function Result() {
  const router = useRouter();
  const [material, setMaterial] = useState("");

  const { worksheetFormData, formatBlocks } = useWorksheetFormStore();

  console.log("worksheetFormData: ", {
    ...worksheetFormData,
    format: formatBlocks,
  });

  useEffect(() => {
    const stored = localStorage.getItem("generatedMaterial");
    if (!stored) {
      router.push("/");
    } else {
      setMaterial(stored);
    }
  }, [router]);

  const handleDownload = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(material, 180);
    doc.text(lines, 10, 10);
    doc.save("study-material.pdf");
  };

  if (!material) return null;

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Generated Study Material</h1>
      <div className="border p-4 rounded w-full max-w-3xl whitespace-pre-wrap">
        {material}
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 bg-green-600 text-white p-2 rounded"
      >
        Download as PDF
      </button>
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import GeneratedWoksheet from "@/components/core/GeneratedWoksheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import supabase from "@/utils/supabase/client";

export default function page() {
  const { worksheet_id } = useParams();

  const [worksheet, setWorksheet] = useState<{
    id: string;
    owner_id: string;
    title: string;
    worksheet: string;
    created_at: string;
  } | null>(null);

  useEffect(() => {
    const fetchWorksheet = async () => {
      const { data, error } = await supabase
        .from("worksheets")
        .select("*")
        .eq("id", worksheet_id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching worksheet:", error);
      } else {
        setWorksheet(data);
      }
    };
    fetchWorksheet();
  }, [worksheet_id]);

  if (!worksheet) return <div>Worksheet not found</div>;
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>{worksheet.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="worksheet-container">
            <GeneratedWoksheet generatedWorksheet={worksheet.worksheet} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

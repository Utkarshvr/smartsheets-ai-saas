"use client";
import { useEffect, useState } from "react";
import { useSupabase } from "../providers/supabase-provider";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import "dayjs/plugin/relativeTime";

export default function WorksheetsList() {
  const { supabase } = useSupabase();
  const { user } = useUser();
  const [worksheets, setWorksheets] = useState<
    {
      id: string;
      owner_id: string;
      title: string;
      worksheet: string;
      created_at: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchWorksheets = async () => {
      if (!supabase || !user) return;
      const { data, error } = await supabase
        .from("worksheets")
        .select("*")
        .eq("owner_id", user.id);

      if (error) {
        console.error("Error fetching worksheets:", error);
      } else {
        setWorksheets(data);
      }
    };
    fetchWorksheets();
  }, [user?.id]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Your Worksheets</h1>
      {worksheets.map((worksheet) => (
        <Card key={worksheet.id}>
          <CardHeader>
            <CardTitle>{worksheet.title}</CardTitle>
            <CardDescription>
              {dayjs(worksheet.created_at).fromNow()}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "@/utils/supabase/client";
import Link from "next/link";
dayjs.extend(relativeTime);

export default function WorksheetsList() {
  const [worksheets, setWorksheets] = useState<
    {
      id: string;
      owner_id: string;
      title: string;
      worksheet: string;
      created_at: string;
    }[]
  >([]);

  const getAllWorksheets = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      console.error("User not found");
      return;
    }

    const { data: worksheets, error } = await supabase
      .from("worksheets")
      .select("*")
      .eq("owner_id", data.user.id);

    if (error) {
      console.error("Error fetching worksheets:", error);
    } else {
      setWorksheets(worksheets);
    }
  };

  useEffect(() => {
    getAllWorksheets();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-semibold">Your Worksheets</h1>
      {worksheets.map((worksheet) => (
        <Link href={`/worksheets/${worksheet.id}`} key={worksheet.id}>
          <Card>
            <CardHeader>
              <CardTitle>{worksheet.title}</CardTitle>
              <CardDescription>
                {dayjs(worksheet.created_at).fromNow()}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

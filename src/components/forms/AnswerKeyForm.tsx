"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

export default function AnswerKeyForm() {
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  function handleGenerate() {
    console.log("generate");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Answer Key</CardTitle>
        <CardDescription>
          Upload a Worksheet or a Question Paper and generate an answer key for
          it.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-1">
          <Label>Question Paper</Label>
          <Input type="file" accept=".pdf,.docx,.doc" />
        </div>
        <div className="flex flex-col w-full gap-1">
          <Label>Additional Instructions</Label>
          <Textarea
            placeholder={"Add additional instructions for the answer key"}
            className="resize-none h-24"
            value={additionalInstructions}
            onChange={(e) => setAdditionalInstructions(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate}>Generate</Button>
      </CardFooter>
    </Card>
  );
}

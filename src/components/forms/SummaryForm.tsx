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

export default function SummaryForm() {
  const [text, setText] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  function handleGenerate() {
    console.log("generate");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Summary</CardTitle>
        <CardDescription>
          Upload a text and generate a summary of it.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-1">
          <Label>Text</Label>
          <Textarea
            placeholder={
              "Enter the text (peom, essay, article, etc.) to generate a summary of"
            }
            className="resize-none h-[240px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <Label>Additional Instructions</Label>
          <Textarea
            placeholder={"Add additional instructions for the answer key"}
            className="resize-none"
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

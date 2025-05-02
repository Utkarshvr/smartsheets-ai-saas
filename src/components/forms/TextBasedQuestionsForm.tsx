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

const placeholder =
  "Enter a text and generate questions on it. You can use the following format: \n\n# Title\n\n# Introduction\n\n# Body\n\n# Conclusion\n\n# References";

export default function TextBasedQuestionsForm() {
  const [text, setText] = useState("");

  function handleGenerate() {
    console.log("generate");
  }
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Questions on a Text</CardTitle>
        <CardDescription>
          Enter a text and generate questions on it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder={placeholder}
          className="resize-none h-[240px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate}>Generate</Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useWorksheetFormStore } from "@/store/worksheet-form-store";
import { MultiSelect } from "../multi-select.tsx";
import subjects from "@/config/subjects";
import SelectFormat from "../inputs/SelectFormat";
import { Textarea } from "../ui/textarea";
import { DifficultyType } from "@/types/worksheet-types";
import { calculateTotalMarks, generateWorksheetPrompt } from "@/utils/helpers";

import GeneratedWoksheet from "../core/GeneratedWoksheet";
import { Loader2 } from "lucide-react";

export const WorksheetForm = () => {
  const [isResponseGenerating, setIsResponseGenerating] = useState(false);

  const {
    worksheetFormData,
    setWorksheetFormData,
    fetchSyllabus,
    availableChapters,

    formatBlocks,

    worksheetResponse,
    setWorksheetResponse,
  } = useWorksheetFormStore();

  // Fetch syllabus on class/subject change
  useEffect(() => {
    if (worksheetFormData.class && worksheetFormData.subject) {
      fetchSyllabus(worksheetFormData.class, worksheetFormData.subject);
    }
  }, [worksheetFormData.class, worksheetFormData.subject]);

  // Set subtopics when chapter changes
  useEffect(() => {
    const selectedChapter = availableChapters.find(
      (c) => c.chapter_name === worksheetFormData.chapter
    );
    setWorksheetFormData({
      ...worksheetFormData,
      subtopics: selectedChapter?.subtopics || [],
    });
  }, [worksheetFormData.chapter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Final Form Data:", worksheetFormData);
    // You can add backend call here
  };

  const currentSelectedChapter = availableChapters.find(
    (chapter) => chapter.chapter_name === worksheetFormData.chapter
  );
  const currentSubtopicOptions = currentSelectedChapter?.subtopics.map(
    (subtopic) => ({
      label: subtopic || "",
      value: subtopic || "",
    })
  );

  const isGenerateButtonDisabled =
    !worksheetFormData.class ||
    !worksheetFormData.subject ||
    !worksheetFormData.chapter ||
    worksheetFormData.subtopics.length === 0 ||
    formatBlocks.length === 0 ||
    calculateTotalMarks(formatBlocks) === 0 ||
    !worksheetFormData.difficulty;

  const handleGenerateWorksheet = async () => {
    setIsResponseGenerating(true);
    const prompt = generateWorksheetPrompt({
      ...worksheetFormData,
      format: formatBlocks,
    });

    console.log(prompt); // Optional: for debugging

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      console.log("GEMINI_RESPONSE: ", { GEMINI_RESPONSE: data });

      const output = data.output;

      if (output) {
        console.log("Generated Worksheet:\n", output);

        setWorksheetResponse(output);

        // Optionally: setOutput(output) or display it in the UI
      } else {
        console.error("No content received from OpenAI");
      }
    } catch (err) {
      console.error("Error generating worksheet:", err);
    } finally {
      setIsResponseGenerating(false);
    }
  };

  if (worksheetResponse) {
    return (
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Worksheet</CardTitle>
          <CardDescription>
            Here is the worksheet generated for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <TiptapEditor content={worksheetResponse} /> */}
          <div className="worksheet-container">
            <GeneratedWoksheet generatedWorksheet={worksheetResponse} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Worksheet</CardTitle>
        <CardDescription>
          Choose class, subject, chapter, subtopics, and format.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-row gap-2">
            {/* Class Select */}
            <div>
              <Label className="mb-2">Class</Label>
              <Select
                onValueChange={(value) =>
                  setWorksheetFormData({
                    ...worksheetFormData,
                    class: parseInt(value),
                    chapter: "",
                    subtopics: [],
                  })
                }
                value={worksheetFormData.class?.toString() || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 12].map((cls) => (
                    <SelectItem key={cls} value={cls.toString()}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Select */}
            <div>
              <Label className="mb-2">Subject</Label>
              <Select
                onValueChange={(value) =>
                  setWorksheetFormData({
                    ...worksheetFormData,
                    subject: value,
                    chapter: "",
                    subtopics: [],
                  })
                }
                value={worksheetFormData.subject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((sub) => (
                    <SelectItem key={sub.id} value={sub.name}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Chapter Select */}
          <div>
            <Label className="mb-2">Chapter</Label>
            <Select
              onValueChange={(value) =>
                setWorksheetFormData({
                  ...worksheetFormData,
                  chapter: value,
                })
              }
              value={worksheetFormData.chapter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                {availableChapters.map((chapter, i) => (
                  <SelectItem
                    key={chapter.chapter_name}
                    value={chapter.chapter_name}
                  >
                    {i + 1}. {chapter.chapter_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <MultiSelect
              options={currentSubtopicOptions || []}
              defaultValue={worksheetFormData.subtopics}
              onValueChange={(value) =>
                setWorksheetFormData({ ...worksheetFormData, subtopics: value })
              }
              placeholder="Select Subtopics"
              variant="default"
              // animation={2}
              maxCount={10}
            />
          </div>

          {/* Format Inputs */}
          <SelectFormat />

          {/* Subject Select */}
          <div>
            <Label className="mb-2">Difficulty Level</Label>
            <Select
              onValueChange={(value) =>
                setWorksheetFormData({
                  ...worksheetFormData,
                  difficulty: value as DifficultyType,
                })
              }
              value={worksheetFormData.difficulty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {["easy", "medium", "hard", "mix"].map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Info */}
          <div>
            <Label className="mb-2">Additional Note</Label>
            <Textarea
              placeholder={`- Include questions from past years, avoid repetition, use real-life examples\n- Focus only on NCERT`}
              className="resize-none"
              rows={3}
              value={worksheetFormData.additionalInfo}
              onChange={(e) =>
                setWorksheetFormData({
                  ...worksheetFormData,
                  additionalInfo: e.target.value,
                })
              }
            />
          </div>

          <Button
            disabled={isGenerateButtonDisabled || isResponseGenerating}
            type="submit"
            className="w-full mt-4"
            onClick={handleGenerateWorksheet}
          >
            {isResponseGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorksheetForm;

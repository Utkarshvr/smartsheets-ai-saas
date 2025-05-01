"use client";

import supabase from "@/utils/supabase/client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
type SyllabusEntry = {
  id: number;
  class: number;
  subject: string;
  chapter_name: string;
  subtopics: string[];
  board: string;
  stream?: string;
};

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "../multi-select.tsx";
import subjects from "@/config/subjects";
import SelectFormat from "../inputs/SelectFormat";
type FormatOption = {
  type: string; // 'MCQ', 'Fill in the blanks', '3 Marks', etc.
  count: number;
};

type FormData = {
  class: number;
  subject: string;
  board: string;
  stream?: string;
  chapter: string;
  subtopics: string[];
  format: FormatOption[];
};

const WorksheetForm: React.FC = () => {
  const [syllabus, setSyllabus] = useState<SyllabusEntry[]>([]);
  const [formData, setFormData] = useState<FormData>({
    class: 12,
    subject: "Mathematics",
    board: "CBSE",
    stream: "Science",
    chapter: "",
    subtopics: [],
    format: [],
  });

  const [availableChapters, setAvailableChapters] = useState<
    {
      chapter_name: string;
      subtopics: string[];
    }[]
  >([]);

  useEffect(() => {
    console.log("Fetching syllabus");
    const fetchSyllabus = async () => {
      const { data, error } = await supabase
        .from("syllabus")
        .select("*")
        .eq("class", formData.class)
        .eq("subject", formData.subject)
        .order("order", { ascending: true });

      if (error) {
        console.error("Error fetching syllabus:", error);
      } else {
        setSyllabus(data);
      }
    };
    fetchSyllabus();
  }, [formData.class, formData.subject]);

  useEffect(() => {
    const chapters = syllabus.map((item) => ({
      chapter_name: item.chapter_name,
      subtopics: item.subtopics,
    }));

    setAvailableChapters([...new Set(chapters)]);
    setFormData({
      ...formData,
      chapter: chapters[0]?.chapter_name || "",
      subtopics: [],
    });
  }, [syllabus]);

  useEffect(() => {
    console.log("Setting all subtopics", {
      ...formData,
      subtopics:
        availableChapters
          .find((chapter) => chapter.chapter_name === formData.chapter)
          ?.subtopics.map((subtopic) => subtopic) || [],
    });

    setFormData({
      ...formData,
      subtopics:
        availableChapters
          .find((chapter) => chapter.chapter_name === formData.chapter)
          ?.subtopics.map((subtopic) => subtopic) || [],
    });
  }, [formData.chapter]);

  const handleFormatChange = (type: string, count: number) => {
    setFormData((prev) => {
      const existing = prev.format.filter((f) => f.type !== type);
      return {
        ...prev,
        format: [...existing, { type, count }],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Send this to OpenAI API or wherever you need
  };

  const currentSelectedChapter = availableChapters.find(
    (chapter) => chapter.chapter_name === formData.chapter
  );
  const currentSubtopicOptions = currentSelectedChapter?.subtopics.map(
    (subtopic) => ({
      label: subtopic || "",
      value: subtopic || "",
    })
  );
  console.log({ currentSelectedChapter, currentSubtopicOptions });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 shadow-md rounded-xl w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold">Generate Worksheet</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="flex-[0.3]">
            <Select
              value={formData.class?.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, class: parseInt(value) })
              }
              defaultValue={formData.class?.toString()}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Classes</SelectLabel>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-[0.7]">
            <Select
              value={formData.subject}
              onValueChange={(value) =>
                setFormData({ ...formData, subject: value })
              }
              defaultValue={formData.subject}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subjects</SelectLabel>
                  {subjects.map((subject, i) => (
                    <SelectItem key={i} value={subject.name}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Select
          value={formData.chapter}
          onValueChange={(value) =>
            setFormData({ ...formData, chapter: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Chapter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Chapters</SelectLabel>
              {availableChapters.map((chapter, i) => (
                <SelectItem key={i} value={chapter.chapter_name}>
                  {i + 1}. {chapter.chapter_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div>
          <MultiSelect
            options={currentSubtopicOptions || []}
            defaultValue={formData.subtopics}
            onValueChange={(value) =>
              setFormData({ ...formData, subtopics: value })
            }
            placeholder="Select Subtopics"
            variant="default"
            // animation={2}
            maxCount={10}
          />
        </div>
      </div>
      <SelectFormat
      // onChange={handleFormatChange}
      />
      <Button
        type="submit"
        // className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Generate Worksheet
      </Button>
    </form>
  );
};

export default WorksheetForm;

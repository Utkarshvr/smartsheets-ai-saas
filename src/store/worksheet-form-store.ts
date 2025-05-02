import {
  WorksheetFormStore,
  WorksheetFormData,
  SyllabusEntry,
  AvailableChapters,
} from "@/types/worksheet-types";
import supabase from "@/utils/supabase/client";
import { create } from "zustand";

export const useWorksheetFormStore = create<WorksheetFormStore>((set, get) => ({
  worksheetFormData: {
    class: 12,
    subject: "Mathematics",
    board: "CBSE",
    stream: "Science",
    chapter: "",
    subtopics: [],
    format: [],
    additionalInfo: "",
    difficulty: "medium",
  },
  setWorksheetFormData: (worksheetFormData: WorksheetFormData) =>
    set({ worksheetFormData }),

  worksheetResponse: "",
  setWorksheetResponse: (worksheetResponse: string) =>
    set({ worksheetResponse }),

  syllabus: [],
  setSyllabus: (syllabus: SyllabusEntry[]) => set({ syllabus }),

  fetchSyllabus: async (className: number, subject: string) => {
    const { data, error } = await supabase
      .from("syllabus")
      .select("*")
      .eq("class", className)
      .eq("subject", subject)
      .order("order", { ascending: true });

    if (error) {
      console.error("Error fetching syllabus:", error);
    } else {
      set({ syllabus: data });

      // Set available chapters
      const chapters = data.map((item) => ({
        chapter_name: item.chapter_name,
        subtopics: item.subtopics,
      }));

      set((state) => ({
        availableChapters: [...new Set(chapters)],
        worksheetFormData: {
          ...state.worksheetFormData,
          chapter: chapters[0]?.chapter_name || "",
          subtopics: [],
        },
      }));
    }
  },

  availableChapters: [],
  setAvailableChapters: (availableChapters: AvailableChapters[]) =>
    set({ availableChapters }),

  // Format Blocks
  formatBlocks: [],
  idCounter: 0,
  setFormatBlocks: (blocks) => set({ formatBlocks: blocks }),
  addFormatBlock: (type, defaultValues) => {
    const { count, marksPerQuestion } = defaultValues[type];
    const newBlock = {
      id: get().idCounter,
      type,
      count,
      marksPerQuestion,
    };
    set((state) => ({
      formatBlocks: [...state.formatBlocks, newBlock],
      idCounter: state.idCounter + 1,
    }));
  },
  updateFormatBlock: (id, field, value) => {
    const updated = get().formatBlocks.map((block) =>
      block.id === id ? { ...block, [field]: value } : block
    );
    set({ formatBlocks: updated });
  },
  removeFormatBlock: (id) => {
    const updated = get().formatBlocks.filter((block) => block.id !== id);
    set({ formatBlocks: updated });
  },
}));

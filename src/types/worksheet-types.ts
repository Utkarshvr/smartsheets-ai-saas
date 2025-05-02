export type FormatBlock = {
  id: number;
  type: string;
  count: number;
  marksPerQuestion: number;
};

export type SyllabusEntry = {
  id: number;
  class: number;
  subject: string;
  chapter_name: string;
  subtopics: string[];
  board: string;
  stream?: string;
};

export type FormatOption = {
  type: string; // 'MCQ', 'Fill in the blanks', '3 Marks', etc.
  count: number;
};

export type Worksheet = {
  class: number;
  subject: string;
  board: string;
  stream?: string;
  chapter: string;
  subtopics: string[];
  format: FormatBlock[];
};

export type DifficultyType = "easy" | "medium" | "hard" | "mix";

export type WorksheetFormData = Worksheet & {
  additionalInfo: string;
  difficulty: DifficultyType;
};

export type AvailableChapters = {
  chapter_name: string;
  subtopics: string[];
};

export interface WorksheetFormStore {
  worksheetFormData: WorksheetFormData;
  setWorksheetFormData: (worksheetFormData: WorksheetFormData) => void;

  worksheetResponse: string;
  setWorksheetResponse: (worksheetResponse: string) => void;

  syllabus: SyllabusEntry[];
  setSyllabus: (syllabus: SyllabusEntry[]) => void;

  fetchSyllabus: (className: number, subject: string) => Promise<void>;

  availableChapters: AvailableChapters[];
  setAvailableChapters: (availableChapters: AvailableChapters[]) => void;

  formatBlocks: FormatBlock[];
  idCounter: number;
  setFormatBlocks: (blocks: FormatBlock[]) => void;
  addFormatBlock: (
    type: string,
    defaultValues: Record<string, { count: number; marksPerQuestion: number }>
  ) => void;
  updateFormatBlock: (
    id: number,
    field: keyof FormatBlock,
    value: string
  ) => void;
  removeFormatBlock: (id: number) => void;
}

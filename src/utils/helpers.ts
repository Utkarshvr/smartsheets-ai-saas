import { FormatBlock, WorksheetFormData } from "@/types/worksheet-types";

export function calculateTotalMarks(formatBlocks: FormatBlock[]) {
  return formatBlocks.reduce(
    (acc, block) => acc + block.marksPerQuestion * block.count,
    0
  );
}

export function generateWorksheetPrompt(input: WorksheetFormData): string {
  const {
    class: cls,
    subject,
    board,
    stream,
    chapter,
    subtopics,
    format,
    additionalInfo,
    difficulty,
  } = input;

  const lines: string[] = [];

  lines.push(`You are an expert ${board} ${subject} teacher.`);
  lines.push("");
  lines.push(
    `Create a question paper for Class ${cls} ${subject} ${
      stream ? `(${board}, ${stream} stream)` : `(${board})`
    }.`
  );
  lines.push("");
  lines.push(`Chapter: ${chapter}`);
  lines.push(`Subtopics to cover:`);
  subtopics.forEach((topic) => lines.push(`- ${topic}`));
  lines.push("");

  if (difficulty) {
    lines.push(
      `Difficulty Level: ${
        difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
      }`
    );
  }

  if (format.length > 0) {
    lines.push("");
    lines.push(`Use the following question format:`);
    format.forEach((block) => {
      lines.push(
        `- ${block.count} ${block.type} (${block.marksPerQuestion} mark${
          +block.marksPerQuestion > 1 ? "s" : ""
        } each)`
      );
    });
    lines.push("");
    lines.push(`Total marks: ${calculateTotalMarks(format)}`);
    lines.push("");
    lines.push(
      `Add Instructions to the students to solve the question paper. Like instructions of sections at the top of the question paper (no of questions, no of marks, etc).`
    );
    lines.push("");
  }

  lines.push("");
  lines.push(
    `Number all questions clearly. Leave adequate spacing. Do NOT include answers.`
  );
  lines.push("");

  if (additionalInfo) {
    lines.push(`Note:\n${additionalInfo}`);
  }

  lines.push("");
  lines.push(
    "Please keep of the following notes seriously, these are very important:"
  );
  lines.push("");
  lines.push(
    "1. Make sure to add breaks by adding '\n' don't use '\\n' or any other escape character between questions and between the mcq options & it's corresponding mcq question and wherever you need to insert a text into new line."
  );
  lines.push(
    "2. Keep the mcq options under the mcq question. Also, make sure to add breaks between the mcq options."
  );
  lines.push("");
  lines.push("The following is an example of how to add breaks:");
  lines.push("");
  lines.push(`
1. MCQ
   a)
   b)
   c)
   d)`);
  lines.push("");
  lines.push("3. Do not add any other text or comments.");
  lines.push("");

  return lines.join("\n");
}

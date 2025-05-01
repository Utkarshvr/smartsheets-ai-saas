import { FormatBlock, WorksheetFormData } from "@/types/worksheet-types";

export function calculateTotalMarks(formatBlocks: FormatBlock[]) {
  return formatBlocks.reduce(
    (acc, block) => acc + block.marksPerQuestion * block.count,
    0
  );
}

export function generateOpenAIPrompt(input: WorksheetFormData): string {
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
  }

  lines.push("");
  lines.push(
    `Number all questions clearly. Leave adequate spacing. Do NOT include answers.`
  );
  lines.push("");

  if (additionalInfo) {
    lines.push(`Note:\n${additionalInfo}`);
  }

  return lines.join("\n");
}

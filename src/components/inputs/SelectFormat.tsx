"use client";

import { useWorksheetFormStore } from "@/store/worksheet-form-store"; // adjust path as needed
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { calculateTotalMarks } from "@/utils/helpers";
const defaultValues: Record<
  string,
  { count: number; marksPerQuestion: number }
> = {
  MCQ: { count: 10, marksPerQuestion: 1 },
  "Fill in the blanks": { count: 5, marksPerQuestion: 1 },
  "Word Problems": { count: 5, marksPerQuestion: 2 },
  "Case Study": { count: 5, marksPerQuestion: 4 },
};

const formatOptions = Object.keys(defaultValues);

export default function SelectFormat() {
  const formats = useWorksheetFormStore((s) => s.formatBlocks);
  const addFormat = useWorksheetFormStore((s) => s.addFormatBlock);
  const updateFormat = useWorksheetFormStore((s) => s.updateFormatBlock);
  const removeFormat = useWorksheetFormStore((s) => s.removeFormatBlock);

  const isAllFormatsSelected = formats.length >= formatOptions.length;

  const handleAdd = () => {
    const type = formatOptions[isAllFormatsSelected ? 2 : formats.length];
    addFormat(type, defaultValues);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block font-medium">Question Format</label>
        <p className="text-sm text-muted-foreground">
          Total: {calculateTotalMarks(formats)} marks
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Marks/Q</th>
              <th className="p-2">No. of Questions</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {formats.map((block) => (
              <tr key={block.id} className="border-b">
                <td className="p-2">
                  <Select
                    value={block.type}
                    onValueChange={(val) => updateFormat(block.id, "type", val)}
                  >
                    <SelectTrigger className="min-w-[160px]">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {formatOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={block.marksPerQuestion}
                    onChange={(e) =>
                      updateFormat(block.id, "marksPerQuestion", e.target.value)
                    }
                    className="border px-2 py-1 w-20 rounded bg-background"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={block.count}
                    onChange={(e) =>
                      updateFormat(block.id, "count", e.target.value)
                    }
                    className="border px-2 py-1 w-24 rounded bg-background"
                  />
                </td>
                <td className="p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFormat(block.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button type="button" variant={"secondary"} onClick={handleAdd} size="sm" className="w-full">
        + Add Row
      </Button>
    </div>
  );
}

import { TextInput, Group } from "@mantine/core";
import type { FixedLetter } from "../types/Types";

interface SanaboksiGameRowProps {
  fixedLetter?: FixedLetter;
  rowData?: string[];
  isPlaceholder?: boolean;
  rowLength: number;
  onFieldChange?: (columnIndex: number, value: string) => void;
}

export default function SanaboksiGameRow({
  fixedLetter,
  rowData = [],
  isPlaceholder = false,
  rowLength,
  onFieldChange,
}: SanaboksiGameRowProps) {
  return (
    <Group>
      {Array.from({ length: rowLength }).map((_, columnIndex) => {
        const isFixedLetter =
          fixedLetter && columnIndex === fixedLetter.fixedIndex;
        const cellValue = isPlaceholder ? "" : (rowData[columnIndex] ?? "");

        return (
          <TextInput
            key={columnIndex}
            value={cellValue}
            readOnly={isPlaceholder || isFixedLetter}
            maxLength={1}
            w={50}
            styles={{
              input: {
                textAlign: "center",
                fontSize: 24,
                fontWeight: isFixedLetter ? "bold" : "normal",
                backgroundColor: isFixedLetter ? "#f0f0f0" : "white",
              },
            }}
            onChange={
              !isPlaceholder && !isFixedLetter && onFieldChange
                ? (event) =>
                    onFieldChange(columnIndex, event.target.value.toUpperCase())
                : undefined
            }
          />
        );
      })}
    </Group>
  );
}

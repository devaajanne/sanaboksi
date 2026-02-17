import { TextInput, Group } from "@mantine/core";
import type { FixedLetter } from "../types/Types";

interface SanaboksiGameRowProps {
  fixedLetter?: FixedLetter;
  rowData?: string[];
  isEmpty?: boolean;
  rowLength: number;
}

export default function SanaboksiGameRow({
  fixedLetter,
  rowData = [],
  isEmpty = false,
  rowLength,
}: SanaboksiGameRowProps) {
  return (
    <Group>
      {Array.from({ length: rowLength }).map((_, columnIndex) => {
        const isFixedLetter =
          fixedLetter && columnIndex === fixedLetter.fixedIndex;
        const cellValue = isEmpty ? "" : (rowData[columnIndex] ?? "");

        return (
          <TextInput
            key={columnIndex}
            value={cellValue}
            readOnly={isEmpty || isFixedLetter}
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
          />
        );
      })}
    </Group>
  );
}

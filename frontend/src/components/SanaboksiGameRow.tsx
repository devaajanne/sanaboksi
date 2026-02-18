import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { TextInput, Group } from "@mantine/core";
import type { FixedLetter } from "../types/Types";
import { IconCheck, IconX } from "@tabler/icons-react";

interface SanaboksiGameRowProps {
  fixedLetter?: FixedLetter;
  rowData?: string[];
  isPlaceholder?: boolean;
  rowLength: number;
  onFieldChange?: (columnIndex: number, value: string) => void;
  isCorrect?: boolean;
}

export default function SanaboksiGameRow({
  fixedLetter,
  rowData = [],
  isPlaceholder = false,
  rowLength,
  onFieldChange,
  isCorrect,
}: SanaboksiGameRowProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (columnIndex: number, value: string) => {
    // Only allow a single letter (A-Z + Ü, Å Ä and Ö, case-insensitive)
    if (value !== "" && !/^[A-ZÜÅÄÖ]$/i.test(value)) {
      return;
    }

    onFieldChange?.(columnIndex, value);

    // Only move focus when a non-empty character is entered
    if (!value) {
      return;
    }

    // Move focus to the next editable field in the same row
    // Skip over the next field if it is a fixed letter (not editable)
    // Continue skipping until an editable field is found or the end of the row is reached
    let nextColumnIndex = columnIndex + 1;

    if (fixedLetter && nextColumnIndex === fixedLetter.fixedIndex) {
      nextColumnIndex++;
    }

    // Focus the next editable field, if it exists
    if (nextColumnIndex < rowLength) {
      inputRefs.current[nextColumnIndex]?.focus();
    }
  };

  const handleKeyDown = (
    columnIndex: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      !rowData[columnIndex]
    ) {
      let previousColumnIndex = columnIndex - 1;

      if (fixedLetter && previousColumnIndex === fixedLetter.fixedIndex) {
        previousColumnIndex--;
      }

      if (previousColumnIndex >= 0) {
        inputRefs.current[previousColumnIndex]?.focus();
      }
    }
  };

  return (
    <Group>
      {Array.from({ length: rowLength }).map((_, columnIndex) => {
        const isFixedLetter =
          fixedLetter && columnIndex === fixedLetter.fixedIndex;
        const cellValue = isPlaceholder ? "" : (rowData[columnIndex] ?? "");
        const correctBorderColor =
          isCorrect === undefined ? "gray" : isCorrect ? "green" : "red";

        return (
          <TextInput
            key={columnIndex}
            value={cellValue}
            readOnly={isPlaceholder || isFixedLetter}
            maxLength={1}
            w={50}
            ref={(el) => {
              inputRefs.current[columnIndex] = el;
            }}
            styles={{
              input: {
                textAlign: "center",
                fontSize: 24,
                fontWeight: isFixedLetter ? "bold" : "normal",
                backgroundColor: isFixedLetter ? "#f0f0f0" : "white",
                borderColor: correctBorderColor,
              },
            }}
            onChange={
              !isPlaceholder && !isFixedLetter && onFieldChange
                ? (event) =>
                    handleChange(columnIndex, event.target.value.toUpperCase())
                : undefined
            }
            onKeyDown={
              !isPlaceholder && !isFixedLetter && onFieldChange
                ? (event) => handleKeyDown(columnIndex, event)
                : undefined
            }
          />
        );
      })}
      {isCorrect !== undefined &&
        (isCorrect ? <IconCheck color="green" /> : <IconX color="red" />)}
    </Group>
  );
}

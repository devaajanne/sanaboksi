import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { TextInput, Group } from "@mantine/core";
import type { FixedLetter } from "../../types/Types";
import { IconCheck, IconX, IconCopy } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { colors } from "../../utils/Constants";
import { useViewportContext } from "../../context/ViewportContext";
import StyledRowValidationIcon from "../styledComponents/StyledRowValidationIcon";
import useColorPalette from "../../hook/useColorPalette";

/**
 * Props for the SanaboksiGameRow component.
 * @property fixedLetter The fixed letter and its index for this row, if any.
 * @property rowData The data for this row (array of letters).
 * @property rowIndex The zero-based index of this row in the game grid.
 * @property isPlaceholder Whether this row is a placeholder (not interactive).
 * @property rowLength The number of columns in the row.
 * @property onFieldChange Callback for when a field value changes.
 * @property isCorrect Whether the row is correct (true), incorrect (false), or not validated (undefined).
 * @property isDuplicate Whether the row is a duplicate of another correct word (true), not a duplicate (false), or not validated (undefined).
 * @property isDuplicate Whether the row has read only value.
 */
interface SanaboksiGameRowProps {
  fixedLetter?: FixedLetter;
  rowData?: string[];
  rowIndex: number;
  isPlaceholder?: boolean;
  rowLength: number;
  onFieldChange?: (columnIndex: number, value: string) => void;
  isCorrect?: boolean;
  isDuplicate?: boolean;
  isReadOnly?: boolean;
}

/**
 * Renders a single row of the Sanaboksi game grid, including fixed letters and input fields.
 * @param props The props for the component.
 * @returns The rendered row as a group of text inputs.
 */
export default function SanaboksiGameRow({
  fixedLetter,
  rowData = [],
  rowIndex,
  isPlaceholder = false,
  rowLength,
  onFieldChange,
  isCorrect,
  isDuplicate,
  isReadOnly,
}: SanaboksiGameRowProps) {
  const colorPalette = useColorPalette();
  const { xs, sm, md, l } = useViewportContext();
  const textInputSize = xs ? 60 : sm ? 75 : md ? 90 : l ? 105 : 120;
  const textInputFontSize = xs ? 30 : sm ? 37.5 : md ? 45 : l ? 52.5 : 60;
  const { t } = useTranslation();
  const borderWidth = 2;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /**
   * Handles user input and moves the cursor to the next available field.
   * @param columnIndex The column index to update.
   * @param value The value to update.
   */
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

  /**
   * Handles moving the user's cursor to the previous field on backspace or delete press.
   * @param columnIndex The column index where the event happens.
   * @param event The keyboard event.
   */
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
    <Group
      gap={3}
      align="center"
      wrap="nowrap"
      justify="center"
      styles={{ root: { position: "relative" } }}
      aria-label={`${t("AriaLabel.Word")} ${rowIndex + 1}`}
    >
      <Group gap={3} wrap="nowrap">
        {Array.from({ length: rowLength }).map((_, columnIndex) => {
          const isFixedLetter =
            fixedLetter && columnIndex === fixedLetter.fixedIndex;
          const cellValue = isPlaceholder ? "" : (rowData[columnIndex] ?? "");
          const correctBorderColor =
            isDuplicate === true
              ? colorPalette[colors.DUPLICATE_BLUE_5]
              : isCorrect === true
                ? colorPalette[colors.CORRECT_GREEN_3]
                : isCorrect === false
                  ? colorPalette[colors.INCORRECT_RED_4]
                  : colorPalette[colors.SECONDARY_COLOR_1];

          return (
            <TextInput
              aria-label={`${t("AriaLabel.Word")} ${rowIndex + 1}, ${t("AriaLabel.Letter")} ${columnIndex + 1}`}
              key={columnIndex}
              value={cellValue}
              readOnly={
                isPlaceholder ||
                isFixedLetter ||
                (isCorrect && !isDuplicate) ||
                isReadOnly
              }
              maxLength={1}
              ref={(el) => {
                inputRefs.current[columnIndex] = el;
              }}
              styles={{
                input: {
                  width: textInputSize,
                  height: textInputSize,
                  fontSize: textInputFontSize,
                  textAlign: "center",
                  fontWeight: isFixedLetter ? "bold" : "normal",
                  backgroundColor: isFixedLetter
                    ? colorPalette[colors.TERTIARY_COLOR_2]
                    : colorPalette[colors.PRIMARY_COLOR_0],
                  borderColor: correctBorderColor,
                  borderWidth: borderWidth,
                  color: colorPalette[colors.SECONDARY_COLOR_1],
                },
              }}
              onChange={
                !isPlaceholder && !isFixedLetter && onFieldChange
                  ? (event) =>
                      handleChange(
                        columnIndex,
                        event.target.value.toUpperCase(),
                      )
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
      </Group>

      {isDuplicate === true ? (
        <StyledRowValidationIcon
          ariaLabel={t("AriaLabel.DuplicateWordIcon")}
          icon={IconCopy}
          color={colorPalette[colors.DUPLICATE_BLUE_5]}
        />
      ) : isCorrect !== undefined ? (
        isCorrect ? (
          <StyledRowValidationIcon
            ariaLabel={t("AriaLabel.CorrectWordIcon")}
            icon={IconCheck}
            color={colorPalette[colors.CORRECT_GREEN_3]}
          />
        ) : (
          <StyledRowValidationIcon
            ariaLabel={t("AriaLabel.IncorrectWordIcon")}
            icon={IconX}
            color={colorPalette[colors.INCORRECT_RED_4]}
          />
        )
      ) : null}
    </Group>
  );
}

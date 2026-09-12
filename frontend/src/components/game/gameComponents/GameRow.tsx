import { Group, TextInput } from "@mantine/core";
import { IconCheck, IconCopy, IconX } from "@tabler/icons-react";
import type { KeyboardEvent, Ref } from "react";
import { useEffect, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useViewportContext } from "../../../context/viewportContext/ViewportContext";
import useColorPalette from "../../../hook/useColorPalette";
import type { FixedLetter, GameRowRef } from "../../../types/Types";
import { colors } from "../../../utils/Constants";
import StyledRowValidationIcon from "../../styledComponents/StyledRowValidationIcon";

/**
 * Props for the GameRow component.
 * @property fixedLetter The fixed letter and its index for this row, if any.
 * @property rowData The data for this row (array of letters).
 * @property rowIndex The zero-based index of this row in the game grid.
 * @property isPlaceholder Whether this row is a placeholder (not interactive).
 * @property rowLength The number of columns in the row.
 * @property onFieldChange Callback for when a field value changes.
 * @property isCorrect Whether the row is correct (true), incorrect (false), or not validated (undefined).
 * @property isDuplicate Whether the row is a duplicate of another correct word (true), not a duplicate (false), or not validated (undefined).
 * @property isReadOnly Whether the row has read only value.
 */
interface GameRowProps {
  fixedLetter?: FixedLetter;
  rowData?: string[];
  rowIndex: number;
  isPlaceholder?: boolean;
  rowLength: number;
  onFieldChange?: (columnIndex: number, value: string) => void;
  isCorrect?: boolean;
  isDuplicate?: boolean;
  isReadOnly?: boolean;
  ref?: Ref<GameRowRef>;
}

/**
 * Renders a single row of the Sanaboksi game grid, including fixed letters and input fields.
 * @param props The props for the component.
 * @returns The rendered row as a group of text inputs.
 */
export default function GameRow({
  fixedLetter,
  rowData = [],
  rowIndex,
  isPlaceholder = false,
  rowLength,
  onFieldChange,
  isCorrect,
  isDuplicate,
  isReadOnly,
  ref
}: GameRowProps) {
  const colorPalette = useColorPalette();
  const { xs, sm, md, lg, isMobile } = useViewportContext();
  const textInputSize = xs ? 45 : sm ? 56.25 : md ? 67.5 : lg ? 78.75 : 90;
  const textInputFontSize = xs ? 18 : sm ? 23 : md ? 28 : lg ? 33 : 38;
  const { t } = useTranslation();
  const borderWidth = 2;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const firstEditableColumn =
    rowIndex === 0 && fixedLetter?.fixedIndex === 0 ? 1 : 0;

  /**
   * Moves focus on first editable field on initial render after fixed ltters have been fetched
   */
  useEffect(() => {
    if (rowIndex !== 0 || isPlaceholder || isReadOnly) {
      return;
    }
    inputRefs.current[firstEditableColumn]?.focus();
  }, [firstEditableColumn, isPlaceholder, isReadOnly, rowIndex]);

  /**
   * Moves focus to the next editable field in the row, skipping the fixed letter.
   * @param columnIndex The current column index.
   */
  const moveFocusForward = (columnIndex: number) => {
    let nextColumnIndex = columnIndex + 1;

    if (fixedLetter && nextColumnIndex === fixedLetter.fixedIndex) {
      nextColumnIndex++;
    }

    if (nextColumnIndex < rowLength) {
      inputRefs.current[nextColumnIndex]?.focus();
    }
  };

  /**
   * Moves focus to the previous editable field in the row, skipping the fixed letter.
   * @param columnIndex The current column index.
   */
  const moveFocusBackward = (columnIndex: number) => {
    let previousColumnIndex = columnIndex - 1;

    if (fixedLetter && previousColumnIndex === fixedLetter.fixedIndex) {
      previousColumnIndex--;
    }

    if (previousColumnIndex >= 0) {
      inputRefs.current[previousColumnIndex]?.focus();
    }
  };

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

    moveFocusForward(columnIndex);
  };

  /**
   * Handles moving the user's cursor to the previous field on backspace or delete press.
   * @param columnIndex The column index where the event happens.
   * @param event The keyboard event.
   */
  const handleKeyDown = (
    columnIndex: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !rowData[columnIndex]) {
      moveFocusBackward(columnIndex);
    }
  };

  /**
   * Returns the index of the currently focused input in this row.
   * @returns The active column index, or -1 when no input in this row is focused.
   */
  const getActiveColumnIndex = () => {
    return inputRefs.current.findIndex(
      (input) => input === document.activeElement
    );
  };

  /**
   * Exposes virtual keyboard actions to the parent through the row ref.
   */
  useImperativeHandle(ref, () => ({
    hasFocusedInput: () =>
      inputRefs.current.includes(document.activeElement as HTMLInputElement),

    pressVirtualKey: (key: string) => {
      const columnIndex = getActiveColumnIndex();

      if (rowData[columnIndex] !== "") {
        return;
      }

      if (columnIndex >= 0) {
        handleChange(columnIndex, key);
      }
    },

    pressVirtualBackspace: () => {
      const columnIndex = getActiveColumnIndex();

      if (
        columnIndex < 0 ||
        isPlaceholder ||
        isReadOnly ||
        (isCorrect && !isDuplicate) ||
        (fixedLetter && columnIndex === fixedLetter.fixedIndex)
      ) {
        return;
      }

      if (rowData[columnIndex]) {
        handleChange(columnIndex, "");
      } else {
        moveFocusBackward(columnIndex);
      }
    }
  }));

  return (
    <Group
      aria-label={`${t("AriaLabel.Word")} ${rowIndex + 1}`}
      role="group"
      align="center"
      wrap="nowrap"
      justify="center"
      styles={{ root: { position: "relative" } }}
    >
      <Group
        gap={3}
        wrap="nowrap"
      >
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
              ref={(element) => {
                inputRefs.current[columnIndex] = element;
              }}
              inputMode={isMobile ? "none" : "text"}
              styles={{
                input: {
                  width: textInputSize,
                  height: textInputSize,
                  padding: 0,
                  fontSize: textInputFontSize,
                  textAlign: "center",
                  fontWeight: isFixedLetter ? "bold" : "normal",
                  backgroundColor: isFixedLetter
                    ? colorPalette[colors.TERTIARY_COLOR_2]
                    : colorPalette[colors.PRIMARY_COLOR_0],
                  borderColor: correctBorderColor,
                  borderWidth: borderWidth,
                  color: colorPalette[colors.SECONDARY_COLOR_1]
                }
              }}
              onChange={
                !isPlaceholder && !isFixedLetter && onFieldChange
                  ? (event) =>
                      handleChange(
                        columnIndex,
                        event.target.value.toUpperCase()
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

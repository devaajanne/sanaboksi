import { Center } from "@mantine/core";
import StyledVirtualKeyboardKey from "../styledComponents/StyledVirtualKeyboardKey";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import { useMemo } from "react";
import { IconBackspace } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

type SanaboksiVirtualKeyboardProps = {
  onKeyPress: (key: string) => void;
  onBackspacePress: () => void;
};

export default function SanaboksiVirtualKeyboard({
  onKeyPress,
  onBackspacePress,
}: SanaboksiVirtualKeyboardProps) {
  const { t } = useTranslation();
  const { xs, sm, md, lg } = useViewportContext();
  const backspaceButtonWidth = xs ? 64 : sm ? 80 : md ? 96 : lg ? 112 : 128;
  const keyboardRows = useMemo(
    () => [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Å"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ],
    [],
  );

  const handleOnKeyPress = (key: string) => {
    onKeyPress(key);
  };

  const handleOnBackspacePress = () => {
    onBackspacePress();
  };

  return (
    <>
      {keyboardRows.map((keyboardRow, rowIndex) => (
        <Center
          key={rowIndex}
          styles={{
            root: {
              display: "flex",
              width: "100%",
              flexWrap: "nowrap",
              gap: 2,
              marginBottom: 2,
            },
          }}
        >
          {keyboardRow.map((key) => (
            <StyledVirtualKeyboardKey
              key={key}
              ariaLabel={key}
              onClick={() => handleOnKeyPress(key)}
              buttonText={key}
            />
          ))}
          {rowIndex === 2 && (
            <StyledVirtualKeyboardKey
              ariaLabel={t("Actions.DeleteLetter")}
              onClick={handleOnBackspacePress}
              overrideWidth={backspaceButtonWidth}
              icon={IconBackspace}
            />
          )}
        </Center>
      ))}
    </>
  );
}

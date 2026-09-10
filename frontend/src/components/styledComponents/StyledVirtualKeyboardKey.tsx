import { Button, Text } from "@mantine/core";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";
import { colors } from "../../utils/Constants";

/**
 * Props for the StyledVirtualKeyboardKey component.
 * @property ariaLabel Optional accessible label for the keyboard key.
 * @property onClick Callback invoked when the key is clicked.
 * @property buttonText Optional text displayed on the key.
 * @property overrideWidth Optional custom width for the key.
 * @property icon Optional icon component displayed on the key.
 */
interface StyledVirtualKeyboardKeyProps {
  ariaLabel?: string;
  onClick: () => void;
  buttonText?: string;
  overrideWidth?: number;
  icon?: React.ComponentType<{ size: string | number; strokeWidth: number }>;
}

export default function StyledVirtualKeyboardKey({
  ariaLabel,
  onClick,
  buttonText,
  overrideWidth,
  icon: Icon
}: StyledVirtualKeyboardKeyProps) {
  const colorPalette = useColorPalette();
  const { xs, sm, md, lg } = useViewportContext();
  const buttonWidth = xs ? 32 : sm ? 40 : md ? 48 : lg ? 56 : 64;
  const buttonHeight = xs ? 40 : sm ? 48 : md ? 56 : lg ? 64 : 72;
  const buttonFontSize = xs ? 18 : sm ? 22 : md ? 26 : lg ? 30 : 34;
  const borderWidth = 2;
  const iconSize = buttonFontSize * 2;
  const iconStrokeWidth = borderWidth / 2;

  return (
    <Button
      aria-label={ariaLabel}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      color={colorPalette[colors.PRIMARY_COLOR_0]}
      styles={{
        label: { color: colorPalette[colors.SECONDARY_COLOR_1] },
        root: {
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
          borderColor: colorPalette[colors.SECONDARY_COLOR_1],
          borderWidth: borderWidth,
          width: overrideWidth ? overrideWidth : buttonWidth,
          height: buttonHeight,
          padding: 0
        }
      }}
    >
      {buttonText && (
        <Text
          span
          styles={{
            root: {
              color: colorPalette[colors.SECONDARY_COLOR_1],
              fontSize: buttonFontSize
            }
          }}
        >
          {buttonText}
        </Text>
      )}
      {Icon && (
        <Icon
          size={iconSize}
          strokeWidth={iconStrokeWidth}
        />
      )}
    </Button>
  );
}

import {
  Button,
  Text,
  useMantineColorScheme,
  useMantineTheme,
  type LoaderProps,
} from "@mantine/core";
import { colors } from "../../utils/Constants";
import { useViewportContext } from "../../context/ViewportContext";

interface StyledButtonProps {
  ariaLabel: string;
  onClick: () => void;
  buttonText: string;
  renderLocation?: string;
  size?: string;
  loading?: boolean;
  loaderProps?: LoaderProps;
}
export default function StyledButton({
  ariaLabel,
  onClick,
  buttonText,
  renderLocation,
  size,
  loading,
  loaderProps,
}: StyledButtonProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  const { isSmViewport } = useViewportContext();
  const borderWidth = 2;
  const margintop = "1rem";
  const smallFontSize = "1rem";
  const largeFontSize = "2rem";
  const buttonTextFontSize =
    renderLocation === "modal"
      ? undefined
      : isSmViewport
        ? smallFontSize
        : largeFontSize;

  return (
    <Button
      aria-label={ariaLabel}
      onClick={onClick}
      color={colorPalette[colors.PRIMARY_COLOR_0]}
      size={size}
      loading={loading}
      loaderProps={loaderProps}
      styles={{
        label: {
          color: colorPalette[colors.SECONDARY_COLOR_1],
        },
        root: {
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
          borderColor: colorPalette[colors.SECONDARY_COLOR_1],
          borderWidth: borderWidth,
          marginTop: margintop,
        },
      }}
    >
      <Text
        span
        styles={{
          root: {
            color: colorPalette[colors.SECONDARY_COLOR_1],
            fontSize: buttonTextFontSize,
          },
        }}
      >
        {buttonText}
      </Text>
    </Button>
  );
}

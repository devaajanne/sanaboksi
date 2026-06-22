import { Button, Text, type LoaderProps } from "@mantine/core";
import { colors } from "../../utils/Constants";
import { useViewportContext } from "../../context/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";

interface StyledButtonProps {
  ariaLabel: string;
  onClick: () => void;
  buttonText: string;
  loading?: boolean;
  loaderProps?: LoaderProps;
  buttonSize?: string;
  buttonFontSize?: number;
}
export default function StyledButton({
  ariaLabel,
  onClick,
  buttonText,
  loading,
  loaderProps,
  buttonSize,
  buttonFontSize,
}: StyledButtonProps) {
  const colorPalette = useColorPalette();
  const { xs, sm, md, l } = useViewportContext();
  const size = xs ? "32" : sm ? "40" : md ? "48" : l ? "56" : "64";
  const borderWidth = 2;
  const margintop = "1rem";

  return (
    <Button
      aria-label={ariaLabel}
      onClick={onClick}
      color={colorPalette[colors.PRIMARY_COLOR_0]}
      size={buttonSize ? buttonSize : size}
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
            fontSize: buttonFontSize ? buttonFontSize : size,
          },
        }}
      >
        {buttonText}
      </Text>
    </Button>
  );
}

import { Button, Text, type LoaderProps } from "@mantine/core";
import { colors } from "../../utils/Constants";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";

interface StyledButtonProps {
  ariaLabel: string;
  onClick: () => void;
  fullWidth?: boolean;
  buttonText: string;
  loading?: boolean;
  loaderProps?: LoaderProps;
  buttonSize?: string;
  buttonFontSize?: number;
}
export default function StyledButton({
  ariaLabel,
  onClick,
  fullWidth,
  buttonText,
  loading,
  loaderProps,
}: StyledButtonProps) {
  const colorPalette = useColorPalette();
  const { xs, sm, md, lg } = useViewportContext();
  const size = xs ? "32" : sm ? "40" : md ? "48" : lg ? "56" : "64";
  const borderWidth = 2;
  const marginTop = "1rem";

  return (
    <Button
      aria-label={ariaLabel}
      onClick={onClick}
      color={colorPalette[colors.PRIMARY_COLOR_0]}
      size={fullWidth ? undefined : size}
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
          marginTop: marginTop,
          width: fullWidth ? "100%" : undefined,
          height: fullWidth ? "100%" : undefined,
        },
      }}
    >
      <Text
        span
        styles={{
          root: {
            color: colorPalette[colors.SECONDARY_COLOR_1],
            fontSize: fullWidth ? undefined : size,
          },
        }}
      >
        {buttonText}
      </Text>
    </Button>
  );
}

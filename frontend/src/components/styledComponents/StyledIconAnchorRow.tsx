import {
  Group,
  Anchor,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { colors } from "../../utils/Constants";

interface StyledIconAnchorRowProps {
  icon?: React.ComponentType<{
    color: string;
    size: string | number;
    strokeWidth: number;
  }>;
  text: string;
  href: string;
}

export default function StyledIconAnchorRow({
  icon: Icon,

  text,
  href,
}: StyledIconAnchorRowProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  const rowIconSize = "3rem";
  const rowMargin = "0.25rem";
  const strokeWidth = 1.5;

  return (
    <Group
      align="center"
      gap="sm"
      wrap="nowrap"
      styles={{
        root: {
          marginTop: rowMargin,
          marginBottom: rowMargin,
        },
      }}
    >
      {Icon && (
        <Icon
          color={colorPalette[colors.SECONDARY_COLOR_1]}
          size={rowIconSize}
          strokeWidth={strokeWidth}
        />
      )}
      <Anchor
        href={href}
        c={colorPalette[colors.SECONDARY_COLOR_1]}
        underline="always"
      >
        {text}
      </Anchor>
    </Group>
  );
}

import { Group, Anchor } from "@mantine/core";
import { colors } from "../../utils/Constants";
import { useViewportContext } from "../../context/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";

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
  const colorPalette = useColorPalette();
  const { xs, sm, md, l } = useViewportContext();
  const iconSize = xs ? 16 : sm ? 24 : md ? 32 : l ? 40 : 48;
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
          size={iconSize}
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

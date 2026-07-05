import { Group, Anchor } from "@mantine/core";
import { colors } from "../../utils/Constants";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
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
  const iconSize = xs ? 36 : sm ? 45 : md ? 54 : l ? 63 : 72;
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

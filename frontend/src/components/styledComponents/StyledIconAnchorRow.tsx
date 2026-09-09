import { Anchor, Group } from "@mantine/core";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";
import { colors } from "../../utils/Constants";

/**
 * Props for the StyledIconAnchorRow component.
 * @property icon Optional icon component to render beside the link.
 * @property text The text displayed for the link.
 * @property href The destination URL for the link.
 */
interface StyledIconAnchorRowProps {
  icon: React.ComponentType<{
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
  const { xs, sm, md, lg } = useViewportContext();
  const iconSize = xs ? 36 : sm ? 45 : md ? 54 : lg ? 63 : 72;
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

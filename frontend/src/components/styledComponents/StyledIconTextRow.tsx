import { Group, Text } from "@mantine/core";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";

/**
 * Props for the StyledIconTextRow component.
 * @property ariaLabel The accessible label for the icon.
 * @property icon Optional icon component to render beside the text.
 * @property color The color applied to the icon.
 * @property text The text displayed beside the icon.
 */
interface StyledIconTextRowProps {
  ariaLabel: string;
  icon?: React.ComponentType<{
    color: string;
    size: string | number;
    strokeWidth: number;
  }>;
  color: string;
  text: string;
}

export default function StyledIconTextRow({
  ariaLabel,
  icon: Icon,
  color,
  text,
}: StyledIconTextRowProps) {
  const { xs, sm, md, lg } = useViewportContext();
  const iconSize = xs ? 36 : sm ? 45 : md ? 54 : lg ? 63 : 72;
  const rowMargin = "0.25rem";
  const strokeWidth = 1.25;

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
          aria-label={ariaLabel}
          color={color}
          size={iconSize}
          strokeWidth={strokeWidth}
        />
      )}
      <Text>{text}</Text>
    </Group>
  );
}

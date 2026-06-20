import { Group, Text } from "@mantine/core";

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
          aria-label={ariaLabel}
          color={color}
          size={rowIconSize}
          strokeWidth={strokeWidth}
        />
      )}
      <Text>{text}</Text>
    </Group>
  );
}

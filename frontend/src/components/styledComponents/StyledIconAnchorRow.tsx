import { Group, Anchor } from "@mantine/core";

interface StyledIconAnchorRowProps {
  icon?: React.ComponentType<{
    color: string;
    size: string | number;
    strokeWidth: number;
  }>;
  color: string;
  text: string;
  href: string;
}

export default function StyledIconAnchorRow({
  icon: Icon,
  color,
  text,
  href,
}: StyledIconAnchorRowProps) {
  const rowIconSize = "3rem";
  const rowMargin = "0.25rem";
  const strokeWidth = 1.5;

  return (
    <>
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
          <Icon color={color} size={rowIconSize} strokeWidth={strokeWidth} />
        )}
        <Anchor href={href} c={color} underline="always">
          {text}
        </Anchor>
      </Group>
    </>
  );
}

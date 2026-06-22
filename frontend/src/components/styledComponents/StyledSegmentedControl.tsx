import useColorPalette from "../../hook/useColorPalette";
import { colors } from "../../utils/Constants";
import { SegmentedControl, type SegmentedControlItem } from "@mantine/core";

interface StyledSegmentedControlProps {
  ariaLabel: string;
  value: string;
  onChange: (string: string) => void;
  data: (string | SegmentedControlItem)[];
  orientation: "vertical" | "horizontal" | undefined;
}

export default function StyledSegmentedControl({
  ariaLabel,
  value,
  onChange,
  data,
  orientation,
}: StyledSegmentedControlProps) {
  const colorPalette = useColorPalette();

  return (
    <SegmentedControl
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      data={data}
      orientation={orientation}
      withItemsBorders={false}
      fullWidth
      styles={{
        root: {
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
        },
        label: {
          color: colorPalette[colors.SECONDARY_COLOR_1],
        },
      }}
      color={colorPalette[colors.TERTIARY_COLOR_2]}
      size={"xl"}
    />
  );
}

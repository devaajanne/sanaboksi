import { useColorPalette } from "../../hooks/useColorPalette";
import { colorPaletteConstants } from "../../utils/Constants";
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
    <>
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
            backgroundColor:
              colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          },
          label: {
            color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          },
        }}
        color={colorPalette[colorPaletteConstants.TERTIARY_COLOR_2]}
        size={"xl"}
      ></SegmentedControl>
    </>
  );
}

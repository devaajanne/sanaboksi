import { useViewportContext } from "../../context/ViewportContext";

interface StyledRowValidationIconProps {
  ariaLabel: string;
  color: string;
  icon?: React.ComponentType<{
    color: string;
    size: string | number;
    strokeWidth: number;
    style: { position: string; right: string };
  }>;
}

export default function StyledRowValidationIcon({
  ariaLabel,
  color,
  icon: Icon,
}: StyledRowValidationIconProps) {
  const { isSmViewport } = useViewportContext();
  const strokeWidth = 1.5;
  const iconSizeSmall = "1rem";
  const iconSizeLarge = "2rem";
  const iconPositionOffsetSmall = "-1.1rem";
  const iconPositionOffsetLarge = "-2.2rem";
  const iconSize = isSmViewport ? iconSizeSmall : iconSizeLarge;
  const iconPositionOffset = isSmViewport
    ? iconPositionOffsetSmall
    : iconPositionOffsetLarge;

  return (
    <>
      {Icon && (
        <Icon
          aria-label={ariaLabel}
          color={color}
          size={iconSize}
          strokeWidth={strokeWidth}
          style={{ position: "absolute", right: iconPositionOffset }}
        />
      )}
    </>
  );
}

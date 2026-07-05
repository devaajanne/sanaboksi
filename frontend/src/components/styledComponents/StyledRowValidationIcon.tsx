import { useViewportContext } from "../../context/viewportContext/ViewportContext";

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
  const { xs, sm, md, lg } = useViewportContext();
  const iconSize = xs ? 16 : sm ? 20 : md ? 24 : lg ? 28 : 32;
  const iconPositionOffset = xs
    ? "-1.25rem"
    : sm
      ? "-1.5625rem"
      : md
        ? "-1.875rem"
        : l
          ? "-2.1875rem"
          : "-2.5rem";
  const strokeWidth = 1.5;

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

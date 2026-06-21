import { Modal, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { colors } from "../../utils/Constants";
import { IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useViewportContext } from "../../context/ViewportContext";

interface StyledModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function StyledModal({
  opened,
  onClose,
  title,
  children,
}: StyledModalProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  const { xs, sm, md, l } = useViewportContext();
  const titleFontSize = xs ? 24 : sm ? 28 : md ? 32 : l ? 36 : 40;
  const { t } = useTranslation();
  const strokeWidth = 1.5;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size="lg"
      closeButtonProps={{
        "aria-label": t("Actions.Close"),
        icon: (
          <IconX
            aria-hidden
            stroke={strokeWidth}
            color={colorPalette[colors.SECONDARY_COLOR_1]}
          />
        ),
      }}
      styles={{
        header: {
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
          color: colorPalette[colors.SECONDARY_COLOR_1],
        },
        body: {
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
          color: colorPalette[colors.SECONDARY_COLOR_1],
        },
        title: { fontSize: titleFontSize },
      }}
    >
      {children}
    </Modal>
  );
}

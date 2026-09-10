import { Modal } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";
import { colors } from "../../utils/Constants";

/**
 * Props for the StyledModal component.
 * @property opened Whether the modal is open.
 * @property onClose Callback for closing the modal.
 * @property title The title displayed in the modal header.
 * @property children The content rendered inside the modal.
 */
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
  children
}: StyledModalProps) {
  const { t } = useTranslation();
  const colorPalette = useColorPalette();
  const { xs, sm, md, lg } = useViewportContext();
  const titleFontSize = xs ? 24 : sm ? 28 : md ? 32 : lg ? 36 : 40;
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
        )
      }}
      styles={{
        title: { fontSize: titleFontSize },
        header: {
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
          color: colorPalette[colors.SECONDARY_COLOR_1]
        },
        content: {
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
          color: colorPalette[colors.SECONDARY_COLOR_1]
        }
      }}
    >
      {children}
    </Modal>
  );
}

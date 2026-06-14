import { Modal } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { colorPaletteConstants } from "../../utility/Constants";
import { IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const colorPalette = useColorPalette();
  const MODAL_TITLE_FONT_SIZE = "1.5rem";
  const ICON_STROKE_WIDTH = 1.5;
  return (
    <>
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
              stroke={ICON_STROKE_WIDTH}
              color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
            />
          ),
        }}
        styles={{
          header: {
            backgroundColor:
              colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
            color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          },
          body: {
            backgroundColor:
              colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
            color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          },
          title: { fontSize: MODAL_TITLE_FONT_SIZE },
        }}
      >
        {children}
      </Modal>
    </>
  );
}

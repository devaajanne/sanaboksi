import { useTranslation } from "react-i18next";
import { useColorPalette } from "../../hooks/useColorPalette";
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";
import { IconX } from "@tabler/icons-react";
import { Button, Group, Modal, Text } from "@mantine/core";

interface GameInfoModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameInfoModal({ opened, onClose }: GameInfoModalProps) {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { textMarginTop } = {
    textMarginTop: 10,
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={t("GameInfoModal.InfoAboutSanaboksi")}
      closeButtonProps={{
        "aria-label": t("Actions.Close"),
        icon: (
          <IconX
            aria-hidden
            stroke={stylingConstants.ICON_STROKE_WIDTH}
            color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          />
        ),
      }}
      styles={{
        header: {
          backgroundColor: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
        },
        body: {
          backgroundColor: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
        },
        title: { fontSize: stylingConstants.MODAL_TITLE_FONT_SIZE },
      }}
    >
      <Group justify="flex-end">
        <Button
          aria-label={t("Actions.BackToGame")}
          onClick={onClose}
          color={colorPalette[colorPaletteConstants.PRIMARY_COLOR_0]}
          style={{ marginTop: textMarginTop }}
          styles={{
            label: {
              color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
            },
            root: {
              backgroundColor:
                colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
              borderColor:
                colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              borderWidth: stylingConstants.BORDER_WIDTH,
            },
          }}
        >
          <Text span>{t("Actions.BackToGame")}</Text>
        </Button>
      </Group>
    </Modal>
  );
}

import { Button, Group, Modal, Text } from "@mantine/core";
import { NotificationModalSource } from "../../types/Types";
import { useColorPalette } from "../../hooks/useColorPalette";
import { useTranslation } from "react-i18next";
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";
import { IconX } from "@tabler/icons-react";

interface NotificationModalProps {
  source: NotificationModalSource;
  opened: boolean;
  onClose: () => void;
}

const notificationModalContent: Record<
  NotificationModalSource,
  { notificationModalTitle: string; notificationModalMessage: string }
> = {
  [NotificationModalSource.GameGridValidityCheck]: {
    notificationModalTitle: "NotificationModal.Invalid.GameGridHasEmptyFields",
    notificationModalMessage: "NotificationModal.Invalid.FillInAllEmptyFields",
  },
  [NotificationModalSource.DuplicateWordsAndIncorrectWords]: {
    notificationModalTitle:
      "NotificationModal.IncorrectAnDuplicate.GameGridHasIncorrectAndDuplicateWords",
    notificationModalMessage:
      "NotificationModal.IncorrectAnDuplicate.FixYourGameGridNoDuplicatesAllCorrectWords",
  },
  [NotificationModalSource.DuplicateWords]: {
    notificationModalTitle:
      "NotificationModal.Duplicate.GameGridHasDuplicateWords",
    notificationModalMessage:
      "NotificationModal.Duplicate.EachWordCanAppearOnlyOnceInAGameGrid",
  },
  [NotificationModalSource.IncorrectWords]: {
    notificationModalTitle:
      "NotificationModal.Incorrect.GameGridHasIncorrectWords",
    notificationModalMessage:
      "NotificationModal.Incorrect.CorrectIncorrectWords",
  },
  [NotificationModalSource.CorrectWords]: {
    notificationModalTitle:
      "NotificationModal.Correct.AllWordsInGameGridAreCorrect",
    notificationModalMessage:
      "NotificationModal.Correct.CongratulationsYourGameGridIsCorrect",
  },
  [NotificationModalSource.NoSource]: {
    notificationModalTitle:
      "NotificationModal.NoSource.UnknownErrorHasOccurred",
    notificationModalMessage:
      "NotificationModal.NoSource.NoItWasNotYouReportBug",
  },
};

/**
 * NotificationModal displays a modal dialog with a message and title
 * based on the provided notification source.
 *
 * @param {NotificationModalSource} props.source - The source of notification to display; determines notification text.
 * @param {boolean} props.opened - Whether the modal is open.
 * @param {() => void} props.onClose - Function to close the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function NotificationModal({
  source,
  opened,
  onClose,
}: NotificationModalProps) {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { notificationModalTitle, notificationModalMessage } =
    notificationModalContent[source] ||
    notificationModalContent[NotificationModalSource.NoSource];
  const { textMarginTop, textMarginBottom } = {
    textMarginTop: 10,
    textMarginBottom: 10,
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t(notificationModalTitle)}
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
      <Text
        styles={{
          root: { marginTop: textMarginTop, marginBottom: textMarginBottom },
        }}
      >
        {t(notificationModalMessage)}
      </Text>
      <Group justify="flex-end">
        <Button
          aria-label={t("Actions.BackToGame")}
          onClick={onClose}
          color={colorPalette[colorPaletteConstants.PRIMARY_COLOR_0]}
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

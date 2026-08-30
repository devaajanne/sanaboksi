import { Group } from "@mantine/core";
import { NotificationModalSource } from "../../types/Types";
import { useTranslation } from "react-i18next";
import StyledButton from "../styledComponents/StyledButton";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";

interface NotificationModalProps {
  source: NotificationModalSource;
  opened: boolean;
  onClose: () => void;
  onNewGridLoad: () => void;
  onValidationRetry: () => void;
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
  [NotificationModalSource.UnfinishedGrid]: {
    notificationModalTitle:
      "NotificationModal.UnfinishedGrid.GameGridIsUnfinished",
    notificationModalMessage:
      "NotificationModal.UnfinishedGrid.AreYouSureYouWantToLoadNewGameYouWillLoseYourProgressInThisGrid",
  },
  [NotificationModalSource.GameGridFetchFailed]: {
    notificationModalTitle:
      "NotificationModal.GameGridFetchFailed.FetchingTheGameGridFailed",
    notificationModalMessage:
      "NotificationModal.GameGridFetchFailed.TryFetchingANewGameGrid",
  },
  [NotificationModalSource.GameGridValidationFailed]: {
    notificationModalTitle:
      "NotificationModal.GameGridValidationFailed.ValidatingTheGameGridFailed",
    notificationModalMessage:
      "NotificationModal.GameGridValidationFailed.TryValidatingTheGameGridAgain",
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
 * @param {() => void} props.onNewGridLoad - Function to load a new game grid.
 * @param {() => void} props.onValidationRetry - Function to retry game grid validation.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function NotificationModal({
  source,
  opened,
  onClose,
  onNewGridLoad,
  onValidationRetry,
}: NotificationModalProps) {
  const { t } = useTranslation();
  const { notificationModalTitle, notificationModalMessage } =
    notificationModalContent[source] ||
    notificationModalContent[NotificationModalSource.NoSource];

  return (
    <StyledModal
      opened={opened}
      onClose={onClose}
      title={t(notificationModalTitle)}
    >
      <StyledText text={t(notificationModalMessage)} />

      <Group justify="flex-end">
        {(source === NotificationModalSource.UnfinishedGrid ||
          source === NotificationModalSource.CorrectWords) && (
          <StyledButton
            ariaLabel={t("Actions.LoadNewGame")}
            onClick={() => {
              onNewGridLoad();
              onClose();
            }}
            buttonText={t("Actions.LoadNewGame")}
          />
        )}
        {source === NotificationModalSource.GameGridFetchFailed && (
          <StyledButton
            ariaLabel={t("Actions.Retry")}
            onClick={() => {
              onNewGridLoad();
              onClose();
            }}
            buttonText={t("Actions.Retry")}
          />
        )}
        {source === NotificationModalSource.GameGridValidationFailed && (
          <StyledButton
            ariaLabel={t("Actions.Retry")}
            onClick={() => {
              onValidationRetry();
              onClose();
            }}
            buttonText={t("Actions.Retry")}
          />
        )}
        <StyledButton
          ariaLabel={t("Actions.Close")}
          onClick={onClose}
          buttonText={t("Actions.Close")}
        />
      </Group>
    </StyledModal>
  );
}

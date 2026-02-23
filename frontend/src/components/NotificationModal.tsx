import { Modal } from "@mantine/core";
import { NotificationModalSource } from "../types/Types";

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
    notificationModalTitle: "Invalid game grid!",
    notificationModalMessage:
      "Your game grid is not valid. Fill in all the fields to check your words.",
  },
  [NotificationModalSource.DuplicateWordsAndIncorrectWords]: {
    notificationModalTitle: "Duplicate and incorrect words!",
    notificationModalMessage:
      "Your game grid contains duplicate and incorrect words. Remove duplicate words and input only unique words. Check all words and replace incorrect words.",
  },
  [NotificationModalSource.DuplicateWords]: {
    notificationModalTitle: "Duplicate words!",
    notificationModalMessage:
      "Your game grid contains duplicate words. Remove duplicate words and input only unique words.",
  },
  [NotificationModalSource.IncorrectWords]: {
    notificationModalTitle: "Incorrect words!",
    notificationModalMessage:
      "Your game grid contains incorrect words. Check all words and replace incorrect words.",
  },
  [NotificationModalSource.CorrectWords]: {
    notificationModalTitle: "Correct words!",
    notificationModalMessage:
      "Congratulations! Your game grid is correct! Feel free to play another grid.",
  },
  [NotificationModalSource.NoSource]: {
    notificationModalTitle: "Unknown error.",
    notificationModalMessage: "The application faced an unknown error.",
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
  const { notificationModalTitle, notificationModalMessage } =
    notificationModalContent[source] ||
    notificationModalContent[NotificationModalSource.NoSource];

  return (
    <Modal opened={opened} onClose={onClose} title={notificationModalTitle}>
      {notificationModalMessage}
    </Modal>
  );
}

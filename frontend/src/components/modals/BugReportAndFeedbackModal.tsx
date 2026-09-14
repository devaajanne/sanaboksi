import { Group, Text, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";
import { colors } from "../../utils/Constants";
import StyledButton from "../styledComponents/StyledButton";
import StyledModal from "../styledComponents/StyledModal";
import StyledSegmentedControl from "../styledComponents/StyledSegmentedControl";
import StyledText from "../styledComponents/StyledText";

/**
 * Props for the BugReportAndFeedbackModal component.
 * @property opened Whether the modal is open.
 * @property onClose Callback for closing the modal.
 */
interface BugReportAndFeedbackModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function BugReportAndFeedbackModal({
  opened,
  onClose
}: BugReportAndFeedbackModalProps) {
  const { t } = useTranslation();
  const colorPalette = useColorPalette();
  const { xs, sm, md, lg } = useViewportContext();
  const [formType, setFormType] = useState<string>("bugReport");
  const isBugReport = formType === "bugReport";
  const formInstructions = isBugReport
    ? t("BugReportAndFeedbackModal.BugReportInstructions")
    : t("BugReportAndFeedbackModal.FeedbackInstructions");
  const inputFontSize = xs ? 14 : sm ? 16 : md ? 18 : lg ? 20 : 22;
  const marginTop = 12;

  const handleFormTypeChange = (value: string) => {
    setFormType(value);
  };

  return (
    <StyledModal
      opened={opened}
      onClose={onClose}
      title={t("BugReportAndFeedbackModal.ReportABugOrGiveFeedback")}
    >
      <StyledText
        text={t(
          "BugReportAndFeedbackModal.WithThisFormYouCanReportABugOrGiveFeedbackAboutSanaboksi"
        )}
      />

      <StyledSegmentedControl
        ariaLabel={t("BugReportAndFeedbackModal.SelectBugReportOrFeedback")}
        value={formType}
        onChange={handleFormTypeChange}
        data={[
          {
            label: <Text>{t("BugReportAndFeedbackModal.BugReport")}</Text>,
            value: "bugReport"
          },
          {
            label: <Text>{t("BugReportAndFeedbackModal.Feedback")}</Text>,
            value: "feedback"
          }
        ]}
        orientation="horizontal"
      />

      <StyledText text={formInstructions} />

      <TextInput
        label={<Text>{t("BugReportAndFeedbackModal.Title")} *</Text>}
        size="xl"
        styles={{
          input: {
            color: colorPalette[colors.SECONDARY_COLOR_1],
            borderColor: colorPalette[colors.SECONDARY_COLOR_1],
            fontSize: inputFontSize
          }
        }}
      />

      <Textarea
        label={
          <Text>
            {isBugReport
              ? t("BugReportAndFeedbackModal.DescribeTheBug")
              : t("BugReportAndFeedbackModal.YourFeedback")}{" "}
            *
          </Text>
        }
        autosize
        minRows={5}
        styles={{
          root: {
            marginTop: "1rem",
            maringBottom: "1rem"
          },

          input: {
            color: colorPalette[colors.SECONDARY_COLOR_1],
            borderColor: colorPalette[colors.SECONDARY_COLOR_1],
            fontSize: inputFontSize
          }
        }}
      />

      <Group
        justify="flex-end"
        styles={{ root: { marginTop: marginTop } }}
      >
        <StyledButton
          ariaLabel={t("Actions.Submit")}
          onClick={onClose}
          buttonText={t("Actions.Submit")}
        />
        <StyledButton
          ariaLabel={t("Actions.BackToGame")}
          onClick={onClose}
          buttonText={t("Actions.BackToGame")}
        />
      </Group>
    </StyledModal>
  );
}

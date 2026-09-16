import { Group, Text, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, isOneOf, useForm } from "@mantine/form";
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
  const inputFontSize = xs ? 14 : sm ? 16 : md ? 18 : lg ? 20 : 22;
  const marginTop = 12;

  const form = useForm({
    initialValues: {
      formType: "bugReport",
      title: "",
      body: ""
    },
    validate: {
      formType: isOneOf(["bugReport", "feedback"], "must be valid"),
      title: isNotEmpty(
        t("BugReportAndFeedbackModal.FormValidations.TitleCannotBeEmpty")
      ),
      body: isNotEmpty(
        t("BugReportAndFeedbackModal.FormValidations.BodyCannotBeEmpty")
      )
    }
  });

  const isBugReport = form.values.formType === "bugReport";

  const handleFormTypeChange = (value: string) => {
    if (value === "bugReport" || value === "feedback") {
      form.setFieldValue("formType", value);
    }
  };

  const handleOnFormSubmit = (values: typeof form.values) => {
    console.log("handleOnFormSubmit");
    console.log(values);
    form.reset();
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
      <form onSubmit={form.onSubmit((values) => handleOnFormSubmit(values))}>
        <StyledSegmentedControl
          ariaLabel={t("BugReportAndFeedbackModal.SelectBugReportOrFeedback")}
          key={form.key("formType")}
          {...form.getInputProps("formType")}
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

        <StyledText
          text={
            isBugReport
              ? t("BugReportAndFeedbackModal.BugReportInstructions")
              : t("BugReportAndFeedbackModal.FeedbackInstructions")
          }
        />

        <TextInput
          label={<Text>{t("BugReportAndFeedbackModal.Title")} *</Text>}
          key={form.key("title")}
          {...form.getInputProps("title")}
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
                : t("BugReportAndFeedbackModal.YourFeedback")}
              *
            </Text>
          }
          key={form.key("body")}
          {...form.getInputProps("body")}
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
            type="submit"
            onClick={() => {}}
            buttonText={t("Actions.Submit")}
          />
          <StyledButton
            ariaLabel={t("Actions.BackToGame")}
            onClick={onClose}
            buttonText={t("Actions.BackToGame")}
          />
        </Group>
      </form>
    </StyledModal>
  );
}

import { Group, Text, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, isOneOf, useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import {
  browserName,
  deviceType,
  fullBrowserVersion,
  osName,
  osVersion
} from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";
import { submitBugReportOrFeedback } from "../../services/ApiService";
import { colors } from "../../utils/Constants";
import StyledButton from "../styledComponents/StyledButton";
import StyledIconTextRow from "../styledComponents/StyledIconTextRow";
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
  const { viewportHeight, viewportWidth, xs, sm, md, lg } =
    useViewportContext();
  const inputFontSize = xs ? 14 : sm ? 16 : md ? 18 : lg ? 20 : 22;
  const marginTop = 12;

  const form = useForm({
    initialValues: {
      formFields: {
        formType: "bugReport",
        formTitle: "",
        formBody: ""
      },
      userDeviceInfo: {
        deviceType: deviceType,
        os: osName + " (" + osVersion + ")",
        browser: browserName + " (" + fullBrowserVersion + ")",
        viewportHeight: viewportHeight,
        viewportWidth: viewportWidth
      }
    },
    validate: {
      formFields: {
        formType: isOneOf(
          ["bugReport", "feedback"],
          t(
            "BugReportAndFeedbackModal.FormValidations.SelectionMustBeEitherBugReportOrFeedback"
          )
        ),
        formTitle: isNotEmpty(
          t("BugReportAndFeedbackModal.FormValidations.TitleCannotBeEmpty")
        ),
        formBody: isNotEmpty(
          t("BugReportAndFeedbackModal.FormValidations.BodyCannotBeEmpty")
        )
      }
    }
  });

  const isBugReport = form.values.formFields.formType === "bugReport";

  const handleFormTypeChange = (value: string) => {
    if (value === "bugReport" || value === "feedback") {
      form.setFieldValue("formFields.formType", value);
    }
    if (value === "bugReport") {
      form.setFieldValue("userDeviceInfo.deviceType", deviceType);
      form.setFieldValue("userDeviceInfo.os", osName + " (" + osVersion + ")");
      form.setFieldValue(
        "userDeviceInfo.browser",
        browserName + " (" + fullBrowserVersion + ")"
      );
      form.setFieldValue("userDeviceInfo.viewportHeight", viewportHeight);
      form.setFieldValue("userDeviceInfo.viewportWidth", viewportWidth);
    }

    if (value === "feedback") {
      form.setFieldValue("userDeviceInfo.deviceType", "");
      form.setFieldValue("userDeviceInfo.os", "");
      form.setFieldValue("userDeviceInfo.browser", "");
      form.setFieldValue("userDeviceInfo.viewportHeight", 0);
      form.setFieldValue("userDeviceInfo.viewportWidth", 0);
    }
  };

  const handleOnFormSubmit = (values: typeof form.values) => {
    const responseStatus = submitBugReportOrFeedback({
      ...values,
      userDeviceInfo: {
        ...values.userDeviceInfo,
        viewportHeight,
        viewportWidth
      }
    });
    form.resetField("formFields.formTitle")
    form.resetField("formFields.formBody")
    console.log(responseStatus);
    onClose();
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
          key={form.key("formFields.formType")}
          {...form.getInputProps("formFields.formType")}
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
          key={form.key("formFields.formTitle")}
          {...form.getInputProps("formFields.formTitle")}
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
          key={form.key("formFields.formBody")}
          {...form.getInputProps("formFields.formBody")}
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
        {isBugReport && (
          <StyledIconTextRow
            ariaLabel={t("AriaLabel.AlertIcon")}
            icon={IconAlertCircle}
            color={colorPalette[colors.SECONDARY_COLOR_1]}
            text={t(
              "BugReportAndFeedbackModal.SubmittingTheFormGathersTheFollowingInfoAboutYourDevice"
            )}
          />
        )}

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

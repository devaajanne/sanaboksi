import { Alert } from "@mantine/core";
import type { Dispatch, SetStateAction } from "react";

interface AlertBoxProps {
  source: string;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

export default function AlertBox({ source, setShowAlert }: AlertBoxProps) {
  let alertTitle: string = "";
  let alertText: string = "";

  switch (source) {
    case "gameGridValidityCheck":
      alertTitle = "Your game grid is not valid!";
      alertText =
        "Your game grid is not valid. Fill in all the fields to check your words.";
      break;
    default:
      alertTitle = "Unknown error.";
      alertText = "The application faced an unknown error.";
  }

  return (
    <>
      <Alert
        title={alertTitle}
        withCloseButton
        onClose={() => setShowAlert(false)}
      >
        {alertText}
      </Alert>
    </>
  );
}

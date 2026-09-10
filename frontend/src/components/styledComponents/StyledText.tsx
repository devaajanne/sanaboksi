import { Text } from "@mantine/core";

/**
 * Props for the StyledText component.
 * @property text The text to display.
 * @property children Optional content rendered after the text.
 */
interface StyledTextProps {
  text: string;
  children?: React.ReactNode;
}

export default function StyledText({ text, children }: StyledTextProps) {
  const margin = "1rem";

  return (
    <Text styles={{ root: { marginTop: margin, marginBottom: margin } }}>
      {text} {children}
    </Text>
  );
}

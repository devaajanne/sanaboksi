import { Text } from "@mantine/core";

interface StyledTextProps {
  text: string;
  children?: React.ReactNode;
}

export default function StyledText({ text, children }: StyledTextProps) {
  const margin = "1rem";

  return (
    <Text
      styles={{
        root: {
          marginTop: margin,
          marginBottom: margin,
        },
      }}
    >
      {text} {children}
    </Text>
  );
}

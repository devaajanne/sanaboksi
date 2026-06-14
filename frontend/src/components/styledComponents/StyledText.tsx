import { Text } from "@mantine/core";

interface StyledTextProps {
  text: string;
  children?: React.ReactNode;
}

export default function StyledText({ text, children }: StyledTextProps) {
  const TEXT_MARGIN = "1rem";

  return (
    <>
      <Text
        styles={{
          root: {
            marginTop: TEXT_MARGIN,
            marginBottom: TEXT_MARGIN,
          },
        }}
      >
        {text} {children}
      </Text>
    </>
  );
}

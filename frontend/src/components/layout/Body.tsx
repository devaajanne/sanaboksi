import { Box, Center } from "@mantine/core";
import SanaboksiGameGrid from "../game/SanaboksiGameGrid";

export default function Body() {
  return (
    <Center styles={{ root: { width: "100%" } }}>
      <Box>
        <SanaboksiGameGrid />
      </Box>
    </Center>
  );
}

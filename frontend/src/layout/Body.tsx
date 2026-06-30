import { Container } from "@mantine/core";
import SanaboksiGameGrid from "../components/game/SanaboksiGameGrid";

export default function Body() {
  return (
    <Container
      fluid
      styles={{
        root: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <SanaboksiGameGrid />
    </Container>
  );
}

import { Container } from "@mantine/core";
import Game from "../components/game/Game";

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
          justifyContent: "center"
        }
      }}
    >
      <Game />
    </Container>
  );
}
